import React, { useContext, useEffect, useState } from "react";
import FHWInfoCard from "../component/FHWInfoCard";
import { data } from "../utils/analytics_data";
import { useNavigate } from "react-router-dom";
import routes from "../Router/routes";
import { baseURL } from "../constans";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../component/Navbar";

function FHWAnalyticsPage() {
  const [dataFromApi, setDataFromApi] = useState([]);
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   fetch(baseURL + "/supervisor/getFhws?loginId=" + user["loginId"], {
  //     method: "GET",
  //     headers: {
  //       Authorization:
  //         localStorage.getItem("token") &&
  //         localStorage.getItem("token").toString(),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) return res.json();
  //       throw res;
  //     })
  //     .then((data) => {
  //       data = data[0];
  //       setDataFromApi(data);
  //     })
  //     .catch((e) => console.error(e))
  //     .finally(() => {
  //       // setLoading(false);
  //     });
  // }, []);

  const fhwList = data[0];
  // const fhwList = dataFromApi[0];
  let navigate = useNavigate();

  function handleClick(idx) {
    navigate(routes.FHWInfo, {
      state: { data: fhwList[idx] },
    });
  }

  return (
    <div>
      <NavBar showBackButton={true} />
      <h1 style={{ textAlign: "center" }}>List of Feild workers assigned</h1>
      <div className="fhwList">
        <ol>
          {fhwList.map((e, index) => (
            <li key={e.fieldHealthWorker.loginId}>
              <FHWInfoCard
                name={e.fieldHealthWorker.citizen.fname}
                assignedPatients={e.fieldHealthWorker.citizenAssigned}
                handleClick={() => handleClick(index)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default FHWAnalyticsPage;
