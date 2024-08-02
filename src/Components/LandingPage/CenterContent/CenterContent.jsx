import React from 'react'
import './CenterContent.css'

const CenterContent = () => {
    return (
        <>
            <div className='center_content'>
                <div className="left_part">
                    <h3>Elevate your <span>success</span></h3>
                    <h3>Get <span>faster</span> insights</h3>
                    <p>Convert all your PDF'S into quick revisable summary to save your time </p>
                    <button>Get Started</button>

                </div>
                <div className="right_part">
                    <div className="image">
                        <img src={"./src/assets/right_image.png"} alt="" />
                    </div>

                </div>

            </div>
            <div className="text">
                <div className="headings">

                    <h3>Get your work done below</h3>
                    <h3>Upload the <span>PDF</span> and see the <span>Magic</span> happen</h3>
                </div>
            </div>
        </>


    )
}

export default CenterContent