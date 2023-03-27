import React, { useState } from "react";

const DataContainer = ({ citizen, handler, closeModal }) => {
  return (
    <div
      style={{
        overflow: "auto",
        backgroundColor: "white",
        position: "fixed",
        marginTop: "7%",
        marginLeft: "22%",
        width: "55%",
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
            marginLeft: "100px",
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
        onClick={(e) => handler(e)}
      >
        confirm and submit
      </button>
    </div>
  );
};

const PatientDetailDialog = ({ citizen, handler, closeModal }) => {
  const [loading, isLoading] = useState(false);

  return (
    <div
      className="patientDataContainer"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        left: "0px",
        top: "0px",
        bottom: "0px",
        right: "0",
        width: "100vw",
      }}
    >
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
