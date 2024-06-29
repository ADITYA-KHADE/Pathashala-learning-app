import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Records from "../components/Records";
import {useFieldContext} from "../contexts/FieldContext";
import Pending from "../components/Query/Pending"
import Completed from "../components/Query/Completed"
import History from "../components/Query/HistoryCoin"
import {  Routes, Route } from "react-router-dom";
import Upload from "../components/Query/Upload";

const Home = () => {
  const {value} = useFieldContext();
  return (
    <div>
      <Navbar />
        {value==="completed" && <Completed/>}
        {value==="pending" && <Pending/>}
        {value==="history" && <History/>}   {/*teacher-coin history*/}
        {value==="Upload" && <Upload/>}
      <Footer />
    </div>
  );
};

export default Home;
