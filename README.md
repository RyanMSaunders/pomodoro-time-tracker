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

- Node.js TODO version and pnpm TODO version
- Java TODO version (Maven wrapper is included: `./mvnw`)
- Docker (TODO: if used for the local database)

## Getting Started

1. Clone the repo and install root dependencies (this also sets up the Husky hooks):
   `pnpm install`
2. Install frontend dependencies:
   `cd frontend && pnpm install`
3. Copy the env templates and fill in values:
   `cp frontend/.env.example frontend/.env`
   `cp backend/.env.example backend/.env`
4. Start the app (TODO: exact commands for the backend and frontend).

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
| Frontend full check | `pnpm --dir frontend verify` (TODO: confirm the script exists) |
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
