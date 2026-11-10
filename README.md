# MedHelper — Преміальний вебсайт медичної AI-платформи

Офіційний презентаційний вебсайт та адміністративна CMS-панель для інтелектуального помічника медика **MedHelper**.

> **Позиціонування продукту:**  
> «Інтелектуальний помічник медика. Від клінічних рішень до медичної документації».

---

## 1. Технологічний стек

* **Фреймворк:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript strict mode).
* **Стилізація:** [Tailwind CSS 4](https://tailwindcss.com/) з токенами через CSS variables.
* **UI-компоненти:** [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/).
* **Анімації:** [Motion for React](https://motion.dev/) (Framer Motion) із повною підтримкою `prefers-reduced-motion`.
* **CMS & Адмін-панель:** [Payload CMS 3](https://payloadcms.com/) (вбудована в `/admin`).
* **База даних:** [PostgreSQL 17](https://www.postgresql.org/).
* **Форми & Валідація:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + Server Actions з rate-limiting та honeypot.
* **Тестування:** [Vitest](https://vitest.dev/) (unit-тести) та [Playwright](https://playwright.dev/) (E2E-тести + автоматизована перевірка доступності axe-core WCAG 2.2 AA).
* **Інфраструктура:** Docker, Docker Compose, Nginx (reverse proxy, Gzip, SSL/ACME).

---

## 2. Структура проєкту

```text
├── src/
│   ├── access/                  # Права доступу Payload (Super Admin, Editor, Staff)
│   ├── actions/                 # Next.js Server Actions (submitLead із захистом від спаму)
│   ├── app/
│   │   ├── (frontend)/          # Публічні сторінки (головна, [slug], legal, sitemap, robots)
│   │   │   ├── globals.css      # Дизайн-токени, палітра та типографіка
│   │   │   ├── layout.tsx       # Root layout з навігацією, футером та JSON-LD
│   │   │   └── page.tsx         # Динамічний рендер блоків головної сторінки з CMS
│   │   └── (payload)/           # Маршрути адміністративної панелі Payload (/admin, /api)
│   ├── blocks/                  # CMS-блоки секцій (Hero, Capabilities, NHSU, Scales, тощо)
│   ├── collections/             # Колекції CMS (Users, Pages, Faqs, Leads, Media)
│   ├── components/
│   │   ├── demos/               # Інтерактивні клінічні демонстрації
│   │   │   ├── hero/            # Робочий простір асистента з розрахунком шкал
│   │   │   ├── bento/           # 5 унікальних мікро-демо Bento Grid
│   │   │   ├── nhsu/            # Картка кодування ЕСОЗ та валідація НСЗУ
│   │   │   ├── scales/          # Інтерактивний калькулятор CURB-65
│   │   │   ├── documents/       # Трансформація в форми № 003/о, 027/о, 028/о
│   │   │   └── ocr/             # Розпізнавання рукописних записів та сканів
│   │   ├── forms/               # Контактна форма зворотного звʼязку
│   │   ├── layout/              # Header з Mega Menu, Footer, Logo, ScrollProgress
│   │   ├── motion/              # Утиліти анімацій Reveal, Stagger, CountUp
│   │   ├── sections/            # Секції головної сторінки
│   │   ├── seo/                 # Structured Data JSON-LD (Organization, SoftwareApplication)
│   │   └── ui/                  # Базові UI-примітиви (Button, LinkButton, Icon, SectionHeading)
│   ├── content/                 # Український контент за замовчуванням (fallback + seed)
│   ├── fields/                  # Конфігурація полів Payload з обмеженнями довжини
│   ├── globals/                 # Глобальні налаштування (SiteSettings, Header, Footer, HomePage)
│   ├── i18n/                    # Локалізація (основна uk; en, ru підготовлені)
│   ├── lib/                     # CMS-хелпери, SEO-утиліти, rate-limiting, email
│   └── seed/                    # Скрипт наповнення бази даних контентом
├── tests/
│   ├── unit/                    # Unit-тести схем Zod та Rate Limiter (Vitest)
│   └── e2e/                     # E2E-тести сценаріїв та доступності (Playwright)
├── nginx/                       # Конфігурація Nginx reverse proxy
├── Dockerfile                   # Multi-stage production збірка
└── docker-compose.yml           # Стек для розгортання: Postgres + Web + Nginx
```

---

## 3. Вимоги до середовища

* **Node.js:** `>= 20.9.0` (рекомендовано Node.js 24 LTS).
* **Менеджер пакетів:** `pnpm >= 10.x` (або `pnpm 12.x`).
* **База даних:** PostgreSQL `>= 15` (рекомендовано PostgreSQL 17).
* **Для Docker розгортання:** Docker Engine `>= 24.0` та Docker Compose `>= 2.20`.

---

## 4. Налаштування змінних оточення (.env)

Створіть файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Обов'язкові змінні:
* `DATABASE_URI`: рядок підключення до PostgreSQL (`postgres://user:password@localhost:5432/medhelper`).
* `PAYLOAD_SECRET`: секретний ключ для підпису JWT токенів адміністраторів (згенеруйте через `openssl rand -hex 32`).
* `NEXT_PUBLIC_SITE_URL`: публічний URL сайту (`http://localhost:3000` для розробки або `https://medhelper.ua` у продакшені).
* `SITE_URL`: серверний URL сайту.
* `AI_PLATFORM_URL`: посилання на саму платформу AI-асистента (керується також через CMS).
* `LEAD_RATE_LIMIT`: ліміт заявок з однієї IP-адреси за 10 хвилин (за замовчуванням `5`).

Опціональні змінні (для сповіщень та медіа-сховища):
* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`, `EMAIL_TO`: налаштування поштового сервера для отримання заявок на email.
* `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`: для зберігання завантажених файлів у S3 (AWS, Cloudflare R2, MinIO). Якщо не вказано — файли зберігаються локально у `./media`.

---

## 5. Швидкий старт локально

### 5.1. Встановлення залежностей
```bash
pnpm install
```

### 5.2. Створення бази даних та запуск сиду
Переконайтеся, що PostgreSQL запущено, та виконайте сид початкового україномовного контенту та створення облікового запису Super Admin:

```bash
SEED_ADMIN_EMAIL=admin@medhelper.ua SEED_ADMIN_PASSWORD=YourStrongPassword2026! pnpm seed
```

### 5.3. Запуск у режимі розробки
```bash
pnpm dev
```
Вебсайт буде доступний за адресою: `http://localhost:3000`  
Адміністративна панель CMS: `http://localhost:3000/admin`

---

## 6. Запуск через Docker та Docker Compose

Для повноцінного продакшен-запуску однією командою:

```bash
# 1. Задайте змінні у .env
# 2. Запустіть сервіси у фоновому режимі
docker compose up -d --build
```

Docker Compose підніме:
1. `postgres`: PostgreSQL 17 із персистентним томом `pgdata` та healthcheck.
2. `web`: Standalone-контейнер Next.js + Payload CMS.
3. `nginx`: Reverse proxy з кешуванням статичних ресурсів, gzip-стисненням та лімітом завантаження файлів 32MB.

---

## 7. Робота з CMS та адміністративною панеллю

Адреса панелі: `http://localhost:3000/admin` (або `https://ваш-домен/admin`).

### Ролі користувачів:
* **Super Admin**: повний доступ до системних налаштувань, кольорів, створення користувачів та видалення заявок.
* **Editor**: редагування контенту секцій, блоків головної сторінки, FAQ та обробка вхідних заявок.

### Можливості CMS:
* **Налаштування сайту (Site Settings)**: зміна логотипу, бренд-кольорів (Teal / Mint / Navy), посилань на платформу, контактного email, телефону, Telegram, соціальних мереж та медичного застереження.
* **Головна сторінка (Home Page)**: блоковий конструктор (Bento, NHSU, Шкали, Документи, OCR, Порівняння, Кроки, Аудиторія, FAQ, CTA, Контакти) з можливістю змінювати порядок секцій перетягуванням та приховувати окремі блоки.
* **Сторінки (Pages)**: створення додаткових сторінок (наприклад `/privacy`, `/terms`) із підтримкою Lexical Rich Text, чернеток та персонального SEO.
* **Заявки (Leads)**: захищена колекція з переглядом контактних звернень лікарів та зміною статусів (*Нова*, *В роботі*, *Опрацьована*, *Спам*).

---

## 8. Тестування та перевірка якості

### 8.1. Перевірка типів TypeScript
```bash
pnpm typecheck
```

### 8.2. Unit-тести (Vitest)
Перевіряють валідацію заявок через Zod, анти-спам пастки (honeypot/time-trap) та алгоритм обмеження частоти запитів (Rate Limiter):
```bash
pnpm test
```

### 8.3. E2E та Accessibility тести (Playwright)
Перевіряють роботу навігації, інтерактивного калькулятора CURB-65, акордеона FAQ, контактної форми та аудит доступності WCAG 2.2 AA (Chromium + Mobile):
```bash
pnpm test:e2e
```

### 8.4. Продакшен збірка
```bash
pnpm build
```

---

## 9. Налаштування домену, HTTPS та резервного копіювання

### Підключення домену та HTTPS (Let's Encrypt / Certbot)
У конфігурації `nginx/nginx.conf` передбачено точку для проходження ACME challenge `/.well-known/acme-challenge/`.
Для отримання сертифіката:
```bash
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  -d medhelper.ua -d www.medhelper.ua \
  --email admin@medhelper.ua --agree-tos --no-eff-email" certbot
```

### Резервне копіювання бази даних
Створення дампу бази даних PostgreSQL:
```bash
docker compose exec postgres pg_dump -U medhelper medhelper > backup_$(date +%Y%m%d_%H%M%S).sql
```

Відновлення з дампу:
```bash
cat backup_YYYYMMDD_HHMMSS.sql | docker compose exec -T postgres psql -U medhelper -d medhelper
```

---

## 10. Ліцензія

Проєкт розроблено як комерційне рішення для медичної платформи **MedHelper**. Усі права захищено.
