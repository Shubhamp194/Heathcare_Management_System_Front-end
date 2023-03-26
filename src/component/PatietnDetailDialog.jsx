import React, { useState } from "react";

const DataContainer = ({ citizen, handler, closeModal }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        left: "23%",
        top: "10%",
        width: "55%",
        // height: "70%",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "15px",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <h2 style={{}}>
        Patient Details{" "}
        <div
          style={{
            display: "inline",
            float: "right",
            cursor: "pointer",
            fontSize: "28px",
          }}
          onClick={() => closeModal(false)}
        >
          &times;
        </div>
      </h2>

      {Object.keys(citizen).map((k, key) => {
        return (
          <p key={key} style={{ marginTop: "0", textTransform: "uppercase" }}>
            <span style={{ fontWeight: "bold" }}>{k}</span>
            {" : " + citizen[k]}
          </p>
        );
      })}
      <button
        style={{
          padding: "10px",
          fontSize: "15px",
          fontWeight: "bold",
          borderRadius: "10px",
          marginBottom: "20px",
          backgroundColor: "rgba(0,100,200,0)",
        }}
        onClick={() => handler()}
      >
        confirm and submit
      </button>
    </div>
  );
};

const PatientDetailDialog = ({ citizen, handler, closeModal }) => {
  const [loading, isLoading] = useState(false);

  return (
    <div className="patientDataContainer">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DataContainer
          citizen={citizen}
          closeModal={closeModal}
          handler={handler}
        />
      )}
    </div>
  );
};

export default PatientDetailDialog;
