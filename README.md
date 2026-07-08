# Telnyx WebdriverIO Test Suite

E2E tests for [telnyx.com](https://telnyx.com) built with WebdriverIO 9 + Mocha + Allure Report.

---

## Installation

```bash
npm install
```

---

## Running tests

| Command | Description |
|---|---|
| `npm test` | All tests (Chrome headless) |
| `npm run test:chrome` | Chrome only |
| `npm run test:firefox` | Firefox only |
| `npm run test:edge` | Edge only |
| `npm run test:file -- --spec test/specs/home.spec.js` | A single spec file |

---

## Allure Report

```bash
# Generate the report
npm run allure:generate

# Open it in the browser
npm run allure:open

# Both steps at once
npm run allure:report
```

---

## Cross-environment

Set the `TEST_ENV` variable before running:

```bash
TEST_ENV=staging npm test
TEST_ENV=dev npm test
TEST_ENV=prod npm test   # default
```

---

## Docker

### Local run

```bash
# Start Selenium Grid + Chrome + Firefox
docker compose up --abort-on-container-exit

# With a specific environment
TEST_ENV=staging docker compose up
```

When `HUB_URL` is set (as in `docker-compose.yml`), the runner routes sessions to the
Selenium Grid hub; without it, tests run against a locally managed driver.

### Stop

```bash
docker compose down
```

---

## GitHub Actions + GitHub Pages

The pipeline runs automatically on every push to `main`.
The Allure Report is published to **GitHub Pages**: `https://<username>.github.io/<repo>/`

### One-time GitHub Pages setup:
1. Go to Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root

---

## Project structure

```
├── configs/
│   ├── environments.js         # URLs for dev/staging/prod
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
│       ├── home.spec.js        # 10 tests
│       ├── pricing.spec.js     # 10 tests
│       └── signup.spec.js      # 15 tests
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── wdio.conf.js                # base config
└── package.json
```
