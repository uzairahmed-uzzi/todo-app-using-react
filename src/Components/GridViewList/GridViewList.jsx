import React, { useState,useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import "./GridViewList.css";
import { useFireBase } from "../../Firebase/Firebase";

const GridViewList = (props) => {
  const firebase=useFireBase();
  const handleSelect=props.handle;
  const data=props.data;
  const id=props.id
  const [star, toggleStar] = useState(props.important);

  const handleStar = async(e,id) => {
    const obj = data.find((item) => item.id === id);
    const imp=obj.important;
    const newImportant = !imp;
    obj.important=  newImportant;
    console.log("==>IMPORTANT: ",newImportant);
    toggleStar(newImportant);
    await firebase.updateData(id,{important:newImportant});
  };
 
  return (
    <li className="grid-list" >
      {star ? (
        <AiFillStar    className="star" onClick={(e)=>handleStar(e,id)} />
      ) : (
        <AiOutlineStar className="star" onClick={(e)=>handleStar(e,id)} />
      )}


      <p className="grid-para">{props.para}</p>

      <Checkbox  onClick={handleSelect} />
    </li>
  );
};

export default GridViewList;
