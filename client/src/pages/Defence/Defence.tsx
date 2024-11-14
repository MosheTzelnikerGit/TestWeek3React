import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getDetails } from "../../store/fetchers/attackSlice";
import { Resource } from "../../types";


const DefensePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.attack);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode<{ id: string; organization: string; region?: string; resources: Resource[] }>(token!);
  const [tableRows, setTableRows] = useState<{ name: string; timeToHit: number; status: string }[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMissileClick = async (missileName: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(getDetails(missileName)).unwrap();
      const newRow = {
        name: result.name,
        timeToHit: result.speed,
        status: "Active",
      };
      setTableRows((prevRows) => [...prevRows, newRow]);
    } catch (error) {
      console.error("Error fetching missile data:", error);
    }
  };

  useEffect(() => {
    if (status === "idle") {
    }
  }, [status, dispatch, decoded]);

  return (
    <div className="DefensePageContainer">
      <button className="DefensePageLogoutButton" onClick={handleLogout}>Logout</button><br /><br />
      <div>
        <h2 className="DefensePageSubtitle">Organization: {decoded?.organization} - {decoded?.region}</h2>
      </div>
      <div>
        <select name="" id="" className="DefensePageSelect">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="WestBank">West Bank</option>
        </select>
      </div>

      <form>
        {decoded && (
          <div>
            <h2 className="DefensePageSubtitle">Resources:</h2>
            <div className="DefensePageResourceList">
              {Array.isArray(decoded.resources) && decoded.resources.map((resource: Resource) => (
                <div key={resource._id} className="DefensePageResourceCard">
                  <h3 className="DefensePageResourceTitle">{resource.name}</h3>
                  <button onClick={(e) => handleMissileClick(resource.name, e)} className="DefensePageResourceButton">
                    <p>{resource.amount}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      <table className="DefensePageTable">
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time To Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.timeToHit}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DefensePage;
