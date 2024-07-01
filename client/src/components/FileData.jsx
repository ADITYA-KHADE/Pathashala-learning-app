import React from "react";
import Coin from "../assets/coin.ico";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const calculateHoursDifference = (date) => {
  const now = new Date();
  const uploadedDate = new Date(date);
  const diffInMs = now - uploadedDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  return diffInHours;
};

const FileData = ({ file }) => {
  const Server_Url = import.meta.env.VITE_API_SERVER;
  const hoursAgo = 10 - calculateHoursDifference(file.createdAt);
  const [marks, setMarks] = useState("");
  const navigate = useNavigate();
  const { setAuthUser, authUser } = useAuthContext();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/file/update-marks/${file._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ marks, hoursAgo, userid: authUser._id }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Marks updated successfully");
        setAuthUser((prevUser) => ({
          ...prevUser,
          totalpoints: data.totalpoints,
        }));
        navigate("/");
      } else {
        console.error("Failed to update marks", data);
        toast.error("Failed to update marks");
      }
    } catch (error) {
      console.error("Error updating marks:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-full gap-3 sm:gap-1 flex-1 justify-center sm:justify-between px-2 py-3 lg:px-5">
      <div className="bg-slate-600 p-1 sm:w-1/2 shadow-lg">
        <embed
          src={`${Server_Url}${file.file}`}
          type="application/pdf"
          width="100%"
          height="550"
          className="border-2 border-gray-200 h-60 sm:h-full rounded-lg"
        />
      </div>
      <div className="flow-root sm:w-1/2 bg-slate-100 p-1 sm:p-6 font-poppins text-gray-800 shadow-inner">
        <h1 className="text-center font-semibold sm:text-4xl text-2xl p-2">
          Details here :
        </h1>
        <dl className="divide-y divide-gray-500 text-base">
          <div className="grid grid-cols-1 gap-1 py-3 sm:text-center sm:grid-cols-3">
            <dt className="font-medium text-2xl text-gray-900">Title :</dt>
            <dd className="text-gray-700 text-2xl sm:col-span-1">
              {file.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:text-center sm:grid-cols-3">
            <dt className="font-medium text-2xl text-gray-900">Subject :</dt>
            <dd className="text-gray-700 text-2xl sm:col-span-1">
              {file.subject}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:text-center sm:grid-cols-3">
            <dt className="font-medium text-2xl text-gray-900">
              Description :
            </dt>
            <dd className="text-gray-700 text-sm sm:col-span-2">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </dd>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              <dt className="font-medium text-xl text-gray-900">
                Uploaded by :
              </dt>
              <dd className="text-gray-800 text-xl text-left">{file.sender}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:text-center sm:grid-cols-2">
              <dt className="font-medium text-xl text-gray-900">
                Verified by :
              </dt>
              <dd className="text-gray-800 text-xl">
                {file.checkedby || "N/A"}
              </dd>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3">
            <div className="grid grid-cols-1 gap-1 sm:text-center sm:grid-cols-2">
              <dt className="font-medium text-xl text-gray-900">Status :</dt>
              <dd className="text-gray-800 text-xl text-left">
                {file.status ? "Verified" : "Pending"}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:text-center sm:grid-cols-2">
              <dt className="font-medium text-xl text-gray-900">Marks :</dt>
              <dd className="text-gray-800 text-xl">{file.marks || "N/A"}</dd>
            </div>
          </div>

          <div className="flex justify-between py-3">
            <div className="grid grid-cols-1 gap-1 py-2 sm:text-center">
              <dt className="font-medium text-xl text-gray-900">
                Created At :
              </dt>
              <dd className="text-gray-800 text-xl sm:col-span-2">
                {formatDate(file.createdAt)}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-2 sm:text-center">
              <dt className="font-medium text-xl text-gray-900">
                Updated At :
              </dt>
              <dd className="text-gray-800 text-xl sm:col-span-2">
                {formatDate(file.updatedAt)}
              </dd>
            </div>
          </div>
          {authUser.role == "teacher" && (
            <>
              <div className="p-4 font-poppins">
                <div>
                  <form className="flex justify-between" onSubmit={submit}>
                    <input
                      type="text"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      placeholder="Enter marks"
                      className="bg-white text-gray-900 block w-1/2 rounded-md border-0 p-2 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-base sm:leading-6"
                    />
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-indigo-600 cursor-pointer text-white text-xl rounded-md p-3 sm:text-base sm:leading-6"
                    />
                  </form>
                </div>
                {hoursAgo <= 0 && (
                  <h1 className="flex p-1">
                    Get <img src={Coin} alt="" className="h-6 w-6 p-1" /> 5
                    coins after verification
                  </h1>
                )}
                {hoursAgo > 0 && (
                  <h1 className="flex p-1">
                    Submit it within next {hoursAgo} hours to get{" "}
                    <img src={Coin} alt="" className="h-6 w-6 p-1" /> 10 coins.
                  </h1>
                )}
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
};

export default FileData;
