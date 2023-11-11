import React from "react";
import { useOutletContext } from "react-router";
import GridViewList from "../GridViewList/GridViewList";
const Important = () => {
    const [handleSelect,data,enabler]=useOutletContext();
  return (
    <>
      <ul>
        {data.map((ele) => {
          if (ele.data.important) {
            return (
              <GridViewList
                para={ele.data.todo}
                key={ele.id}
                handle={(e) => {
                  handleSelect(e, ele.id);
                }}
                id={ele.id}
                data={data}
                enable={enabler}
                important={ele.data.important}
              />
            );
          }
        })}
      </ul>
    </>
  );
};

export default Important;
