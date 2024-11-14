import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Defence from "./pages/Defence/Defence";
import Attack from "./pages/Attack/Attack";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/defence" element={<Defence />} />
        <Route path="/attack" element={<Attack />} />  
      </Routes>
    </div>
  );
};
export default App;