# Samorodok

Ювелирный сайт на Nuxt 4, Vue 3 и Tailwind CSS. Исходники, изображения, SVG-иконки и версии зависимостей сохранены в репозитории.

## Установка на другом устройстве

Установите Git и Node.js 24 (проверена версия 24.21.0). Склонируйте репозиторий или скачайте Code → Download ZIP на GitHub.

Откройте терминал в папке BlinkJeweller:

```sh
npm ci
npm run dev
```

Откройте http://localhost:3000. Если PowerShell блокирует npm.ps1, используйте npm.cmd вместо npm.

npm ci устанавливает версии из package-lock.json. Копировать node_modules, .nuxt и .output между устройствами не нужно.

## Проверка и сборка

```sh
npm run typecheck
npm run build
node .output/server/index.mjs
```

Собирайте сайт на целевом устройстве: обработка изображений использует платформенные бинарные файлы.

## Структура

- app/components — шапка, футер, карточки, слайдер и модальные окна.
- app/pages — страницы сайта.
- app/assets/css/main.css — стили и адаптивная вёрстка.
- public/img и public/icons — изображения и SVG-иконки.
- server/api/products.get.ts — данные товаров.
- server/api/contact.post.ts — демонстрационная форма; отправка в CRM/почту ещё не подключена.

## CloudPub

Направьте туннель на http://localhost:3000. В nuxt.config.ts укажите свой домен в vite.server.allowedHosts без протокола и завершающего слеша. Сейчас разрешён samorodok-web.cloudpub.ru.

## Codex

Навык UI UX Pro Max устанавливается отдельно из https://github.com/nextlevelbuilder/ui-ux-pro-max-skill. Для запуска сайта навык не нужен.
