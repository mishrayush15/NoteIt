import React, { useState, useEffect, useRef } from "react";
import { run } from "../Gemini/Gemini";
import pdfToText from "react-pdftotext";
import { Document, Packer, Paragraph, TextRun } from "docx";
import Loader from "./Loader/Loader";
import "./UploadFile.css";

const UploadFile = () => {
  const uploadFileRef = useRef(null);

  // Auto scroll view
  useEffect(() => {
    const handleScrollToUploadSection = () => {
      if (uploadFileRef.current) {
        uploadFileRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scrollToUploadSection", handleScrollToUploadSection);

    return () => {
      window.removeEventListener("scrollToUploadSection", handleScrollToUploadSection);
    };
  }, []);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(false);
  const [text, setText] = useState("");
  const [downloadText, setDownloadText] = useState("");

  // Handling gemini API
  const handleGemini = async () => {
    setLoading(true);
    setScreen(true);
    const response = await run(text);
    setLoading(false);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponse3 = newResponse2.replace(/,/g, " ");
    let newResponse4 = newResponse3.replace(/##/g, "=> ");
    let newResponse5 = newResponse4.replace(/\s+/g, " ").trim();
    setResult(newResponse5);

    const plainText = newResponse5
      .replace(/<\/b>/g, "")
      .replace(/<b>/g, "")
      .replace(/<\/br>/g, "\n");
    setDownloadText(plainText);
  };

  // extract text from pdf
  const pdfExtract = (e) => {
    const file = e.target.files[0];
    if (file) {
      pdfToText(file)
        .then((text) => setText(text))
        .catch((error) => console.error(error));
    } else {
      alert("File not selected!!");
    }
  };

  // creating docx file
  const handleDownloadWord = async () => {
    const paragraphs = downloadText.split("\n").map(
      (line) =>
        new Paragraph({
          children: [new TextRun(line)],
        })
    );
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div ref={uploadFileRef} className="main_container_bottom">
        {screen ? (
          <div className="upload_section_box">
            <div className="content_box">
              <h5 className="text_top"><b>Here's your Summary -</b></h5>
              <br />
              <h4 dangerouslySetInnerHTML={{ __html: result }}></h4>
            </div>
          </div>
        ) : (
          <div className="upload_section_box ">
            <i className="fa-solid fa-arrow-up-from-bracket box_icon"></i>
            <h3>Upload your file here</h3>
            <h2 className="p_tag_drag">(Drag & Drop)</h2>
            <input type="file" accept="application/pdf" onChange={pdfExtract} />
            <p className="result-data"></p>
          </div>
        )}
        {loading ? <Loader /> : null}
        {screen ? (
          <div className="options_bottom">
            <button disabled={loading} className="single_option ">
              {/* <i class="fa-solid fa-arrow-up-from-bracket btn_submit"></i> */}
              <i className="fa-solid fa-check btn_submit"></i>
              <p className="btn_submit" onClick={handleGemini}> Submit</p>
            </button>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="application/pdf"
                onChange={pdfExtract}
                id="file-input"
                style={{ display: "none" }}
              />
              <button
                disabled={loading}
                className="single_option"
                onClick={() => document.getElementById("file-input").click()}
              >
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                Upload Again
              </button>
            </div>
            <button disabled={loading} className="single_option">
              <i class="fa-solid fa-down-long"></i>
              <p onClick={handleDownloadWord}>Download</p>
            </button>
          </div>
        ) : (
          <button className="single_option">
            <i class="fa-solid fa-check"></i>
            <p disabled={loading} onClick={handleGemini}>
              Submit
            </p>
          </button>
        )}
      </div>
    </>
  );
};

export default UploadFile;
