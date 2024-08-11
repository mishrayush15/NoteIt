import React from "react";
import "./CenterContent.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CenterContent = () => {
  

  const scrollToUploadSection = () => {
    const event = new CustomEvent("scrollToUploadSection");
    window.dispatchEvent(event);
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".center_content",
      scroller: "body", 
      markers: true,
      scrub: 2
    }
  });

  useGSAP(() => {
    tl.from(".left_part p, .left_part h3", {
      opacity: 0,
      delay: 1.5,
      duration: 0.7,
      x: -100,
      stagger: 0.3,
    }, "sathme");

    gsap.from("button", {
      opacity: 1,
      delay: 2,
      duration: 0.5
    })

    tl.from(".right_part", {
        opacity: 0,
        delay: 1.5,
        duration: 0.7,
        x: 100,
      }, "sathme"
    );

    tl.from(".headings .line_one", {
      opacity: 0,
      x: -300,
      delay: 2,
      duration: 0.5
    });

    tl.from(".headings .line_two", {
      opacity: 0,
      x: 300,
      delay: 2,
      duration: 0.5,
      stagger: 0.3
    });
  });

  

  return (
    <>
      <div className="center_content">
        <div className="left_part">
          <h3>
            Elevate your <span>success</span>
          </h3>
          <h3>
            Get <span>faster</span> insights
          </h3>
          <p>
            Convert all your PDF'S into quick revisable summary to save your
            time
          </p>
          <div className="btn">
            <button onClick={scrollToUploadSection}>Get Started</button>
          </div>
        </div>
        <div className="right_part">
          <div className="image">
            <img src={"./src/assets/right_image.png"} alt="" />
          </div>
        </div>
      </div>
      <div className="text">
        <div className="headings">
          <h3 className="line_one">Get your work done below</h3>
          <h3 className="line_two">
            Upload the <span>PDF</span> and see the <span>Magic</span> happen
          </h3>
        </div>
      </div>
    </>
  );
};

export default CenterContent;
