# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Что это за проект

Сайт-лендинг **Flexberry AI Suite** — экосистема ИИ-решений для бизнеса. Статический сайт на Jekyll, собираемый в GitLab CI и деплоящийся на GitHub Pages (репозиторий `github.com/Flexberry/ai.flexberry.ru.git`, ветка `main`).

## Основные команды

```bash
# Локальный запуск (Windows — Docker)
run-jekyll.cmd                     # или docker-compose up

# Первая сборка Docker-образа с gem'ами (после изменения Gemfile/Gemfile.lock)
docker build -t flexberry-ai-jekyll .

# Сборка проекта через Docker
docker run --rm -v "/$PWD:/srv/jekyll" flexberry-ai-jekyll bundle exec jekyll build

# Сборка через run-jekyll (сервер)
run-jekyll.cmd                     # docker-compose up
```

Сайт доступен локально по адресу `http://localhost:4000`.

## Архитектура

### Стек
- **Генератор статики:** Jekyll 3.8.3 с темой minima
- **CSS препроцессор:** SCSS (файл `css/main.scss` компилируется в `css/main.css`)
- **CSS-фреймворк:** Bootstrap 4.3.1 (в `assets/bootstrap-4.3.1/`)
- **Иконки:** Font Awesome 5 (в `fonts/font-awesome/`)
- **Шрифты:** Inter, GOSTUI2 (в `fonts/`)
- **Формы:** Яндекс.Формы (встроены через iframe)
- **Аналитика:** Яндекс.Метрика + Google Analytics
- **CI/CD:** GitLab CI → сборка → push в GitHub Pages

### Структура файлов

```
/
├── _config.yml          # Конфигурация Jekyll (заголовок, url, коллекции, exclude)
├── Gemfile              # Ruby-зависимости (Jekyll, minima, jekyll-feed)
├── Dockerfile           # Базовый образ с предустановленными gem'ами
├── docker-compose.yml   # Локальный запуск сервера
├── run-jekyll.cmd       # Скрипт запуска (docker-compose up)
├── .dockerignore        # Исключения для контекста сборки Docker
├── index.html           # Главная страница (основной контент — в самом файле)
├── 404.html             # Страница 404
├── _layouts/
│   └── default.html     # Базовый layout (head → header → content → footer → js)
├── _includes/
│   ├── head.html        # <head>: мета-теги, Bootstrap, Font Awesome, аналитика
│   ├── header.html      # Навбар с логотипом
│   ├── navbar.html      # Пункты навигации (О проекте, Каталог, Сценарии, Преимущества)
│   ├── footer.html      # Подвал
│   ├── send-modal.html  # Модальные окна форм (покупка, демо) — Яндекс.Формы
│   ├── agree-modal.html # Модальное окно соглашения
│   ├── modal.html       # Модальные окна вакансий
│   ├── js.html          # Скрипты (jQuery, Bootstrap JS, кастомные скрипты)
│   └── icons/           # SVG-иконки
├── css/
│   ├── main.scss        # Главная SCSS-таблица стилей (все стили сайта)
│   ├── main.css         # Скомпилированный CSS
│   ├── ghost.css        # Дополнительные стили
│   └── demo.css         # Стили для страницы демо
├── _pages/
│   └── demo.html        # Страница-демонстратор AI Assistant
├── js/
│   ├── jquery-3.3.1.min.js
│   ├── custom-scripts.js    # Кастомные JS (плавный скролл, навбар, модалки)
│   ├── cbpAnimatedHeader.js # Анимация шапки (shrink-эффект)
│   ├── demo.js              # Скрипт для страницы демо
│   ├── sql.js / uml.js      # Дополнительные скрипты
├── img/                 # Изображения (SVG-иконки, логотипы)
├── fonts/               # Шрифты (Inter, GOSTUI2) + Font Awesome
├── assets/bootstrap-4.3.1/ # Bootstrap 4.3.1
├── _tasks/              # Постановки задач на изменения сайта (в exclude Jekyll)
│   ├── landing-content.md   # Исходный контент для редактирования (копия текста сайта)
│   └── new-product-lineup.md
└── _site/               # Сгенерированный сайт (в .gitignore)
```

### Навигация по секциям

На главной странице (`index.html`) — single-page лендинг с секциями:
1. **#company** (hero) — заголовок, три карточки направлений, кнопки «Купить» и «Демо»
2. **#about** — описание проекта, 4 преимущества
3. **#catalog** — 9 карточек продуктов (IVA, OCR, Verify, AI HR, AI Offer, AI NDA, Cost Planner, Code Reviewer, App Scaffolding)
4. **#scenarios** — 3 сценария использования (HR, разработка/пресейл, юр.отдел)
5. **#benefits** — 4 преимущества с детализацией

### Особенности вёрстки
- Фирменные цвета: фиолетовый `#710FD8` и зелёный `#25D838` — используются в градиентах
- Карточки в секциях имеют `border-radius: 16px`, при ховере поднимаются на `translateY(-5px)`
- В секции `#company` используется gradient-фон
- Фоновые паттерны: радиальные градиенты с точками (`radial-gradient(circle, ...)`)
- В секции `#benefits` нумерованный список с пунктирной линией-соединением

### CI/CD (GitLab CI)

Пайплайн в `.gitlab-ci.yml`:
1. **pages** — сборка Jekyll в директорию `public/`
2. **git_clone** — клонирование репозитория GitHub Pages
3. **copy_files** — замена содержимого GitHub Pages собранными файлами
4. **git_commit** — коммит
5. **git_push** — пуш в ветку `main` репозитория `github.com/Flexberry/ai.flexberry.ru.git`

Пайплайн запускается только для ветки `master`.

### Docker для локальной разработки

Для ускорения локального запуска используется **кастомный Docker-образ** с предустановленными gem'ами:

- **Dockerfile** — наследуется от `jekyll/jekyll:3.8.3`, копирует `Gemfile`/`Gemfile.lock`, выполняет `bundle install`. Слои кэшируются: gem'ы переустанавливаются только при изменении Gemfile.
- **docker-compose.yml** — монтирует текущую директорию как volume, пробрасывает порт 4000, использует инкрементальную сборку (`--incremental --force_polling`).
- **run-jekyll.cmd** — shortcut: `docker-compose up`.

При изменении контента не требуется пересборка образа — только `docker-compose up`.

**Первая установка:**

```bash
docker build -t flexberry-ai-jekyll .
```

**Затем:**

```bash
run-jekyll.cmd   # или docker-compose up
```

Служебные файлы (Dockerfile, docker-compose.yml, run-jekyll.cmd, .dockerignore, Gemfile, Gemfile.lock, .gitignore, _tasks/) исключены из сборки Jekyll через `exclude` в `_config.yml`.

### Формы обратной связи
- Используются Яндекс.Формы, встроенные через iframe
- Две формы: покупка (`send-modal`) и запрос демо (`send-modal1`)
- Открываются через data-атрибуты `data-toggle="modal"`
