# Перенос mashku на инфраструктуру Meteora

Портфолио mashku (Docusaurus) переезжает с **GitHub Pages** на инфраструктуру
**Meteora** (`gitlab.meteora.pro`, группа `team/mashku`) по аналогии с
`posmotrim-design`. Выбранная модель деплоя — **roma-контейнер за Gateway**
(та же, что в prod `posmotrim-ui`): образ `Docusaurus → nginx:alpine` собирается
BuildKit'ом и катится через Fleet-GitOps в crown-jewel инфра-репо
`gitlab.com/meteora-pro/secure/it`.

---

## Как работает пайплайн (`.gitlab-ci.yml`)

```
verify   typecheck-mashku        npm ci + npm run typecheck
         compute-version-mashku  IMAGE_PATH/IMAGE_TAG (<version>-<short_sha>)
build    build-mashku            npm ci + npm run build (артефакт build/)
         build-image-mashku      BuildKit: Dockerfile → образ в registry   [gated]
deploy   deploy-prod-mashku      HMAC-подписанный триггер it-bump (Fleet)   [gated]
```

- `[gated]` — джобы создаются только когда задан group CI-var `IT_TRIGGER_TOKEN`.
  Пока он не задан, пайплайн проходит verify+build (проверка сборки), но **не
  деплоит** — это ожидаемо до настройки инфраструктуры (см. ниже).
- Тег образа: `<version из package.json>-<short_sha>`, напр. `1.0.0-abc1234`.
  Формат защищён regex в `.trigger-deploy` и повторно валидируется it-пайплайном.
- Prod-деплой = `deploy-prod-mashku` подписывает
  `HMAC-SHA256(DEPLOY_HMAC_KEY, "mashku\nmashku\n<tag>\n<ts>")` и триггерит
  guardrailed bump-пайплайн в `meteora-pro/secure/it`. Сам bump (запись в
  Fleet-бандл) делает it-пайплайн своим кредом с guardrails — app-репо write в
  инфру не имеет.

---

## ✅ Что уже сделано (в этом репозитории)

| Файл | Назначение |
| --- | --- |
| `Dockerfile` | multi-stage: `node:22-alpine` (`npm ci` + `npm run build`) → `nginx:alpine`, раздаёт `build/` |
| `nginx.conf` | маршрутизация чистых URL Docusaurus (`trailingSlash: false` → `try_files $uri $uri.html $uri/`), относительные редиректы за TLS-Gateway, 404, кэш ассетов |
| `.dockerignore` | исключает `node_modules`, `build`, скриншоты и пр. из контекста |
| `.gitlab-ci.yml` | пайплайн verify/build/deploy (roma), gated на `IT_TRIGGER_TOKEN` |
| `ci/.gitlab-ci.buildkit-templates.yml` | шаблоны `.buildkit-build` и `.trigger-deploy` (tenant `mashku`) |
| `package.json` | версия поднята `0.0.0 → 1.0.0` для осмысленного тега образа |

**Локальная проверка пройдена** (`docker build` + запуск, curl):

- `/` → 200, `/projects/ai-car-assistant` → 200, вложенный
  `/projects/design-system/design-system` → 200
- `/ru/` → 200, `/ru/projects/...` → 200; голый `/ru` → относительный 301 → `/ru/`
  (Docusaurus сам линкует локаль как `/ru/`)
- `/sitemap.xml`, `/img/eyes.svg` → 200
- несуществующий путь → **404** со страницей Docusaurus «Page Not Found»

> GitHub Pages деплой (`.github/workflows/deploy.yml`) **намеренно оставлен** —
> текущий хостинг работает до момента переключения DNS (cutover). Удалим после
> подтверждения, что prod на Meteora стабилен.

---

## 🔧 Что должен сделать владелец инфраструктуры (Андрей)

Полный текст задачи — в разделе [«Задача для GitLab»](#задача-для-gitlab-issue)
ниже. Кратко по пунктам:

### 1. Создать проект в GitLab
`team/mashku/mashku-portfolio` на `gitlab.meteora.pro` (или выдать текущему пользователю
`@Mashku` роль Maintainer на группе `team/mashku`, чтобы создать самостоятельно).
После создания я запушу подготовленную ветку.

### 2. Group CI/CD variables (`team/mashku`, **masked + protected**)
Наследуются проектом. Те же, что у `posmotrim-design`:

| Variable | Что это |
| --- | --- |
| `IT_TRIGGER_TOKEN` | pipeline trigger token it-репо `meteora-pro/secure/it` (только запуск bump-пайплайна со входами) |
| `DEPLOY_HMAC_KEY` | per-tenant HMAC-ключ mashku (= `DEPLOY_HMAC_MASHKU` в it-репо) |

Раннеры с тегами `verify` и `build_image` должны быть доступны проекту (обычно
наследуются от группы — подтвердить). Проект также должен иметь доступ к remote
include `gitlab.com/meteora-public/common-ci`.

### 3. В crown-jewel инфра-репо `meteora-pro/secure/it`
- **HMAC-ключ** `DEPLOY_HMAC_MASHKU` (совпадает с group-var `DEPLOY_HMAC_KEY`).
  Если тенант mashku уже заведён для posmotrim — ключ переиспользуется.
- **Guardrail** для `tenant:app = mashku:mashku` (tenant `mashku`, имя
  приложения `mashku` из `package.json`; репозиторий — `mashku-portfolio`):
  хардкод целевого файла/репо/regex тега, mandatory provenance, diff-guard
  (по образцу `mashku:posmotrim-ui`).
- **Fleet-бандл**: манифесты Deployment/Service/Ingress для mashku (референс
  ниже). Bump-пайплайн обновляет `image.tag` в этом бандле.

### 4. Kubernetes-манифесты (референс для Fleet-бандла)
Образ: `registry.meteora.pro/team/mashku/mashku-portfolio/mashku/main:<tag>` (internal build push
идёт в `${CI_REGISTRY_IMAGE}/mashku/main`). Namespace — по конвенции тенанта
mashku (напр. `mashku`).

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mashku
  labels: { app: mashku }
spec:
  replicas: 2
  selector:
    matchLabels: { app: mashku }
  template:
    metadata:
      labels: { app: mashku }
    spec:
      imagePullSecrets:
        - name: gitlab-registry-secret   # доступ к registry.meteora.pro
      containers:
        - name: mashku
          image: registry.meteora.pro/team/mashku/mashku-portfolio/mashku/main:1.0.0-REPLACED_BY_BUMP
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet: { path: /, port: 80 }
            initialDelaySeconds: 3
            periodSeconds: 10
          livenessProbe:
            httpGet: { path: /, port: 80 }
            initialDelaySeconds: 5
            periodSeconds: 30
          resources:
            requests: { cpu: 10m, memory: 16Mi }
            limits:   { cpu: 100m, memory: 64Mi }
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: mashku
spec:
  selector: { app: mashku }
  ports:
    - port: 80
      targetPort: 80
---
# ingress.yaml  (nginx-ingress + cert-manager; либо эквивалент через Gateway API)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mashku
  annotations:
    kubernetes.io/ingress.class: nginx
    kubernetes.io/tls-acme: "true"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - secretName: mashku-pro-tls
      hosts: [ mashku.pro, www.mashku.pro ]
  rules:
    - host: mashku.pro
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: mashku
                port: { number: 80 }
```

> Контейнер несёт свой `nginx.conf` — на ingress **не нужен** rewrite-хак
> `/$1/index.html` (в отличие от S3-варианта posmotrim: у Docusaurus реальные
> `.html`-файлы, маршрутизацию делает nginx внутри образа).

### 5. DNS (владелец домена `mashku.pro`)
Сейчас `mashku.pro` указывает на GitHub Pages. После готовности prod на Meteora
переключить A/AAAA (или CNAME) на IP/адрес ingress-контроллера Meteora Gateway.
Дождаться выпуска TLS-сертификата cert-manager'ом (`mashku-pro-tls`).
Рекомендую заранее снизить TTL записи до 300s для быстрого отката.

---

## Порядок переключения (cutover) и откат

1. Андрей выполняет пункты 1–4. Я пушу ветку, открываю MR, мержу в `main`.
2. С заданным `IT_TRIGGER_TOKEN` пайплайн собирает образ и триггерит it-bump →
   pod'ы mashku поднимаются в кластере (ещё без DNS).
3. Проверяем prod по временному адресу/`Host: mashku.pro` (curl/hosts).
4. Переключаем DNS (пункт 5), ждём TLS.
5. Наблюдаем; при проблеме — **откат DNS обратно на GitHub Pages** (он ещё жив).
6. После стабилизации — удаляем `.github/workflows/deploy.yml` и репо на GitHub
   (по решению).

---

## Задача для GitLab (issue)

> Скопировать в issue проекта `team/mashku/mashku-portfolio` (или группы `team/mashku`),
> assignee — Андрей.

**Заголовок:** Инфраструктура для mashku (roma-деплой, аналог posmotrim-ui)

**Описание:**

App-репо mashku (Docusaurus-портфолио) подготовлено к roma-деплою по аналогии с
`posmotrim-ui`: `Dockerfile`, `nginx.conf`, `.gitlab-ci.yml`, buildkit/trigger
шаблоны уже в репозитории, сборка образа проверена локально. Нужна инфра-часть,
которую app-репо (low-trust) сделать не может:

- [ ] Создать проект `team/mashku/mashku-portfolio` на `gitlab.meteora.pro` (или выдать
      `@Mashku` Maintainer на группе для самостоятельного создания).
- [ ] Group CI-vars (`team/mashku`, masked+protected): `IT_TRIGGER_TOKEN`,
      `DEPLOY_HMAC_KEY` (= `DEPLOY_HMAC_MASHKU`). Подтвердить доступность
      раннеров с тегами `verify` и `build_image`.
- [ ] В `meteora-pro/secure/it`: HMAC-ключ `DEPLOY_HMAC_MASHKU`, guardrail для
      `mashku:mashku`, Fleet-бандл с манифестами Deployment/Service/Ingress
      (референс — в `docs/DEPLOY_METEORA.md`).
- [ ] Ingress/Gateway + TLS `mashku-pro-tls` для `mashku.pro` (cert-manager,
      tls-acme), `imagePullSecret gitlab-registry-secret` в namespace.
- [ ] DNS: после готовности prod переключить `mashku.pro` с GitHub Pages на
      Meteora Gateway (предварительно снизить TTL до 300s).

После пунктов 1–3 сообщите — я запушу ветку и открою MR; дальше cutover по
разделу «Порядок переключения» в `docs/DEPLOY_METEORA.md`.
