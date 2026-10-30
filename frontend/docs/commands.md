Here is the merged reference, with `verify` and the daily essentials at the top. Run everything from inside `frontend/` unless noted.

## Daily essentials

| Command | What it does |
|---|---|
| `pnpm run verify` | **The one to remember.** Runs lint, format check, typecheck, tests with coverage, then build, in that order. Stops at the first failure and exits 0 only if all pass. Run it before every commit. |
| `pnpm dev` | Starts the Vite dev server with hot reload. |
| `pnpm run format` | Rewrites files to match the Prettier style. The usual fix when `verify` fails at gate 2. |
| `pnpm exec eslint . --fix` | Auto-fixes lint problems where it's safe. |

## Environment setup

| Command | What it does |
|---|---|
| `nvm install 24` | Installs Node 24. |
| `nvm use` | Switches to the Node version in `.nvmrc` (24). Run it in each new terminal. |
| `nvm ls` | Lists installed Node versions and shows which is active. |
| `nvm alias default 24` | Makes Node 24 the default for every new terminal, so you don't need `nvm use` each time. |
| `node -v` / `pnpm -v` | Shows the active Node and pnpm versions. (`nvm -v` shows nvm's own version, not Node's.) |
| `corepack enable` | Makes the pnpm version pinned in `packageManager` available. |
| `pnpm install` | Installs dependencies into `node_modules/` and updates `pnpm-lock.yaml` if needed. |
| `pnpm install --frozen-lockfile` | Installs exactly what the lockfile says and fails if it's out of sync. Use it for clean-state checks and CI. |
| `pnpm approve-builds` | Approves dependency install scripts (such as `esbuild`) that pnpm blocks by default. |

## Running the app

| Command | What it does |
|---|---|
| `pnpm dev` | Starts the dev server on localhost. |
| `pnpm dev --port 3000` | Runs the dev server on a different port, useful if 5173 is taken. |
| `pnpm dev --host` | Exposes the server to your local network, so you can test on a phone. Not public, but visible to others on your Wi-Fi. |
| `lsof -i :5173` | Shows what is using port 5173 if the server won't start. |
| `pnpm run build` | Bundles `src/` into an optimized production build in `dist/`. |
| `pnpm exec vite preview` | Serves the built `dist/` locally so you can check the production bundle. Run `build` first. (The template may also provide `pnpm preview`.) |

## Quality gates

| Command | Gate | What it does |
|---|---|---|
| `pnpm run lint` | 1 | Runs ESLint over the project and reports code problems. |
| `pnpm run format:check` | 2 | Checks formatting with Prettier without changing files. |
| `pnpm run typecheck` | 3 | Runs `tsc -b`, which type-checks every referenced tsconfig project. |
| `pnpm run test:coverage` | 4 | Runs the tests once with coverage and fails below the 80% thresholds. |
| `pnpm run build` | 5 | Compiles the production bundle. |
| `pnpm run verify` | all | Runs gates 1 to 5 in order and exits 0 only if all pass. |
| `pnpm run verify; echo "exit: $?"` | all | Same, but prints the exit code so you can prove it is 0. |

## Linting

| Command | What it does |
|---|---|
| `pnpm run lint` | Runs ESLint with `--max-warnings 0`, so any warning also fails. |
| `pnpm run lint; echo "exit: $?"` | Same, and prints the exit code so you can prove it is 0 (or 1 on a violation). |
| `pnpm exec eslint --print-config src/components/Greeting.tsx` | Prints the final merged config for one file. Use it when a rule is not behaving as expected. |
| `pnpm exec eslint . --fix-dry-run` | Previews what `--fix` would change without writing files. |
| `pnpm exec eslint . --format json` | Machine-readable output. |
| `pnpm exec eslint --version` | Should print v9.39.x (the repo is held below ESLint 10). |
| `pnpm why eslint` | Shows what depends on ESLint. It should report one version. |

See `docs/eslint-learning-reference.md` for rule decisions and a table of
probes to confirm each rule fires.

## Inspecting scripts

| Command | What it does |
|---|---|
| `pnpm run` | With no script name, lists every script in `package.json`. |

## Fixing and iterating

| Command | What it does |
|---|---|
| `pnpm run format` | Fixes formatting across the project. |
| `pnpm exec eslint . --fix` | Auto-fixes safe lint problems. |
| `pnpm run test` | Runs the tests once, with no coverage. Quicker while developing. |
| `pnpm exec vitest` | Runs Vitest in watch mode and re-runs tests on changes. Press `q` to quit. |
| `pnpm exec vitest run --coverage` | Same as `test:coverage`, run directly. Handy when you want to add flags. |
| `pnpm exec tsc -b --force` | Typechecks while ignoring cached build info. Use it if `typecheck` seems to pass when it shouldn't. |
| `open coverage/index.html` | Opens the HTML coverage report in your browser (macOS). |

## Working on one file at a time

| Command | What it does |
|---|---|
| `pnpm exec eslint src/components/Greeting.tsx` | Lints a single file. |
| `pnpm exec prettier --check src/components/Greeting.tsx` | Checks one file's formatting. |
| `pnpm exec prettier --write src/components/Greeting.tsx` | Formats one file. |
| `pnpm exec vitest run src/components/Greeting.test.tsx` | Runs a single test file. |

## Managing dependencies

| Command | What it does |
|---|---|
| `pnpm add <pkg>` | Adds a runtime dependency. |
| `pnpm add -D <pkg>` | Adds a dev dependency (tooling, testing, linting). |
| `pnpm remove <pkg>` | Removes a dependency. |
| `pnpm ls --depth=0` | Lists direct dependencies and their installed versions. Use it to fill in `docs/quality-gates.md`. |
| `pnpm ls vitest @vitest/coverage-v8` | Checks that the two Vitest packages are on the same version. |
| `pnpm why <pkg>` | Shows which dependency pulled in a package. Useful for "cannot find module" errors under pnpm's strict layout. |
| `pnpm outdated` | Shows which dependencies have newer versions available. |
| `pnpm update` | Updates dependencies within the ranges in `package.json`. |
| `pnpm audit` | Checks dependencies for known vulnerabilities. |
| `pnpm store prune` | Cleans unused packages from pnpm's global store. |

## Clean-state proof

| Command | What it does |
|---|---|
| `rm -rf node_modules dist coverage` | Deletes installed packages and generated output. |
| `pnpm install --frozen-lockfile && pnpm run verify; echo "exit: $?"` | Reinstalls from the lockfile, runs every gate, and prints the exit code. You want `exit: 0`. |

## Git hygiene

| Command | What it does |
|---|---|
| `git status` | Confirms `pnpm-lock.yaml` is staged and `node_modules/`, `dist/` and `coverage/` are not. |
| `git check-ignore -v coverage` | Confirms a path is ignored, and shows which rule ignores it. |
