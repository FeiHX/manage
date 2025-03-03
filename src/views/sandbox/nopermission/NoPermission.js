import React, { useEffect, useState } from "react";
import "./NoPermission.css";

export default function NoPermission() {
  return (
    <div id="app">
      <div>403</div>
      <div className="txt">
        Forbidden
        <span className="blink">_</span>
      </div>
    </div>
  );
}
