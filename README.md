# advatanasova.bg - адв. Красимира Атанасова

Уебсайт на адвокатска кантора, изграден по модела на legalmasters.bg - с
тъмносиньо-тюркоазена палитра (`#0F172A · #1D4ED8 · #0F766E · #A7F3D0 ·
#F8FAFC`), само на български език.

**Стек**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

## Стартиране

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продукционен билд
```

## Структура

```
app/
  page.tsx                        Начало (hero, услуги, области, за мен, отзиви, CTA)
  za-men/                         За мен (биография, принципи)
  uslugi/  + [slug]/              Услуги по категории с цени + детайлни страници
  oblasti-na-deynost/ + [slug]/   Области на дейност + детайлни страници
  kalkulatori/                    Хъб + 3 калкулатора (отделни страници):
    notarialni-taksi/               разноски при имотна сделка
    sadebni-taksi/                  държавни такси по ГПК
    advokatski-vaznagrazhdeniya/    минимални адвокатски възнаграждения
  zapazi-chas/                    Форма за запазване на час (изпраща имейл)
  kontakti/                       Контакти + форма + карта
  politika-za-poveritelnost/      GDPR политика (ПРОЕКТ - за преглед)
  obshti-usloviya/                Общи условия (ПРОЕКТ - за преглед)
  actions.ts                      Server actions за двете форми
  sitemap.ts / robots.ts / icon.svg

content/          ← ЦЯЛОТО РЕДАКТИРУЕМО СЪДЪРЖАНИЕ (без код)
  site.ts           контакти, адрес, работно време, навигация
  services.ts       категории услуги, описания, ЦЕНИ
  practice-areas.ts области на дейност
  testimonials.ts   отзиви (в момента ПРИМЕРНИ)

components/       layout/ ui/ home/ calculators/ forms/ shared/ seo/
lib/
  tariffs.ts        тарифни таблици на калкулаторите (лесни за актуализация)
  format.ts         двойно обозначаване EUR/BGN (фиксинг 1.95583)
  send-email.ts     изпращане през Resend REST API (без ключ → лог в конзолата)
  bookings.ts       заети часове през Upstash Redis / Vercel KV (fallback: файл, само за localhost)
```

## Чеклист преди публикуване

Съдържание (всичко е в `content/`, търсете `TODO`):
- [ ] Реален телефон, имейл, адрес и работно време - `content/site.ts`
- [ ] Реални цени на услугите - `content/services.ts`
- [ ] Реална биография - `app/za-men/page.tsx` и `components/home/AboutPreview.tsx`
- [ ] Реални отзиви (със съгласие на клиентите) - `content/testimonials.ts`
- [ ] Портретна снимка: заменете `public/images/portrait-placeholder.svg`
      (търсете `portrait-placeholder` в компонентите и сменете пътя)
- [ ] Адрес за картата - `mapQuery` в `content/site.ts`

Правни текстове:
- [ ] Политика за поверителност и Общи условия - да се прегледат от адвоката
      (маркирани са като „работен вариант“)
- [ ] Тарифите в `lib/tariffs.ts` - да се сверят с актуалните нормативни
      актове и да се обнови `LAST_VERIFIED`
- [ ] Двойното обозначаване EUR/BGN: след края на задължителния период може
      да се опрости в `lib/format.ts` (`dualPrice`)

Техническо:
- [ ] Имейл интеграция: регистрация в resend.com, верифициране на домейна,
      попълване на `.env` по образеца на `.env.example`
- [ ] Съхранение на заетите часове: на Vercel добавете Storage → Upstash Redis
      към проекта (Vercel попълва `UPSTASH_REDIS_REST_URL` /
      `UPSTASH_REDIS_REST_TOKEN` автоматично) - **без това "Запази час" дава
      грешка и не изпраща имейл**, защото файловата система на Vercel е
      read-only
- [ ] Деплой: препоръчително във Vercel (безплатен план) + насочване на
      домейна advatanasova.bg (A запис / CNAME по инструкциите на Vercel)
- [ ] Google Search Console: подаване на `https://advatanasova.bg/sitemap.xml`
- [ ] Google Business Profile за локалното търсене (по желание)

## Добавяне на английска версия (по-късно)

Цялото съдържание е отделено в `content/*.ts`, така че добавянето на EN изисква:
локализирани копия на content файловете + `middleware.ts` с локали (`/en/...`)
или `next-intl`. Компонентите не съдържат твърдо кодиран текст извън дребни
UI надписи.

## Бележки

- Формите имат honeypot поле срещу спам и GDPR чекбокс за съгласие.
- Калкулаторите приемат суми в € или лв. (вкл. с десетична запетая) и показват
  резултатите в двете валути.
- ESLint не е включен в началния скелет - може да се добави с
  `npm i -D eslint eslint-config-next`.
