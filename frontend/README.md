# ShopTask

Интернет-магазин на Angular 22: каталог товаров, карточка товара, создание и редактирование товаров, корзина.

## Стек

- Angular 22 (standalone, zoneless, OnPush по умолчанию, signals, `httpResource`, Signal Forms)
- TypeScript 6 (strict)
- ESLint (`angular-eslint` + `typescript-eslint` strict type-checked), Stylelint (SCSS), Prettier

## Требования

- Node.js 22.12+
- Запущенный бэкенд из [`../backend`](../backend) на `http://localhost:5240` (адрес настраивается в `src/environments/environment.ts`)

## Скрипты

| Команда            | Описание                                          |
| ------------------ | ------------------------------------------------- |
| `npm start`        | Dev-сервер на `http://localhost:4200`             |
| `npm run build`    | Production-сборка в `dist/`                       |
| `npm run lint`     | ESLint (TS + шаблоны) и Stylelint (SCSS)          |
| `npm run lint:fix` | Автоисправление замечаний линтеров                |
| `npm run format`   | Форматирование Prettier                           |
| `npm run check`    | Форматирование, линтеры и сборка — перед коммитом |

## Структура

```
src/app
├── core/                  инфраструктура: базовый URL API, HTTP-утилиты, роутинг, конфиг форм
├── layout/header/         шапка приложения
├── shared/ui/             переиспользуемые UI-компоненты (Notice, LabeledField)
└── features/
    ├── products/
    │   ├── data/          модель, API, схема формы товара
    │   ├── product-list/  каталог
    │   ├── product-card/  карточка в каталоге
    │   ├── product-details/
    │   └── product-editor/ создание и редактирование
    └── cart/
        ├── data/          модель, API, CartStore (состояние корзины на сигналах)
        ├── cart-page/
        └── cart-line/
```

## Маршруты

| URL                  | Страница              |
| -------------------- | --------------------- |
| `/products`          | Каталог               |
| `/products/new`      | Новый товар           |
| `/products/:id`      | Карточка товара       |
| `/products/:id/edit` | Редактирование товара |
| `/cart`              | Корзина               |
