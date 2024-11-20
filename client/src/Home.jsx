import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CrimesMap from "./components/CrimesMap";
import DataTableCrimes from "./components/DataTableCrimes";

function Home() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/getAllCrimes");
    setArray(Object.values(response.data));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
    {array?.length> 0 && <div id="container">
        <CrimesMap mapData={array} />
        <DataTableCrimes crimes={array} />
      </div>}
    </>
  );
}

export default Home;
