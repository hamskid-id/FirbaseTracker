import React from "react";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import classes from "./scaleLoader.module.css";
const Spinner = () => {
    let [color] = useState("#2E3192");

    return (
        <div className={classes.spinner_container}>
            <ScaleLoader
                color={color}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;