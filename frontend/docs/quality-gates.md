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
| 1 | Lint         | `pnpm run lint`         | ESLint (flat config)  | typescript-eslint, React hooks and refresh rules      |
| 2 | Format check | `pnpm run format:check` | Prettier              | Consistent formatting (`semi: false`, single quotes)  |
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
| React / React DOM          | _x.y.z_   |
| TypeScript                 | _x.y.z_   |
| ESLint                     | _x.y.z_   |
| typescript-eslint          | _x.y.z_   |
| Prettier                   | _x.y.z_   |
| eslint-config-prettier     | _x.y.z_   |
| jsdom                      | _x.y.z_   |
| @testing-library/react     | _x.y.z_   |
| @testing-library/dom       | _x.y.z_   |
| @testing-library/jest-dom  | _x.y.z_   |

Versions are locked by `pnpm-lock.yaml` (committed). `.npmrc` sets
`engine-strict=true`, so installs fail on the wrong Node version. CI and
Docker must use Node 24 and pnpm (via `corepack enable`), and install with
`pnpm install --frozen-lockfile`.

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