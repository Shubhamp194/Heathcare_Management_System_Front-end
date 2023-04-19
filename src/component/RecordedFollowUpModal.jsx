import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginatedDataContainer = ({ data, handler }) => {
  const handlePageChange = (e, page) => {
    alert(page);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "50%",
        borderRadius: "10px",
        position: "absolute",
        left: "25%",
        top: "10%",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          margin: "0",
          marginRight: "2%",
          cursor: "pointer",
          float: "right",
          display: "inline",
        }}
        onClick={(e) => handler(false)}
      >
        &times;
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "10px" }}>Follow Ups</h2>
        <div
          style={{
            backgroundColor: "#dadada",
            scrollbarWidth: "none",
            height: "55vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
          <p>blah</p>
        </div>
        <Pagination
          variant="outlined"
          color="primary"
          style={{ margin: "20px 0" }}
          count={2}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginatedDataContainer;
