import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrum";
import FileData from "../components/FileData";
import NotFound from "../components/NotFound";
import Footer from "../components/Footer"

const File = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`/api/file/${id}`);
        if (!res.ok) {
          throw new Error("File not found");
        }
        const data = await res.json();
        setFile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFile();
  }, [id]);

  return (
    <div>
      {error ? (
        <NotFound />
      ) : file ? (
        <>
          <Breadcrum file={file} />
          <FileData file={file} />
        </>
      ) : (
        <p>loading....</p>
      )}
        <Footer />
    </div>
  );
};

export default File;
