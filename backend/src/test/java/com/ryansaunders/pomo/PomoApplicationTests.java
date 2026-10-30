package com.ryansaunders.pomo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

/** Verifies that the Spring application context starts. */
@Import(TestcontainersConfiguration.class)
@SpringBootTest
class PomoApplicationTests {

  /** Fails if the application context cannot load. */
  @Test
  void contextLoads() {}
}
