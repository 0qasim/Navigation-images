import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";

export const Btn = ({setUpdateUI}) => {
  const handleChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    axios
      .post("http://localhost:3001/api/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button>
      <label htmlFor="file_picker">
        <AiFillPlusCircle />
        <input
          onChange={(e) => handleChange(e)}
          hidden
          type="file"
          name="file_picker"
          id="file_picker"
        />
      </label>
    </Button>
  );
};
const Button = styled.div`
  color: #4b37cf;
  box-shadow: 1px rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  font-size: 60px;
  height: 65px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2.5rem;
  cursor: pointer;
`;
