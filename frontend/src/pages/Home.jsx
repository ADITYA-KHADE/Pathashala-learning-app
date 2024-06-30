import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFieldContext } from "../contexts/FieldContext";
import Pending from "../components/Query/Pending";
import Completed from "../components/Query/Completed";
import History from "../components/Query/HistoryCoin";
import Upload from "../components/Query/Upload";

const Home = () => {
  const { value } = useFieldContext();
  return (
    <div>
      <Navbar />
      {value === "completed" && <Completed />}
      {value === "pending" && <Pending />}
      {value === "history" && <History />}
      {value === "Upload" && <Upload />}
      <Footer />
    </div>
  );
};

export default Home;
