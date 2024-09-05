import React, { useState, useEffect } from "react";
import { BigGradientText } from "../styles";
import axios from "axios";
import { Btn } from "../Button/Btn";
import Grid from "./Grid";

const Project = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
  useEffect(() => {
    axios
      .get("https://navigation-images-api.vercel.app/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);
  return (
    <>
      
        <BigGradientText>
          <Grid photos={photos} />
          <Btn setUpdateUI={setUpdateUI} />
        </BigGradientText>
      
    </>
  );
};
export default Project;
