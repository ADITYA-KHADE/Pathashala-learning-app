
import React from "react";
import Pdf from "../assets/pdf.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useFieldContext } from "../contexts/FieldContext";
import Done from "../assets/approve.ico";
import Wait from "../assets/time.png";

// Function to calculate hours difference
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

const Card = (props) => {
  const { authUser } = useAuthContext();
  const { value } = useFieldContext();
  const hoursAgo = calculateHoursDifference(props.file.createdAt);
  const daysAgo =  calculateDaysDifference(props.file.createdAt);
  // const updatehoursAgo = calculateHoursDifference(props.file.updatedAt);
  const isVerified = props.file.marks ? true : props.file.status;

  // console.log(hoursAgo,daysAgo);

  return (
    <Link
      to={`/file/${props.file._id}`}
      className="block rounded-xl border-2 border-gray-100 bg-white transition-transform duration-150 md:hover:scale-105"
    >
      <article className="flex items-start gap-4 p-4 sm:p-6 lg:p-8 font-poppins">
        <img alt="" src={Pdf} className="sm:h-28 w-20 h-20 rounded-lg object-cover" />

        <div>
          <h3 className="font-medium sm:text-lg text-gray-900 hover:underline">
            Name : {props.file.name}
          </h3>

          <p className="line-clamp-2 text-base text-gray-800">
            Subject: {props.file.subject}
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="hidden sm:block sm:text-xs sm:text-gray-800">
              Posted by:
              <span className="font-semibold text-base p-1 hover:text-red-400">
                {authUser.role === "teacher"
                  ? props.file.sender
                  : authUser.name}
              </span>
            </p>
            {value == "completed" && (
              <p className="hidden sm:block sm:text-xs sm:text-gray-800">
                Verified by:
                <span className="font-bold text-base p-1 hover:text-red-400">
                  {authUser.role === "teacher"
                    ? props.file.checkedby
                    : props.file.checkedby}
                </span>
              </p>
            )}
          </div>
          {value!="completed" ? (
            <p className="text-sm text-gray-500 mt-1">
           {hoursAgo<=24 ? ` Uploaded ${hoursAgo} hours ago` : ` Uploaded ${daysAgo} days ago`}
          </p>
          ):(
            <p className="text-sm text-gray-500 mt-1">
            {calculateHoursDifference(props.file.updatedAt)<=24 ? ` Verified ${calculateHoursDifference(props.file.updatedAt)} hours ago` : ` Verified ${calculateDaysDifference(props.file.updatedAt)} days ago`}
          </p>
          )}
        </div>
      </article>

      <div className="flex justify-between">
        {props.file.marks && (
          <span className="-mb-[2px] -me-[2px] text-[10px] font-medium sm:text-sm inline-flex items-center gap-1 rounded-se-xl rounded-es-xl bg-green-600 px-3 py-1.5 text-white">
            Marks: {props.file.marks}
          </span>
        )}
        <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
          {isVerified ? (
            <>
              <img alt="" src={Done} className="h-4 w-4" />
              <span className="text-[10px] font-medium sm:text-sm">
                Verify!
              </span>
            </>
          ) : (
            <>
              <img alt="" src={Wait} className="h-4 w-4" />
              <span className="text-[10px] font-medium sm:text-sm">
                Pending!
              </span>
            </>
          )}
        </strong>
      </div>
    </Link>
  );
};

export default Card;
