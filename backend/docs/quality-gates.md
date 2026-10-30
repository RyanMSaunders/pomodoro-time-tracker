# Backend Quality Gates

All gates run as part of `./mvnw verify` in `backend/`. Any failure fails the build.

| Gate | Tool | Phase | Config |
|---|---|---|---|
| Formatting | Spotless + google-java-format | `process-sources` | `backend/pom.xml` |
| Style | Checkstyle (Google conventions) | `verify` | `backend/config/checkstyle/checkstyle.xml` |
| Static analysis | SpotBugs | `verify` | `backend/config/spotbugs-exclude.xml` |
| Coverage | JaCoCo (80% line, bundle level) | `verify` | `backend/pom.xml` |

To fix formatting automatically, run `./mvnw spotless:apply`.

## Pinned versions

Versions are Maven properties in `backend/pom.xml`.

| Property | Version | Why pinned |
|---|---|---|
| `java.version` | 25 | Java version the project targets. |
| Spring Boot parent | 4.1.1 | Parent POM. Also manages Testcontainers, JDBC and PostgreSQL driver versions, so those are deliberately **not** pinned. |
| `spotless.version` | 3.10.4 | Spotless Maven plugin. Pinned for reproducible builds. |
| `google-java-format.version` | 1.35.0 | TODO: record why newer versions were not compatible (the reason is not recorded in the repo). Pinned separately from the Spotless plugin so formatting output does not change unexpectedly. |
| `checkstyle.plugin.version` | 3.6.0 | Maven Checkstyle plugin. |
| `checkstyle.version` | 14.3.0 | Checkstyle engine, set explicitly so it is not tied to the plugin's default. |
| `spotbugs.plugin.version` | 4.10.5.0 | SpotBugs Maven plugin. |
| `spotbugs.version` | 4.10.5 | SpotBugs engine, set explicitly so it is not tied to the plugin's default. |
| `jacoco.version` | 0.8.15 | JaCoCo Maven plugin and agent. |

## Gate details

### Spotless
`googleJavaFormat` runs a `check` at `process-sources`, so unformatted code fails the build before compilation.

### Checkstyle
- Uses the Google style config, with `violationSeverity` set to `warning`, so warnings fail the build.
- `includeTestSourceDirectory` is on, so tests are checked too. Public classes and methods need Javadoc.
- Fix violations in the code. Do not loosen the config.

### SpotBugs
- `effort=Max`, `threshold=Medium`.
- `config/spotbugs-exclude.xml` is empty. Add only narrow, commented exclusions for proven false positives.

### JaCoCo
- Rule: `BUNDLE` line coverage must be at least 0.80.
- `PomoApplication` is excluded because it only contains `main`.
- A passing gate does not prove it is wired up. To check, temporarily raise the minimum (for example to 0.99) and confirm the build fails, then revert.
- If coverage drops, open `backend/target/site/jacoco/index.html` to find the uncovered class.

## Integration tests (Testcontainers)

- Tests that use `@SpringBootTest` need a database because the JDBC starter is on the classpath.
- `TestcontainersConfiguration` (test sources) starts a `postgres:17-alpine` container with `@ServiceConnection`, so Spring picks up the URL and credentials automatically and no passwords are stored in the repo.
- Every `@SpringBootTest` must add `@Import(TestcontainersConfiguration.class)`.
- The image tag is pinned for reproducible runs.
- **Docker must be running** to execute `./mvnw verify`. The container exists only during the test run, so `docker ps` afterwards will not show it.
- If you see "Could not find a valid Docker environment", try `export DOCKER_HOST=unix://$HOME/.docker/run/docker.sock`.
- `PostgresSmokeTest` proves the container starts and answers a query.
