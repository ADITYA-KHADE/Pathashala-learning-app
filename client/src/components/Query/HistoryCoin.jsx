import React from "react";
import { useState, useEffect } from "react";
import { useFieldContext } from "../../contexts/FieldContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import Coin from "../../assets/coin.ico";


const calculateHoursDifference = (date) => {
  const now = new Date();
  const uploadedDate = new Date(date);
  const diffInMs = now - uploadedDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  return diffInHours;
};

const calculateDaysDifference = (date) => {
  const now = new Date();
  const uploadedDate = new Date(date);
  const diffInMs = now - uploadedDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
};


const CustomCard = ({ file }) => {
  const hoursAgo = calculateHoursDifference(file.createdAt);
  const daysAgo =  calculateDaysDifference(file.createdAt);
  return (
    <div className="border text-gray-800 bg-slate-100 font-poppins rounded-lg shadow-lg p-4 flex justify-between">
      <div className="">
        <h3 className="text-lg font-semibold">Name : {file.name}</h3>
        <p className="text-base">upload by : {file.sender}</p>
        {hoursAgo<=48 ? (
          <p className="text-sm">Uploaded {hoursAgo} hours ago</p>
        ):(
          <p className="text-sm">Uploaded {daysAgo} days ago</p>
        )}
        {/* <p className="text-base">Verified at : {calculateHoursDifference(file.updatedAt)} hours ago</p> */}
      </div>
      <h3 className="flex font-semibold text-xl items-center">
        +<img src={Coin} alt="" className="h-8 w-9 p-1" />
        {file.coin}
      </h3>
    </div>
  );
};

const HistoryCoin = () => {
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const { value } = useFieldContext();
  const { authUser, setAuthUser } = useAuthContext();

  const coin = async () => {
    try {
      const res = await fetch("/api/file/allcompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFiles(data.files);
      setTotalFiles(data.totalFiles);
    } catch (error) {
      toast.error("Error fetching files");
      console.log(error);
    }
  };

  useEffect(() => {
    coin();
  }, [value,authUser]);

  return (
    <div className="h-1/3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col gap-4 overflow-y-auto h-96">
          {files.map((file) => (
            <CustomCard key={file._id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryCoin;
