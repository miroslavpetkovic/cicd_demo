# Analiza projekta cicd-demo

Datum: 2026-05-01

---

## 1. Čemu služi projekat

Edukativni CI/CD demo projekat iz video lekcije o automatizaciji. Sadrži:

- Jednostavan Express REST API (lista kurseva)
- Calculator utility sa unit testovima
- GitHub Actions pipeline sa 4 faze: quality → test → build → deploy

Svrha je demonstracija kako se testiranje, linting, formatting i type-check automatizuju
pri svakom push-u na GitHub.

---

## 2. Glavni fajlovi

| Fajl                     | Uloga                                                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| src/api.ts               | Express server, endpointi: GET /health, GET /courses, GET /courses/:id |
| src/calculator.ts        | 5 matematičkih funkcija: add, subtract, multiply, divide, percentage   |
| tests/calculator.test.ts | 10 Jest testova za calculator                                          |
| .github/workflows/ci.yml | GitHub Actions pipeline (4 joba)                                       |
| package.json             | Zavisnosti i npm skripte                                               |
| tsconfig.json            | TypeScript konfiguracija                                               |
| jest.config.cjs          | Jest podešavanja (ts-jest preset)                                      |
| eslint.config.js         | ESLint 9.x flat config (novi format)                                   |
| .eslintrc.json           | ESLint legacy config (stari format) — DUPLIKAT, videti probleme        |
| .prettierrc              | Prettier pravila formatiranja                                          |

---

## 3. Nedostajući fajlovi / konfiguracija

- Nema testova za src/api.ts — pokrivenost koda je nepotpuna
- jest.config.cjs ima collectCoverageFrom samo za src/calculator.ts

---

## 4. Komande za pokretanje

```
npm install               # instaliraj zavisnosti
npm run typecheck         # provjeri TypeScript tipove
npm run format:check      # provjeri formatting
npm run lint              # pokreni linter
npm test                  # pokreni testove
npm run test:coverage     # testovi sa coverage izveštajem
npm run build             # kompajliraj TypeScript
npm start                 # pokreni server → http://localhost:3000
```

---

## 5. Problemi i neusaglašenosti

### Kritično

1. ts-jest/jest verzija nekompatibilnost
   - package.json: jest ^30.0.0 + ts-jest ^29.0.0
   - ts-jest 29.x ima peer dependency jest@^29.0.0
   - Rezultat: peer dependency konflikt pri npm install, testovi mogu pasti
   - Rešenje: downgrade jest na ^29.0.0 ILI upgrade ts-jest na verziju kompatibilnu sa Jest 30

2. Dupli ESLint konfig
   - Postoje i eslint.config.js (flat config, ESLint 9.x) i .eslintrc.json (legacy)
   - ESLint 9.x automatski ignoruje .eslintrc.json kada postoji eslint.config.js
   - Rešenje: ukloniti .eslintrc.json

### Umjereno

3. tsconfig.json rootDir = "."
   - Kompajlira i testove — u build/ folderu se pojavljuje i tests/ folder
   - Rešenje: rootDir ./src + isključiti testove iz build outputa

4. ESLint globals za Jest ručno definisani u eslint.config.js
   - Bolje rešenje: koristiti globals paket sa globals.jest

### Sitno

5. process.argv[1]?.includes("api") u api.ts — krhka provera za direktno pokretanje
6. collectCoverageFrom ne prati src/api.ts
7. Deploy job u CI pipeline-u sadrži samo echo komande (očekivano za demo)

---

## 6. Predlog narednih koraka

1. Popravi verzije: downgrade jest na ^29.0.0 ili uskladi ts-jest
2. Ukloni .eslintrc.json
3. Pokreni npm install i provjeri peer dependency upozorenja
4. Opciono: dodati testove za src/api.ts
