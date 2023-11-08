import React from "react";

const Tasks = (props) => {
    const {data,handleSelect,enabler}=props
  return (
    <>
      <ul>
        {data.map((ele) => {
          if (!ele.data.important && !ele.data.completed) {
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

export default Tasks;
