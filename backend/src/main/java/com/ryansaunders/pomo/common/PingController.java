package com.ryansaunders.pomo.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** Simple liveness endpoint. */
@RestController
public class PingController {

  /**
   * Returns a constant response.
   *
   * @return the string "pong"
   */
  @GetMapping("/ping")
  public String ping() {
    return "pong";
  }
}