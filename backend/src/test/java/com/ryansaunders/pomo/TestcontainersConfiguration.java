package com.ryansaunders.pomo;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.postgresql.PostgreSQLContainer;

/** Provides a throwaway PostgreSQL container for tests. */
@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {

  /**
   * Creates the PostgreSQL container used by tests.
   *
   * @return a pinned PostgreSQL container
   */
  @Bean
  @ServiceConnection
  PostgreSQLContainer postgres() {
    return new PostgreSQLContainer("postgres:17-alpine");
  }
}
