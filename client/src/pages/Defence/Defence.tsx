import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../Attack/Attack.css"


type Resource = {
  _id: string;
  name: string;
  amount: number;
};


const DefensePage: React.FC = () => {
  const navigate = useNavigate();
  const  {status } = useSelector((state: RootState) => state.attack);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode<{ id: string; organization: string; region?: string ; resources: Resource[]}>(token!)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  useEffect(() => {
    if (status === "idle") {
    }
  }, [status]);

  return (
    <div className="DefensePageContainer">
      <button className="DefensePageLogoutButton" onClick={handleLogout}>Logout</button><br /><br />
      <div>
        <h2 className="DefensePageSubtitle">Organization: {decoded?.organization} - {decoded?.region}</h2>
      </div>
      <form>
        {decoded && (
          <div>
            <h2 className="DefensePageSubtitle">Resources:</h2>
            <div className="DefensePageResourceList">
              {Array.isArray(decoded.resources) && decoded.resources.map((resource: any) => (
                <div key={resource._id} className="DefensePageResourceCard">
                  <h3 className="DefensePageResourceTitle">{resource.name}</h3>
                  <button className="DefensePageResourceButton">
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
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
);
};

export default DefensePage