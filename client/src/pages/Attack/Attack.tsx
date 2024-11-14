import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

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
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h1>Defense Page</h1>
      </div>
      <form>
        {decoded && (
          <div>
            <h2>Resources:</h2>
              {Array.isArray(decoded.resources) && decoded.resources.map((resource: any) => (
              <div key={resource._id} className="resource-card">
                <h3>{resource.name}</h3>
                <p>{resource.amount}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default DefensePage;