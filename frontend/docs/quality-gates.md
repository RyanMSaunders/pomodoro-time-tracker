## Frontend (`frontend/`)

React + TypeScript app built with Vite, tested with Vitest. All gates run
through a single command from `frontend/`:

```bash
pnpm run verify
```

### Gates (in order)

`verify` chains the gates with `&&`, so it runs them in this order and stops
at the first failure. It exits 0 only if all five pass.

| # | Gate         | Script                  | Tool                  | What it enforces                                      |
|---|--------------|-------------------------|-----------------------|-------------------------------------------------------|
| 1 | Lint         | `pnpm run lint`         | ESLint 9 (flat config) + airbnb-extended | Airbnb, TypeScript, React, hooks, jsx-a11y, import and Vitest rules. Runs with `--max-warnings 0`, so warnings fail. |
| 2 | Format check | `pnpm run format:check` | Prettier              | Consistent formatting (`.prettierrc`: single quotes, semicolons, no trailing commas, 80 columns) |
| 3 | Typecheck    | `pnpm run typecheck`    | `tsc -b`              | Strict type checking across all referenced projects   |
| 4 | Test + coverage | `pnpm run test:coverage` | Vitest + v8 coverage | Tests pass and coverage meets the 80% thresholds   |
| 5 | Build        | `pnpm run build`        | `vite build`          | Production bundle compiles into `dist/`               |

`build` is plain `vite build` (not `tsc -b && vite build`) because gate 3
already typechecks. Local helper scripts: `dev`, `format` (writes fixes),
and `test` (single run, no coverage).

### Pinned versions

| Tool                       | Version   |
|----------------------------|-----------|
| Node                       | 24.22.0 (`.nvmrc`: `24`; `engines`: `>=24 <25`) |
| pnpm                       | _from `packageManager` in `package.json`_ |
| Vite                       | 8.3.4     |
| Vitest                     | 5.0.5     |
| @vitest/coverage-v8        | _must match Vitest exactly_ |
| React / React DOM          | 19.3.1    |
| TypeScript                 | 6.0.3     |
| ESLint                     | 9.39.5 (held below 10, see "Linting") |
| @eslint/js                 | 9.39.5 (must match ESLint) |
| eslint-config-airbnb-extended | 3.3.0  |
| typescript-eslint          | 8.72.0    |
| @vitest/eslint-plugin      | 1.6.28    |
| eslint-plugin-react-refresh | 0.5.7    |
| Prettier                   | 3.9.10    |
| eslint-config-prettier     | 10.1.8    |
| jsdom                      | 30.1.3    |
| @testing-library/react     | 16.3.3    |
| @testing-library/dom       | 10.4.2    |
| @testing-library/jest-dom  | 7.0.1     |

These are the versions resolved at the time of writing. Versions are locked by
`pnpm-lock.yaml` (committed), which is the source of truth. `.npmrc` sets
`engine-strict=true`, so installs fail on the wrong Node version. CI and
Docker must use Node 24 and pnpm (via `corepack enable`), and install with
`pnpm install --frozen-lockfile`.

### Linting

Configured in `eslint.config.js` (flat config). The rules start from
`eslint-config-airbnb-extended`, plus project overrides. Full explanation and
the rule-by-rule decisions are in `docs/eslint-learning-reference.md`.

- **ESLint is held at 9.** Airbnb-extended, `eslint-plugin-react`,
  `eslint-plugin-import` and `eslint-plugin-jsx-a11y` do not declare ESLint 10
  support, and `eslint-plugin-react` crashes on it. ESLint 9.39.5 is marked
  "no longer supported" by npm, so revisit when those plugins support 10. Do
  not run `pnpm update --latest` without checking.
- **`--max-warnings 0`:** a `warn` rule fails `lint`, `verify` and the
  pre-commit hook, so `warn` is effectively "fix before merging".
- **Import rules use the `import-x/` prefix** (airbnb-extended uses
  `eslint-plugin-import-x`).
- **Plugins come from airbnb-extended.** Do not add `eslint-plugin-react`,
  `-jsx-a11y`, `-import` or `-react-hooks` to `package.json` separately, to
  avoid two copies of a plugin.
- **Tests** get the `@vitest/eslint-plugin` recommended rules.
- **Ignored:** `dist`, `coverage` and `docs` (the `docs/linting/*.js` template
  files are CommonJS and are reference only).
- **Default exports** are expected (`import-x/prefer-default-export`), and
  object shapes use `interface`.
- **MUI:** `!important` inside an `sx` prop is a warning.
- Underscore-prefixed names are ignored by `no-unused-vars` for parameters and
  destructuring, but `no-underscore-dangle` still rejects `const _x`.

### Coverage

Thresholds are set in `vite.config.ts` under `test.coverage.thresholds`, so
Vitest itself fails the run if any metric drops below 80%:

| Metric     | Threshold |
|------------|-----------|
| Lines      | 80%       |
| Statements | 80%       |
| Functions  | 80%       |
| Branches   | 80%       |

`coverage.include` is `src/**/*.{ts,tsx}`, so untested source files count
against the totals rather than silently disappearing from the report.

Excluded from coverage, deliberately:

| Pattern                  | Why                                                                 |
|--------------------------|---------------------------------------------------------------------|
| `src/main.tsx`           | Bootstrap only (mounts React into the DOM). No logic to test, and it would drag a small codebase below the threshold. |
| `src/**/*.test.{ts,tsx}` | Test files are not production code.                                 |
| `src/test/**`            | Test setup helpers (`setup.ts`).                                    |
| `src/**/*.d.ts`          | Type declarations contain no executable code.                       |

Revisit this list if real logic ever moves into `main.tsx`.

### TypeScript strictness

`"strict": true` is declared in the root `tsconfig.json` and also in each
referenced project (`tsconfig.app.json` and `tsconfig.node.json`). The root
file only holds `files: []` and project references, and compiler options on
it are **not** inherited by the referenced projects, so the setting in those
two files is what actually enforces strictness on the code. The root
declaration is kept for visibility. `tsc -b` builds all referenced projects.

### Build scripts (pnpm)

pnpm does not run dependency install scripts by default. Approved via
`pnpm approve-builds`: `esbuild` (needed by Vite). The approval is stored in
the project's pnpm configuration and committed. _(Remove this section if
pnpm never prompted you.)_

### Test setup notes

- Tests import `describe`, `it`, `expect` from `vitest` explicitly. Vitest
  `globals` are off, which keeps the typecheck gate clean.
- `src/test/setup.ts` registers the jest-dom matchers and runs Testing
  Library's `cleanup` after each test, which is required without globals.
- `vite.config.ts` imports `defineConfig` from `vitest/config` so the `test`
  key is typed correctly.