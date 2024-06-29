import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { useState, useEffect } from "react";
import { useFieldContext } from "../../contexts/FieldContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

const Pending = () => {
  const [files, setFiles] = useState([]);
  const { value } = useFieldContext();
  const { authUser } = useAuthContext();

  const fetchPendingFiles = async () => {
    try {
      const res = await fetch("/api/file/pending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFiles(data);
      console.log(data)
    } catch (error) {
      toast.error("Error fetching files");
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPendingFiles();
  }, [value,authUser]);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <Card key={file._id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pending;
