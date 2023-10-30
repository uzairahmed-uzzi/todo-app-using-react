import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import "./GridViewList.css";
const GridViewList = (props) => {
  const handleSelect=props.handle;
  const [star, toggleStar] = useState(false);
  // const [check, setCheck] = useState(false);
  const handleStar = () => {
    toggleStar(!star);
  };
  // const handleSelect=async ()=>{
  //   if(!check){
  //     setCheck(true)
  //     const newArray =await props.keyArray.filter(item => item !== props.id);
  //      await props.setterKeyArr(newArray);
  //   }else{
  //     setCheck(false);
  //     props.setterKeyArr([...props.keyArray,props.id])      
  //   }
  // }
  return (
    <li className="grid-list">
      {star ? (
        <AiFillStar className="star" onClick={handleStar} />
      ) : (
        <AiOutlineStar className="star" onClick={handleStar} />
      )}
      <p className="grid-para">{props.para}</p>

      <Checkbox  onClick={(e)=>handleSelect(e,props.id)} />
    </li>
  );
};

export default GridViewList;
