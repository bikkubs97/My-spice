
import Products from "./Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/Products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
