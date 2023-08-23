
import Products from "./Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
