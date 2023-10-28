import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import "./GridViewList.css";
const GridViewList = (props) => {

  const [star, toggleStar] = useState(false);
  const [check, setCheck] = useState(false);
  const handleStar = () => {
    toggleStar(!star);
  };
  const handleSelect=()=>{
    if(check){
      props.setterKeyArr([...props.keyArray,props.id])
      props.enable();
    }else{
      const newArray = props.keyArray.filter(item => item !== props.id);
      props.setterKeyArr(newArray);
    }
  }
  return (
    <li className="grid-list">
      {star ? (
        <AiFillStar className="star" onClick={handleStar} />
      ) : (
        <AiOutlineStar className="star" onClick={handleStar} />
      )}
      <p className="grid-para">{props.para}</p>

      <Checkbox checked={check} onClick={handleSelect} onChange={()=>setCheck(!check)} />
    </li>
  );
};

export default GridViewList;
