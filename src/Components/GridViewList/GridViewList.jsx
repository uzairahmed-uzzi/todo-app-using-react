import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import "./GridViewList.css";
const GridViewList = (props) => {
  const handleSelect=props.handle;
  const handleStar=props.handleStar;
  const star=props.star

  return (
    <li className="grid-list">
      {star ? (
        <AiFillStar className="star" onClick={handleStar} />
      ) : (
        <AiOutlineStar className="star" onClick={handleStar} />
      )}


      <p className="grid-para">{props.para}</p>

      <Checkbox  onClick={handleSelect} />
    </li>
  );
};

export default GridViewList;
