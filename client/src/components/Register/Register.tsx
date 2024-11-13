
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        username: username,
        password: password,
        organization: "IDF",
        area: "North",
      })
    );
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="organization">
        Organization:
        <select name="organization" id="organization">
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="Houthis">Houthis</option>
          <option value="IRGC">IRGC</option>
        </select>
      </label>
      if (organization === "IDF") {
        <label htmlFor="area">
          Area:
          <select name="area" id="area">
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Central">Central</option>
            <option value="Judea and Samaria">Judea and Samaria</option>
          </select>
        </label>
        
      }
      <button type="submit">Register</button>
      {userStatus === "loading" && <p>Registering...</p>}
      {userStatus === "failed" && <p>Registration failed</p>}
      {userStatus === "succeeded" && <p>Registration successful!</p>}
      <p>Already have an account ? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Register;

