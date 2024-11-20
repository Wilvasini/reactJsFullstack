import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateCrimesDataTable from "./components/StateCrimesDataTable";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/states/:id" element={<StateCrimesDataTable />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
