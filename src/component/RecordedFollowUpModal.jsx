import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import CardContent from "./CardContent";
import { vitals } from "../utils/utility";
import _ from "lodash";

const PaginatedDataContainer = ({ data, handler }) => {
  const [followup, setFollowUp] = useState(data[0]);

  const handlePageChange = (e, page) => {
    setFollowUp(data[page - 1]);
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
          <div style={{ padding: "10px" }}>
            <CardContent
              data={new Date(followup["dateOfFollowUp"]).toLocaleDateString()}
              label={"Date Of FollowUp"}
            />
            <CardContent
              data={
                followup["instruction"] === null
                  ? "NA"
                  : followup["instruction"]
              }
              label={"Instruction"}
            />
            {followup["status"] === 0 ? (
              <h3 style={{ textAlign: "center", marginTop: "15%" }}>
                Follow up is yet to be done
              </h3>
            ) : (
              <>
                <CardContent
                  data={
                    followup["actualDateOfFollowUp"] === null
                      ? "NA"
                      : followup["actualDateOfFollowUp"]
                  }
                  label={"Actual date of filling"}
                />

                <CardContent
                  data={
                    followup["observation"] === null
                      ? "NA"
                      : followup["observation"]
                  }
                  label={"Health Worker's Observation"}
                />
                <h3>Vitals Collected (if any)</h3>
                {vitals.map((v, id) => {
                  return (
                    followup[_.camelCase(v)] && (
                      <CardContent
                        key={id}
                        data={followup[_.camelCase(v)]}
                        label={v}
                      />
                    )
                  );
                })}
              </>
            )}
          </div>
        </div>
        <Pagination
          variant="outlined"
          color="primary"
          style={{ margin: "20px 0" }}
          count={data.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginatedDataContainer;
