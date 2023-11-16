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
    const obj =await data.find((item) => item.id === id);
    console.log(obj.data)
    const imp=obj.data.important;
    console.log("==>OLD IMPORTANT: ",imp);
    const newImportant = !imp;
    obj.data.important=  newImportant;
    console.log("==>IMPORTANT: ",newImportant);
    await firebase.updateData(id,{important:newImportant});
    toggleStar(newImportant);
    props.setRefresh();
  };
  // useEffect(()=>{
  //   props.setRefresh();
  // })
 
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
