import React, { useState, useEffect } from "react";
import { run } from "../Gemini/Gemini"
import pdfToText from "react-pdftotext";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import Loader from "./Loader/Loader";
import "./UploadFile.css";

const UploadFile = () => {
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
    let newResponse = '';
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      }
      else {
        newResponse += "<b>" + responseArray[i] + "</b>"
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponse3 = newResponse2.replace(/,/g, ' ');
    let newResponse4 = newResponse3.replace(/##/g, '=> ');
    let newResponse5 = newResponse4.replace(/\s+/g, ' ').trim();
    setResult(newResponse5);

    const plainText = newResponse5
      .replace(/<\/b>/g, '')
      .replace(/<b>/g, '')
      .replace(/<\/br>/g, '\n');
    setDownloadText(plainText);
  }

  // extract text from pdf
  const pdfExtract = (e) => {
    const file = e.target.files[0];
    if (file) {
      pdfToText(file)
        .then(text => setText(text))
        .catch(error => console.error(error))
    } else {
      alert("File not selected!!");
    }
  }

  // creating docx file
  const handleDownloadWord = async () => {
    const paragraphs = downloadText.split('\n').map(line => new Paragraph({
      children: [new TextRun(line)],
    }));
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
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.docx';
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <>
      <div className="main_container_bottom">
        {screen ? <div className="upload_section_box">
          <p dangerouslySetInnerHTML={{ __html: result }}></p>
          <p className="result-data"></p>
        </div> : <div className="upload_section_box">
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
          <input
            type="file"
            accept="application/pdf"
            onChange={pdfExtract}
          />
          <h3>Upload your file here</h3>
          <p>(Drag & Drop)</p>
          <p className="result-data"></p>
        </div>}
        {loading ? <Loader /> : null}
        {screen ? <div className="options_bottom">
          <button disabled={loading} className="single_option">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            <p onClick={handleGemini}>Upload Again</p>
          </button>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="application/pdf"
              onChange={pdfExtract}
              id="file-input"
              style={{ display: 'none' }}
            />
            <button
              disabled={loading}
              className="single_option"
              onClick={() => document.getElementById('file-input').click()}
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Choose PDF File
            </button>
          </div>
          <button disabled={loading} className="single_option">
            <i class="fa-solid fa-down-long"></i>
            <p onClick={handleDownloadWord}>Download</p>
          </button>
        </div> : <button className="single_option">
          <i class="fa-solid fa-down-long"></i>
          <p disabled={loading} onClick={handleGemini}>Submit</p>
        </button>}


      </div>
    </>
  );
};

export default UploadFile;
