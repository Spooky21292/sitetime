# Digital Mind / Thought Space

Одностраничный статический сайт в атмосфере «philosophical hacker»: тёмный минималистичный интерфейс, плавающие фрагменты кода, мягкое дыхание света, «Thought of the Day» и карточки-рефлексии.

## Структура проекта

```text
/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ main.js
│  │  ├─ thoughts.js
│  │  └─ background.js
│  └─ img/
└─ README.md
```

## Как запустить локально

### Вариант 1 (приоритет): без сервера

Просто откройте `index.html` двойным кликом в браузере.

Сайт использует только относительные пути для локальных файлов, поэтому работает из файловой системы (`file://`).

### Вариант 2: через локальный сервер (опционально)

Если хотите запуск через сервер:

```bash
python3 -m http.server 8080
```

После этого откройте `http://localhost:8080`.

## Особенности

- Vanilla HTML/CSS/JS, без сборщика и TypeScript.
- GSAP + ScrollTrigger через CDN.
- Canvas-фон с частицами и линиями (fallback: статичный градиентный фон, если canvas недоступен).
- Поддержка `prefers-reduced-motion` (снижение/отключение тяжёлых анимаций).
- Адаптивный layout для мобильных и десктопа.
- «Thought of the Day» выбирается случайно из массива на каждую перезагрузку.

## Деплой на хостинг

Подходит любой статический хостинг.

### GitHub Pages
1. Загрузите репозиторий на GitHub.
2. В `Settings → Pages` выберите ветку и папку (обычно `main` / root).
3. Сохраните — получите публичный URL.

### Netlify
1. Перетащите папку проекта в Netlify Drop **или** подключите Git-репозиторий.
2. Build command: не нужен.
3. Publish directory: `/` (корень проекта).

### Vercel
1. Импортируйте репозиторий.
2. Framework preset: `Other`.
3. Build command: пусто, Output directory: `.`.

## Кастомизация контента

- Мысли дня: `assets/js/thoughts.js`
- Карточки Fragments: `index.html`
- Визуальные стили и атмосфера: `assets/css/style.css`
- Анимации, интерактив и скролл: `assets/js/main.js`
- Фон частиц: `assets/js/background.js`
