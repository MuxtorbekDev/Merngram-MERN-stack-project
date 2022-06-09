import React from "react";

export default function Loader() {
  return (
    <div>
      <div
        className="progress"
        style={{ backgroundColor: "rgba(247, 196, 12, 0.5)", marginTop: "30%" }}
      >
        <div className="indeterminate" style={{ backgroundColor: "red" }}></div>
      </div>
    </div>
  );
}
