import React from "react";

const PDFViewer = () => {
  return (
    <div style={{ overflow: "hidden", width: "200px", height: "150px" }}>
      <iframe src="http://localhost:8000/uploads/projects/file_1719652991217.pdf" width="100%" height="100%" />
    </div>
  );
};

export default PDFViewer;
