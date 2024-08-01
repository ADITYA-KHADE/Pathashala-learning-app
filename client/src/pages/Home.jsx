import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFieldContext } from "../contexts/FieldContext";
import Pending from "../components/Query/Pending";
import Completed from "../components/Query/Completed";
import HistoryCoin from "../components/Query/HistoryCoin";
import Upload from "../components/Query/Upload";

const Home = () => {
  const { value } = useFieldContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {value === "completed" && <Completed />}
        {value === "pending" && <Pending />}
        {value === "history" && <HistoryCoin />}
        {value === "upload" && <Upload />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
