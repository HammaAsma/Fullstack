import React from "react";

const Notification = ({ n }) => {
  if (n <= 0) {
    return null;
  }
  return (
    <p>
      Vous Avez {n} notification{n > 1 ? "s" : ""}.
    </p>
  );
};

export default Notification;
