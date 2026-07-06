# Telnyx WebdriverIO Test Suite

E2E тести для сайту [telnyx.com](https://telnyx.com) на базі WebdriverIO 9 + Mocha + Allure Report.

---

## Встановлення

```bash
npm install
```

---

## Запуск тестів

| Команда | Опис |
|---|---|
| `npm test` | Всі тести (Chrome headless) |
| `npm run test:chrome` | Тільки Chrome |
| `npm run test:firefox` | Тільки Firefox |
| `npm run test:edge` | Тільки Edge |
| `npm run test:file -- --spec test/specs/home.spec.js` | Один файл |

---

## Allure Report

```bash
# Генерувати звіт
npm run allure:generate

# Відкрити у браузері
npm run allure:open

# Обидва кроки разом
npm run allure:report
```

---

## Cross-environment

Встанови змінну `TEST_ENV` перед запуском:

```bash
TEST_ENV=staging npm test
TEST_ENV=dev npm test
TEST_ENV=prod npm test   # за замовчуванням
```

---

## Docker

### Локальний запуск

```bash
# Запустити з Selenium Grid + Chrome + Firefox
docker compose up --abort-on-container-exit

# Із конкретним середовищем
TEST_ENV=staging docker compose up
```

### Зупинити

```bash
docker compose down
```

---

## GitHub Actions + GitHub Pages

Pipeline запускається автоматично при push у `main`.  
Allure Report публікується на **GitHub Pages**: `https://<username>.github.io/<repo>/`

### Налаштування GitHub Pages (один раз):
1. Зайди в Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root

---

## Структура проекту

```
├── configs/
│   ├── environments.js         # URL для dev/staging/prod
│   ├── wdio.chrome.conf.js
│   ├── wdio.firefox.conf.js
│   └── wdio.edge.conf.js
├── test/
│   ├── pageobjects/
│   │   ├── base.page.js
│   │   ├── home.page.js
│   │   ├── pricing.page.js
│   │   └── signup.page.js
│   └── specs/
│       ├── home.spec.js        # 10 тестів
│       ├── pricing.spec.js     # 10 тестів
│       └── signup.spec.js      # 15 тестів
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── wdio.conf.js                # базовий конфіг
└── package.json
```
