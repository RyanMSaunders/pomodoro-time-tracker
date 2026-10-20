package com.ryansaunders.pomo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;

/** Smoke test proving a PostgreSQL container starts and answers queries. */
@Import(TestcontainersConfiguration.class)
@SpringBootTest
class PostgresSmokeTest {

  /** Template used to query the containerized database. */
  @Autowired private JdbcTemplate jdbcTemplate;

  /** Runs a trivial query against the containerized database. */
  @Test
  void databaseAnswersSelectOne() {
    Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
    assertEquals(1, result);
  }
}
