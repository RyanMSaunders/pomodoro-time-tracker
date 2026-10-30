package com.ryansaunders.pomo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Application entry point. */
@SpringBootApplication
public class PomoApplication {

  /**
   * Starts the Spring Boot application.
   *
   * @param args command-line arguments passed to the application
   */
  public static void main(String[] args) {
    SpringApplication.run(PomoApplication.class, args);
  }
}
