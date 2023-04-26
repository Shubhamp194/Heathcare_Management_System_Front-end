import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../component/PieChart";
import NavBar from "../component/Navbar";

function FHWInfoPage() {
  const myStyle = {
    position: "absolute",
    top: "18%",
    left: "2%",
    height: "500px",
    width: "300px",
    // border: "2px solid black",
    padding: "10px",
    margin: "20px",
    fontWeight: "bold",
    // backgroundColor: "lightBlue",
  };

  const chartStyle1 = {
    // border: "3px solid black",
    position: "absolute",
    top: "30%",
    left: "28%",
    height: "300px",
    width: "300px",
    justifyContent: "center",
  };

  const chartStyle2 = {
    // border: "3px solid black",
    position: "absolute",
    top: "30%",
    left: "53%",
    height: "300px",
    width: "300px",
    justifyContent: "center",
  };

  const chartStyle3 = {
    // border: "3px solid black",
    position: "absolute",
    top: "30%",
    left: "77%",
    height: "300px",
    width: "300px",
    justifyContent: "center",
  };

  const { state } = useLocation();

  const fhwData = state.data;

  function calCompletedFollowups(followUps) {
    let count = 0;
    followUps.map((e) => {
      if (e.status === 1) count++;
    });
    return count;
  }

  function calBacklog(followUps) {
    let count = 0;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currDate = year + "-" + month + "-" + day;
    let currentDate = new Date(currDate).valueOf();
    followUps.map((e) => {
      if (e.status === 0) {
        let assignedDate = new Date(e.dateOfFollowUp).valueOf();
        if (currentDate > assignedDate) count++;
      }
    });
    return count;
  }

  function calUpcomingFollowUps(followUps) {
    let count = 0;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currDate = year + "-" + month + "-" + day;
    let currentDate = new Date(currDate.valueOf());
    followUps.map((e) => {
      if (e.status === 0) {
        let assignedDate = new Date(e.dateOfFollowUp).valueOf();
        if (currentDate <= assignedDate) count++;
      }
    });
    return count;
  }

  function calCompletedAfterDeadline(followUps) {
    let count = 0;
    followUps.map((e) => {
      if (e.status === 1) {
        let actualDate = new Date(e.actualDateOfFollowUp).valueOf();
        let assignedDate = new Date(e.dateOfFollowUp).valueOf();
        if (actualDate > assignedDate) count++;
      }
    });
    return count;
  }

  const fullName =
    fhwData.fieldHealthWorker.citizen.fname +
    " " +
    fhwData.fieldHealthWorker.citizen.lname;
  const patients = fhwData.fieldHealthWorker.citizenAssigned;
  const total = fhwData.followUps.length;
  const completed = calCompletedFollowups(fhwData.followUps);
  const completedLate = calCompletedAfterDeadline(fhwData.followUps);
  const completedOnTime = completed - completedLate;
  const upcoming = calUpcomingFollowUps(fhwData.followUps);
  const backlog = calBacklog(fhwData.followUps);

  const chartData1 = {
    datasets: [
      {
        data: [completedOnTime, completedLate],
        backgroundColor: ["#2ECC40", "#FF4136"],
      },
    ],

    labels: ["On Time", "Late"],
  };

  const chartData2 = {
    datasets: [
      {
        data: [upcoming, backlog],
        backgroundColor: ["#0074D9", "#FF851B"],
      },
    ],

    labels: ["Upcoming", "Backlog"],
  };

  const chartData3 = {
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#2ECC40", "#FF4136"],
      },
    ],

    labels: ["Completed", "Not  Completed"],
  };

  const emptyChartData = {
    datasets: [
      {
        data: [1],
      },
    ],

    labels: ["FHW has zero assigned followps"],
  };

  const emptyRemChartData = {
    datasets: [
      {
        data: [1],
      },
    ],

    labels: ["FHW has zero remaining followps"],
  };

  const emptyComChartData = {
    datasets: [
      {
        data: [1],
      },
    ],

    labels: ["FHW has zero completed followps"],
  };

  return (
    <div className="textFeilds">
      <NavBar showBackButton={true} />
      <h1
        style={{
          paddingLeft: "20px",
          textAlign: "center",
          marginBottom: "10%",
        }}
      >
        {fullName}
      </h1>
      <div style={myStyle}>
        <h3>{fullName}'s Work Information</h3>
        <hr style={{ border: "2px solid black" }} />
        <p>Name :{fullName}</p>
        <p>Patients Assigned : {patients}</p>
        <p>Total follow ups assigned : {total}</p>
        <p style={{ color: "green" }}>
          Total follow up completed : {completed}
        </p>
        <p style={{ color: "darkorange" }}>
          Follow ups left : {total - completed}
        </p>
        <p style={{ color: "green" }}>
          Follow ups completed on time : {completedOnTime}
        </p>
        <p style={{ color: "red" }}>
          Follow ups completed after deadline : {completedLate}
        </p>
        <p style={{ color: "blue" }}>Upcoming Follow ups : {upcoming}</p>
        <p style={{ color: "red" }}>Follow ups in backlog : {backlog}</p>
      </div>

      <div className="charts">
        <div className="chart" style={chartStyle1}>
          <PieChart
            chartData={
              total > 0
                ? completed === 0
                  ? emptyComChartData
                  : chartData1
                : emptyChartData
            }
          />
          <p style={{ textAlign: "center" }}> Completed Follow ups</p>
        </div>

        <div className="chart" style={chartStyle2}>
          <PieChart
            chartData={
              total > 0
                ? upcoming + backlog === 0
                  ? emptyRemChartData
                  : chartData2
                : emptyChartData
            }
          />
          <p style={{ textAlign: "center" }}> Remaining Follow ups</p>
        </div>
        <div className="chart" style={chartStyle3}>
          <PieChart chartData={total > 0 ? chartData3 : emptyChartData} />
          <p style={{ textAlign: "center" }}> Total Follow ups</p>
        </div>
      </div>
    </div>
  );
}

export default FHWInfoPage;
