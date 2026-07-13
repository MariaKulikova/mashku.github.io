import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import BlueBuddy from '../components/blue-buddy/BlueBuddy';
import { SITE_URL, OG_IMAGE, SOCIAL_PROFILE_URLS } from '../data/site';

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
    if ((window as any).__analyticsInitialized) {
      return;
    }
    (window as any).__analyticsInitialized = true;

    // Microsoft Clarity
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r9kzrl7vrg");

    // Yandex.Metrica (id 110540163). Инициализация один раз; pageview на
    // SPA-переходах шлётся из clientModule onRouteDidUpdate.
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=Date.now();
        for (var j=0; j<e.scripts.length; j++){if(e.scripts[j].src===r){return;}}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=110540163', 'ym');
    (window as any).ym(110540163, 'init', {
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
    });
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
            src="https://mc.yandex.ru/watch/110540163"
            style={{position: 'absolute', left: '-9999px'}}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}