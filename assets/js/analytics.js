// Consentimento, atribuição de campanha e eventos GA4 da landing.
// Mesmos cookies e regras do app (repo agendabee, src/app/shared/services/
// attribution.service.ts e cookie-consent.service.ts): mudou aqui, muda lá.
// - ab_consent: escolha do banner, compartilhada com app.agendabee.com.br.
// - ab_attr: origem da visita (legítimo interesse, sem dado pessoal; não
//   depende do banner). GA4 e Meta Pixel só carregam com aceite.
(function () {
  'use strict';

  var GA4_ID = 'G-2HP4YDJCJS';
  var META_PIXEL_ID = '780474098046322';
  var SHARED_DOMAIN = 'agendabee.com.br';
  var IS_PRODUCTION = location.hostname === SHARED_DOMAIN || location.hostname.endsWith('.' + SHARED_DOMAIN);

  // ---------- cookies ----------
  function readCookie(name) {
    var prefix = name + '=';
    var entry = document.cookie.split('; ').find(function (part) { return part.indexOf(prefix) === 0; });
    return entry ? decodeURIComponent(entry.slice(prefix.length)) : null;
  }

  function writeCookie(name, value, maxAgeDays) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + maxAgeDays * 86400 +
      '; samesite=lax' + (location.protocol === 'https:' ? '; secure' : '') +
      (IS_PRODUCTION ? '; domain=.' + SHARED_DOMAIN : '');
  }

  // ---------- atribuição ----------
  var UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'];
  var CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid'];
  var SAFE_VALUE = /^[\w.\-~+%:|]+$/;
  var LOOKS_PERSONAL = /@|\d{8,}/;

  function clean(raw, isUtm) {
    var value = (raw || '').trim();
    if (isUtm) value = value.replace(/\s+/g, '_');
    if (!value || value.length > 100 || !SAFE_VALUE.test(value)) return undefined;
    if (isUtm && LOOKS_PERSONAL.test(value)) return undefined;
    return isUtm ? value.toLowerCase() : value;
  }

  function campaignTouch(url, now) {
    var touch = { ts: now, landing_path: url.pathname };
    var found = false;
    UTM_KEYS.forEach(function (key) {
      var value = clean(url.searchParams.get('utm_' + key), true);
      if (value) { touch[key] = value; found = true; }
    });
    CLICK_ID_KEYS.forEach(function (key) {
      var value = clean(url.searchParams.get(key), false);
      if (value) { touch[key] = value; found = true; }
    });
    return found ? touch : null;
  }

  function referralTouch(url, referrer, now) {
    var host;
    try { host = new URL(referrer).hostname; } catch (e) { return null; }
    var own = host === SHARED_DOMAIN || host.endsWith('.' + SHARED_DOMAIN);
    return host && !own ? { ts: now, referrer_host: host, landing_path: url.pathname } : null;
  }

  function captureAttribution() {
    var stored = null;
    try { stored = JSON.parse(readCookie('ab_attr') || 'null'); } catch (e) { stored = null; }
    var url = new URL(location.href);
    var now = Date.now();
    var campaign = campaignTouch(url, now);
    var touch = campaign || referralTouch(url, document.referrer, now);
    var next = !stored ? (touch ? { first: touch, last: touch } : null)
      : (campaign ? { first: stored.first, last: campaign } : null);
    if (next) writeCookie('ab_attr', JSON.stringify(next), 180);
  }

  // ---------- tags (só com aceite e só em produção) ----------
  function loadGa4() {
    if (window.__ga4Loaded) return;
    window.__ga4Loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  function loadMetaPixel() {
    if (window.fbq) return;
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function loadTrackers() {
    if (!IS_PRODUCTION) return;
    loadGa4();
    loadMetaPixel();
  }

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  // ---------- banner ----------
  var TEXTS = {
    pt: { message: 'usamos cookies de análise (Google Analytics) e publicidade (Meta Pixel) para melhorar sua experiência. Você pode aceitar ou recusar.', accept: 'aceitar', reject: 'recusar' },
    es: { message: 'utilizamos cookies de análisis (Google Analytics) y publicidad (Meta Pixel) para mejorar tu experiencia. Puedes aceptar o rechazar.', accept: 'aceptar', reject: 'rechazar' },
    en: { message: 'we use analytics (Google Analytics) and advertising (Meta Pixel) cookies to improve your experience. You can accept or reject them.', accept: 'accept', reject: 'reject' }
  };

  function showBanner() {
    var t = TEXTS[(document.documentElement.lang || 'pt').slice(0, 2)] || TEXTS.pt;
    var banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    var text = document.createElement('p');
    text.textContent = t.message;
    var actions = document.createElement('div');
    actions.className = 'cookie-consent-actions';
    [['reject', t.reject, 'btn btn-outline'], ['accept', t.accept, 'btn btn-primary']].forEach(function (b) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = b[2];
      button.textContent = b[1];
      button.addEventListener('click', function () {
        var choice = b[0] === 'accept' ? 'accepted' : 'rejected';
        writeCookie('ab_consent', choice, 365);
        banner.remove();
        if (choice === 'accepted') loadTrackers();
      });
      actions.appendChild(button);
    });
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  // ---------- eventos ----------
  var APP_STORE = /nuvemshop\.com\.br\/loja-aplicativos-nuvem|tiendanube\.com\/(?:\w+\/)?tienda-aplicaciones-nube/;

  function sectionOf(el) {
    var section = el.closest('section, header, footer, nav');
    return section ? (section.id || section.className.split(' ')[0] || section.tagName.toLowerCase()) : 'unknown';
  }

  function bindEvents() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (!link) return;
      var href = link.href;
      if (APP_STORE.test(href)) {
        track('click_install', { link_url: href.split('?')[0], section: sectionOf(link) });
      } else if (href.indexOf('https://app.agendabee.com.br/') === 0) {
        var destination = new URL(href).pathname.replace(/^\//, '') || 'app';
        track('cta_click', { destination: destination, section: sectionOf(link), button_text: link.textContent.trim().slice(0, 60) });
      }
    });

    var pricing = document.querySelector('section.pricing');
    if (pricing && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (e) { return e.isIntersecting; })) return;
        observer.disconnect();
        track('view_item', {
          currency: 'BRL',
          value: 47.7,
          items: [
            { item_id: 'free', item_name: 'Bee Free', price: 0 },
            { item_id: 'pro', item_name: 'Bee Pro', price: 47.7 },
            { item_id: 'max', item_name: 'Bee Max', price: 77.7 }
          ]
        });
      }, { threshold: 0.4 });
      observer.observe(pricing);
    }
  }

  captureAttribution();
  var consent = readCookie('ab_consent');
  if (consent === 'accepted') loadTrackers();
  if (consent !== 'accepted' && consent !== 'rejected') {
    if (document.body) showBanner(); else document.addEventListener('DOMContentLoaded', showBanner);
  }
  bindEvents();
})();
