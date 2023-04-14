import React, { useState } from "react";
import styled from "@emotion/styled";
import { vitals } from "../utils/utility";
import MultipleSelectChip from "./MultiSelectDropDown";
import { Button } from "@mui/material";
import { oneDayInMillis } from "../constans";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  minWidth: "70vw",
  maxHeight: "100vh",
  position: "fixed",
  top: "20px",
  borderRadius: "10px",
  overflow: "scroll",
  left: "15vw",
}));

const generateFollowups = (
  startDate,
  gap,
  cnt,
  instruction,
  selectedVitals
) => {
  let _vitals = new Array(6);
  _vitals.fill(false, 0, vitals.length);

  selectedVitals.forEach((v) => {
    _vitals[vitals.indexOf(v)] = true;
  });

  let date = new Date(startDate).valueOf();
  let followups = [];
  gap++;
  while (cnt > 0) {
    let obj = {
      dateOfFollowUp: new Date(date).toISOString().substring(0, 10),
      instruction,
      vitals: _vitals,
    };
    followups.push(obj);
    date += oneDayInMillis * gap;
    cnt--;
  }
  return followups;
};

const FollowUpModal = ({ addFollowUps, setShowModal }) => {
  const [multiple, setMultiple] = useState(false);
  const [gap, setGap] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [cnt, setCnt] = useState(1);
  const [instruction, setInstruction] = useState("");
  const [selectedVitals, setSelectedVitals] = useState([]);

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleCntChange = (e) => {
    setCnt(e.target.value);
  };

  const handleGapChange = (e) => {
    setGap(e.target.value);
  };

  const handleFlwupType = (e) => {
    setMultiple(e.target.value > 1);
  };

  const handleDateChange = (e) => {
    let date = new Date(e.target.value).valueOf();
    let today = new Date().valueOf(); //alert(date);

    if (date <= today) {
      alert("Only future dates are allowed");
      setStartDate("");
      return;
    }

    setStartDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // create object of the follow up and add into list of the
    let _followups = generateFollowups(
      startDate,
      gap,
      cnt,
      instruction,
      selectedVitals
    );

    addFollowUps(_followups);

    setShowModal(false);
  };

  return (
    <Container className="modalContainer">
      <div
        style={{
          float: "right",
          marginTop: "5px",
          marginRight: "18px",
          height: "20px",
          cursor: "pointer",
          fontSize: "45px",
          color: "rgb(0,100,100)",
        }}
        onClick={(e) => setShowModal(false)}
      >
        &times;
      </div>
      <form
        className="modalForm"
        onSubmit={handleSubmit}
        style={{ margin: "30px" }}
      >
        <h2 style={{ textAlign: "center" }}>Follow up details</h2>
        <div className="flwupType ">
          <label htmlFor="startd" style={{ fontWeight: "" }}>
            Follow up Start Date :{" "}
          </label>
          <input
            type="date"
            name="startd"
            required
            value={startDate}
            onChange={handleDateChange}
          />
          <br />
          <br />
          <input
            type="radio"
            name="flwup"
            value={1}
            onChange={handleFlwupType}
            checked={!multiple}
          />
          <span style={{ fontWeight: "", fontSize: "20px" }}>single</span>
          &nbsp; &nbsp;
          <input
            type="radio"
            name="flwup"
            value={2}
            onChange={handleFlwupType}
            checked={multiple}
          />
          <span style={{ fontWeight: "", fontSize: "20px" }}>multiple</span>
          <br />
          <br />
          <br />
          {multiple && (
            <>
              <div className="form-item">
                <label htmlFor="gap">Gap : </label>
                <input
                  type="number"
                  name="gap"
                  value={gap}
                  required
                  min={1}
                  max={60}
                  onChange={handleGapChange}
                />
              </div>
              <div className="form-item">
                <label htmlFor="cnt">No. of follow ups : </label>
                <input
                  type="number"
                  name="cnt"
                  value={cnt}
                  required
                  min={1}
                  max={100}
                  onChange={handleCntChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="flwupInstruction" style={{ fontWeight: "400" }}>
            Instructions :&nbsp;&nbsp;{"    "}
          </label>
          <textarea
            style={{
              maxWidth: "auto",
              minWidth: "30vw",
              minHeight: "20vh",
              maxHeight: "100vh",
              flexBasis: "content",
            }}
            placeholder="Instruction for healthworker"
            name="flwupInstruction"
            value={instruction}
            required
            onChange={handleInstructionChange}
          />
        </div>
        <br />
        <br />
        <MultipleSelectChip options={vitals} handler={setSelectedVitals} />
        <Button
          type="submit"
          variant="outlined"
          style={{
            marginLeft: "45%",
            marginBottom: "2%",
            fontWeight: "bold",
            border: "2px solid",
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FollowUpModal;
