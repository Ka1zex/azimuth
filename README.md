# Azimuth Wiki

Готовая статическая вики находится в [`wiki/`](wiki/README.md).
Откройте `wiki/index.html` в браузере или запустите из корня репозитория:

```sh
python3 -m http.server 8000 --directory wiki
```

Главная, каталог с поиском, 19 начальных статей, 6 шаблонов HTML/Markdown и 1032 медиафайла.
Внешнее оформление — BOOTSTRA.386; `wiki/assets/layout.css` содержит согласованные правки компоновки и hover.
Версия мода, источники и статусы проверки указаны в `wiki/about.html`.

## Vercel

`vercel.json` настроен на статическую раздачу папки `wiki/`. Установка зависимостей и сборка для неё не требуются.
Существующий стартовый SvelteKit-проект сохранён в `src/`; он не участвует в раздаче вики.

---

## Исходный README стартового проекта

# SvelteKit

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte), deployed to [Vercel](https://vercel.com).

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fsveltekit&project-name=sveltekit-vercel&repository-name=sveltekit-vercel&demo-title=SvelteKit%20%2B%20Vercel&demo-description=A%20SvelteKit%20app%20optimized%20Edge-first.&demo-url=https%3A%2F%2Fsveltekit-template.vercel.app%2F)

_Live Example: https://sveltekit-template.vercel.app_

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.
