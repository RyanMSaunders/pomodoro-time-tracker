# Pomodoro Time Tracker

One-sentence description: a Pomodoro timer and time tracker (TODO: add what makes it distinctive).

## Tech Stack

- **Frontend:** React + TypeScript, Vite (`frontend/`)
- **Backend:** Spring Boot, Maven (`backend/`)
- **Database:** TODO (e.g. PostgreSQL), migrations in `backend/src/main/resources/db/migration`
- **Tooling:** pnpm, ESLint, Prettier, Husky, lint-staged
- **CI/CD:** GitHub Actions (TODO: add once the workflows are filled in)

## Repository Layout

    .
    ├── frontend/   # Web client
    ├── backend/    # API service
    ├── .github/    # PR template and workflows
    └── docker-compose.yml

## Prerequisites

- Node.js 24 (`engines` is `>=24 <25` and `engine-strict` is on). Use `nvm use` to switch.
- pnpm 12, pinned by the `packageManager` field in `frontend/package.json`. Enable it with `corepack enable`.
- Java TODO version (Maven wrapper is included: `./mvnw`)
- Docker (TODO: if used for the local database)

## Getting Started

The root and `frontend/` are **separate pnpm projects**, each with its own `pnpm-lock.yaml` and `node_modules`. They are not a pnpm workspace, so installing in one does not install the other. Run both installs, in this order, from a clean checkout or new worktree:

1. Use the right Node version:
   `nvm use` (must be Node 24)
2. Install root dependencies (this also sets up the Husky hooks):
   `pnpm install`
3. Install frontend dependencies:
   `cd frontend && pnpm install --frozen-lockfile`
4. Copy the env templates and fill in values:
   `cp frontend/.env.example frontend/.env`
   `cp backend/.env.example backend/.env`
5. Check the setup: `pnpm --dir frontend verify`
6. Start the app (TODO: exact commands for the backend and frontend).

### New git worktree

`node_modules`, `.env` files, and `coverage/` are untracked, so a new worktree starts without them. Repeat the steps above in the new worktree. Do not copy or symlink `node_modules` from another checkout.

### Troubleshooting

- **`Cannot find native binding` / `Cannot find module '@rolldown/binding-...'`** (from Vitest or Vite): the platform-specific native binary was not installed. This usually means `node_modules` came from an interrupted install or a different CPU architecture. Fix it with a clean reinstall:
  `cd frontend && rm -rf node_modules && pnpm install --frozen-lockfile`
  Also check that `node -p "process.arch"` prints `arm64` on Apple Silicon (not `x64` from a Rosetta Node).
- **`Node 24 required`** or an engine error: run `nvm use`, then reinstall.
- **`prettier --check` fails**: run `pnpm --dir frontend format`.

## Environment Variables

Real values live in untracked `.env` files. Never commit them.

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | frontend | Base URL of the API |
| `SPRING_PROFILES_ACTIVE` | backend | Active Spring profile |
| `SPRING_DATASOURCE_URL` | backend | Database connection URL |
| `SPRING_DATASOURCE_USERNAME` | backend | Database user |
| `SPRING_DATASOURCE_PASSWORD` | backend | Database password |

## Common Commands

| Task | Command |
|---|---|
| Frontend lint | `pnpm --dir frontend lint` |
| Frontend format | `pnpm --dir frontend format` |
| Frontend full check | `pnpm --dir frontend verify` (lint, format check, typecheck, tests with coverage, build) |
| Backend full check | `cd backend && ./mvnw verify` |

## Code Quality and Guardrails

- `.gitignore` keeps `.env` files out; only `.env.example` is tracked.
- `.gitattributes` and `.editorconfig` enforce LF line endings and consistent style.
- A Husky pre-commit hook runs lint-staged, which runs ESLint and Prettier on staged frontend files.
- PRs use `.github/pull_request_template.md`.

## Contributing

- Branch from `main`, using the `POMO-x.y` naming convention (TODO: confirm).
- Use conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:`).
- Complete the PR template checklist before requesting review.

## License

TODO
