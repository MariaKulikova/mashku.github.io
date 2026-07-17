import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import BlueBuddy from '../components/blue-buddy/BlueBuddy';
import { SITE_URL, OG_IMAGE, SOCIAL_PROFILE_URLS, YM_COUNTER_ID } from '../data/site';

// schema.org Person — помогает поисковикам связать сайт с личностью автора
// и формирует rich-результаты. Ссылки/мета берём из единого src/data/site.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mariia Kulikova',
  alternateName: 'Masha K',
  jobTitle: 'UX Designer',
  url: SITE_URL,
  image: `${SITE_URL}/${OG_IMAGE}`,
  sameAs: SOCIAL_PROFILE_URLS,
};

export default function Root({children}) {
  useEffect(() => {
    // Гард от повторной инициализации (StrictMode / fast-refresh в dev,
    // повторный mount Root): счётчики поднимаем один раз на документ.
    if (window.__analyticsInitialized) {
      return;
    }

    // Microsoft Clarity
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r9kzrl7vrg");

    // Yandex.Metrica. Инициализация один раз; pageview на SPA-переходах
    // шлётся из clientModule onRouteDidUpdate. Гард выше делает внутренний
    // dedup-цикл стокового сниппета лишним, поэтому он убран.
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=Date.now();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window, document, 'script', `https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}`, 'ym');
    window.ym?.(YM_COUNTER_ID, 'init', {
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
    });

    // Флаг ставим только после успешной инициализации: если код выше бросит,
    // следующий mount повторит попытку, а не отключит аналитику навсегда.
    window.__analyticsInitialized = true;
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </script>
      </Head>
      <BlueBuddy />
      {children}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
            style={{position: 'absolute', left: '-9999px'}}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}