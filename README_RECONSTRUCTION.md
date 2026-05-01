# cicd-demo — reconstructed from video lesson

This project is reconstructed from the video lesson **CI CD Integration with Claude Code**.

## What is certain from the video

- Project name: `cicd-demo`
- Main topic: GitHub Actions CI/CD pipeline with testing, code quality and security scanning.
- Main folders:
  - `src/`
  - `tests/`
  - `.github/workflows/`
- Visible files:
  - `src/api.ts`
  - `src/calculator.ts`
  - `tests/calculator.test.ts`
  - `.github/workflows/ci.yml`
  - `.gitignore`
  - `.prettierrc`
  - `.eslintrc.json`
  - `package.json`
  - `tsconfig.json`
- Visible Claude prompt:
  - `Read .github/workflows/ci.yml and explain what each job does, in what order they run, and why the pipeline is structured this way`
  - `My pipeline is failing on the ESLint job. Read all files in src/ and tests/ and fix any linting errors so the pipeline passes`

## What is reconstructed

- `jest.config.cjs` is reconstructed because the video shows Jest/ts-jest installation and tests, but the config file was not clearly readable.
- `eslint.config.js` is reconstructed because the final frame suggests a new ESLint config file was added, probably to support modern ESLint.
- `tsconfig.json` uses `"rootDir": "."`; the video earlier shows `"rootDir": "./src"`, but that can fail when tests are included outside `src/`.
- `.github/workflows/ci.yml` follows the final visible optimization: combined quality/security job, Node `22`, `npm install`, concurrency, and deploy guard for `push` to `main`.

## Local usage

```bash
npm install
npm run lint
npm run format:check
npm run test
npm run test:coverage
npm run build
npm start
```

API runs on:

```text
http://localhost:3000
```

Useful endpoints:

```text
GET /health
GET /courses
GET /courses/:id
```
