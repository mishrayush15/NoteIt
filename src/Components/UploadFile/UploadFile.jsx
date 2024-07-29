import React from "react";
import "./UploadFile.css";

const UploadFile = () => {
  return (
    <>
      <div className="main_container_bottom">
        <div className="upload_section_box">
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
          <h3>Upload your file here</h3>
          <p>(Drag & Drop)</p>
        </div>
        <div className="options_bottom">
          <button className="single_option">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            <p>Upload Again</p>
          </button>
          <button className="single_option">
            <i class="fa-solid fa-down-long"></i>
            <p>Download</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
