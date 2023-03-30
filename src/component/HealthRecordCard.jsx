import React from "react";

const HRCard = ({ hr, modalHandler }) => {
  const { conclusion: symptoms, treatment, creationDate } = hr;

  // const handleShowHR = () => {
  //   console.log("haha");
  // };

  return (
    <div
      style={{
        backgroundColor: "rgb(183,223,255)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "3px 3px 6px 2px rgba(0,0,0,0.35)",
        // width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          flex: 4,
        }}
      >
        <p
          style={{
            margin: "0",
            marginTop: "0px",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Symptoms :
          </span>{" "}
          {symptoms}
        </p>
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
            Treatment :
          </span>{" "}
          {treatment}
        </p>
        <p
          style={{
            margin: "0",
            marginTop: "10px",
            color: "rgba(0,0,0,0.65)",
          }}
        >
          {new Date(creationDate).toLocaleDateString()}
        </p>
      </div>

      <button
        style={{
          flex: 1,
          marginLeft: "10px",
          border: "2px solid black",
          fontWeight: "bold",
          backgroundColor: "rgba(0,0,0,0)",
          fontSize: "16px",
          width: "115px",
          padding: "1%",
          cursor: "pointer",
          boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => modalHandler(hr)}
      >
        show
      </button>
    </div>
  );
};

export default HRCard;
