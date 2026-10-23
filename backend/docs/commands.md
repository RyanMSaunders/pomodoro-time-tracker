

| Category | Command | What it does |
|---|---|---|
| **Build** | `./mvnw verify` | Compiles, runs tests, and runs all quality gates (Spotless, Checkstyle, SpotBugs, JaCoCo). Your main "is everything OK?" command. |
| | `./mvnw clean verify` | Deletes `target/`, then runs `verify` from scratch. Use it for final checks or when results look stale. |
| | `./mvnw test` | Compiles and runs tests only, with no quality gates. Faster feedback while coding. |
| | `./mvnw compile` | Compiles the main code only. |
| | `./mvnw clean` | Deletes the `target/` folder. |
| | `./mvnw package` | Builds the runnable `.jar` into `target/`. |
| | `./mvnw -v` | Shows the Maven and Java versions in use. |
| **Run the app** | `./mvnw spring-boot:run` | Starts the app from source on port 8080. Stop it with `Ctrl+C`. |
| | `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev` | Starts with the `dev` profile, loading `application-dev.yml`. |
| | `./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=9090` | Passes a Spring property, here changing the port. |
| | `SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run` | Same as the profile flag, set through an environment variable. |
| | `./mvnw spring-boot:test-run` | Starts the app with the Testcontainers config from `src/test`, so a throwaway PostgreSQL starts automatically. Needs a `TestPomoApplication` class, which Initializr generates with the Testcontainers dependency. |
| | `java -jar target/pomo-0.0.1-SNAPSHOT.jar` | Runs the built jar the way production does. Run `./mvnw package` first. |
| | `java -jar target/pomo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod` | Runs the jar with the `prod` profile. |
| **Check the running app** | `curl http://localhost:8080/ping` | Calls your endpoint. Should print `pong`. |
| | `curl -i http://localhost:8080/ping` | Same, but also shows the status code and headers. |
| | `lsof -i :8080` | Shows which process is using port 8080 (macOS/Linux). |
| | `kill <PID>` | Stops the process whose ID `lsof` showed. |
| **Quality gates** | `./mvnw spotless:apply` | Auto-formats Java code to Google style. |
| | `./mvnw spotless:check` | Reports formatting problems without changing files. |
| | `./mvnw checkstyle:check` | Runs only the style rules and fails on violations. |
| | `./mvnw compile spotbugs:check` | Compiles, then runs only SpotBugs. It needs compiled classes. |
| | `./mvnw test jacoco:report` | Runs tests, then writes the coverage report to `target/site/jacoco/index.html`. |
| | `./mvnw verify jacoco:check@check` | Re-runs the JaCoCo `check` execution that enforces the 80% rule. |
| | `./mvnw verify -Dspotless.check.skip=true` | Skips the Spotless check for one run. For experimenting only, never to get a commit through. |
| **Specific tests** | `./mvnw test -Dtest=PingControllerTest` | Runs one test class. |
| | `./mvnw test -Dtest=PingControllerTest#pingReturnsPong` | Runs one test method. |
| | `./mvnw test -Dtest='PingController*'` | Runs every test class matching the pattern. |
| | `./mvnw verify -DskipTests` | Skips tests. Quality gates still run, but JaCoCo will probably fail on missing coverage data. |
| **Debugging** | `./mvnw verify -e` | Shows full error stack traces. |
| | `./mvnw verify -X > /tmp/out.log 2>&1` | Very detailed debug logging, redirected to a file because the output is huge. |
| | `./mvnw verify -q` | Quiet mode: only errors and warnings print. |
| | `./mvnw verify -o` | Offline mode. Uses only what's already in `~/.m2`. |
| | `./mvnw test -pl .` | Runs only this module. Mostly useful in multi-module projects. |
| **Inspecting the project** | `./mvnw dependency:tree` | Prints every dependency and where it came from. |
| | `./mvnw dependency:tree -Dincludes=org.testcontainers` | Filters the dependency tree to matching entries. |
| | `./mvnw dependency:resolve` | Downloads every dependency without building. |
| | `./mvnw help:effective-pom` | Shows your `pom.xml` after merging in the Spring Boot parent's defaults. |
| | `./mvnw help:active-profiles` | Shows which Maven profiles are active. |
| | `./mvnw help:describe -Dplugin=spotless -Ddetail` | Lists a plugin's goals and options. |
| | `./mvnw versions:display-dependency-updates` | Lists dependencies with newer versions available. |
| | `./mvnw versions:display-plugin-updates` | Lists plugins with newer versions available. |
| | `./mvnw wrapper:wrapper -Dmaven=3.9.11` | Updates the Maven wrapper. The version is only an example, so pick a real one. |
| | `ls ~/.m2/repository` | Shows the local cache of downloaded dependencies. |
| | `rm -rf ~/.m2/repository/<path>` | Deletes one cached artifact when Maven reports a corrupted download. |
| **Java environment** | `java -version` | Shows the active Java version. Should say 25. |
| | `/usr/libexec/java_home -V` | Lists every installed JDK (macOS only). |
| | `echo $JAVA_HOME` | Shows which JDK Maven will use. |
| **Docker** | `docker info` | Confirms the Docker engine is running. An error means Docker Desktop isn't started. |
| | `docker ps` | Lists running containers. Run it during a test to see Testcontainers' PostgreSQL. |
| | `docker ps -a` | Lists all containers, including stopped ones. |
| | `docker images` | Lists downloaded images, such as `postgres:17-alpine`. |
| | `docker logs <container-id>` | Shows a container's output. Useful when PostgreSQL won't start. |
| | `docker stop <container-id>` | Stops a container. |
| | `docker rm <container-id>` | Removes a stopped container. |
| | `docker container prune` | Removes all stopped containers (asks for confirmation). |
| | `docker image prune` | Removes unused images to free disk space. |
| **Git** | `git status` | Shows changed and untracked files. Run it before every commit. |
| | `git diff` | Shows exact line changes that aren't staged. |
| | `git diff --stat` | Shows a short per-file summary of changes. |
| | `git add backend && git commit -m "..."` | Stages and commits everything under `backend/`. |
| | `git push` | Pushes your commits to GitHub. |
| | `git ls-files --stage backend/mvnw` | Shows the file mode. `100755` means the executable bit is committed. |
| | `git log --oneline -10` | Shows the last 10 commits, one line each. |
| | `git worktree list` | Shows all your worktrees, such as `POMO-0.1` and `POMO-1.1`. |
| | `git branch -vv` | Shows your branches and the remote branch each tracks. |
| | `git restore <file>` | Discards uncommitted changes in a file. Destructive, so check `git diff` first. |
| | `git restore --staged <file>` | Unstages a file without losing the changes. |
| **GitHub CLI** | `gh pr create` | Opens a pull request from the terminal. |
| | `gh pr status` | Shows the state of your open pull requests. |
| | `gh repo view --web` | Opens the repo in your browser. |

## Notes

- **Phases vs. goals:** a phase like `verify` runs every step before it. A goal like `spotless:apply` runs one plugin task on its own.
- **zsh comments:** don't paste `#` comments after commands at the prompt, because zsh passes them as arguments.
- **`spring-boot:run` for now:** it will fail with a datasource error once the JDBC and PostgreSQL dependencies are in, until Flyway and a local database exist. Until then, the tests are how you run the app.
- **Memorize first:** `./mvnw verify`, `./mvnw spotless:apply`, `./mvnw clean verify`, `curl localhost:8080/ping`, and `git status`.
