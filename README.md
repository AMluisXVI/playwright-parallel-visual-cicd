# Playwright Parallel Execution, Visual Checks & CI/CD

Playwright test suite that demonstrates three labs from the Coursera **"Automated Software Testing"** track:

1. **Authentication flows** — a small static app (login + welcome) built as a deterministic test target.
2. **Parallel execution & visual regression** — `workers: 4` + `toHaveScreenshot()` baselines.
3. **CI/CD with GitHub Actions** — every push to `main` and every pull request runs the full suite and uploads the HTML report as a build artifact.

## Project structure

```
├── app/
│   ├── login.html          # Login page (user: admin, password: 1234)
│   └── welcome.html        # Welcome page shown after login
├── tests/
│   ├── helpers.ts          # Shared login helper
│   ├── login.spec.ts       # 3 tests (valid, wrong password, empty fields)
│   ├── welcome.spec.ts     # 3 tests (loads, username, logout)
│   └── *-snapshots/        # Visual baselines (Linux/CI)
├── server.js               # Local static server (Node built-in http, no deps)
├── playwright.config.ts    # workers: 4, fullyParallel, webServer auto-start
└── .github/workflows/playwright.yml
```

## Run locally

```bash
npm ci
npx playwright test          # full suite (starts the app automatically)
npx playwright show-report   # open the latest HTML report
```

## CI/CD

The workflow `.github/workflows/playwright.yml` runs on:

- `push` to `main`
- `pull_request` targeting `main`

It runs on `ubuntu-latest` with Node 22, installs dependencies and browsers (`--with-deps` for system fonts), executes the suite, and uploads `playwright-report/` as an artifact so the HTML report is always available from the Actions run page.

> **Note on visual baselines:** screenshots are platform-specific. Baselines are generated and committed from the Ubuntu CI runner so the suite is deterministic in CI. Running the visual tests on a different OS (e.g. Fedora) can produce small pixel diffs from font rendering; the Docker image from the course lab solves that by giving every environment the same OS — a future exercise.