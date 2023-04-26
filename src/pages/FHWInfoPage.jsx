import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../component/PieChart";
import NavBar from "../component/Navbar";

function FHWInfoPage() {
  const myStyle = {
    position: "absolute",
    top: "15%",
    left: "5%",
    height: "500px",
    width: "300px",
    // border: "2px solid black",
    padding: "10px",
    margin: "20px",
    // backgroundColor: "lightBlue",
  };

  const chartStyle1 = {
    // border: "3px solid black",
    position: "absolute",
    top: "25%",
    left: "32%",
    height: "400px",
    width: "400px",
    justifyContent: "center",
  };

  const chartStyle2 = {
    // border: "3px solid black",
    position: "absolute",
    top: "25%",
    left: "65%",
    height: "400px",
    width: "400px",
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
        data: [completed, upcoming, backlog],
        // backgroundColor: ["#4BB543", "blue", "red"],
      },
    ],

    labels: [
      "Total Follow ups Completed",
      "Upcoming follows ups",
      "Follow ups in Backlog",
    ],
  };

  const chartData2 = {
    datasets: [
      {
        data: [completedOnTime, completedLate, upcoming, backlog],
        // backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B"],
        backgroundColor: ["#4BB543", "orange", "blue", "#FF0000"],
      },
    ],

    labels: [
      "Follow ups Completed on time",
      "Follow ups Completed Late",
      "Upcoming Follow ups",
      "Follow ups in Backlog",
    ],
  };

  const emptyChartData = {
    datasets: [
      {
        data: [1],
        // backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B"],
        // backgroundColor: ["#4BB543", "orange", "blue", "#FF0000"],
      },
    ],

    labels: ["FHW has zero assigned followps"],
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
        <p>Total follow up completed : {completed}</p>
        <p>Follow ups left : {total - completed}</p>
        <p>Follow ups completed on time : {completedOnTime}</p>
        <p>Follow ups completed after deadline : {completedLate}</p>
        <p>Upcoming Follow ups : {upcoming}</p>
        <p>Follow ups in backlog : {backlog}</p>
      </div>

      <div className="charts">
        <div className="chart" style={chartStyle1}>
          <PieChart chartData={total > 0 ? chartData1 : emptyChartData} />
          <pre> Stats based on total follow ups</pre>
        </div>

        <div className="chart" style={chartStyle2}>
          <PieChart chartData={total > 0 ? chartData2 : emptyChartData} />
          <pre>Stats based on time</pre>
        </div>
      </div>
    </div>
  );
}

export default FHWInfoPage;
