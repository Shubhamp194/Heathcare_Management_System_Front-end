import React from "react";

const CardContent = ({ label, data }) => {
  return (
    <p
      style={{
        margin: "0",
        marginTop: "10px",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {label + " : "}
      </span>
      {data}
    </p>
  );
};
export default CardContent;
