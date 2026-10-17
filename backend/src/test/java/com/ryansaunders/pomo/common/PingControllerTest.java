package com.ryansaunders.pomo.common;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class PingControllerTest {

  @Test
  void pingReturnsPong() {
    assertEquals("pong", new PingController().ping());
  }
}
