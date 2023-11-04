import React, { useState, useEffect } from "react";
import { useFireBase } from "../../Firebase/Firebase";
import "./Layout.css";
import Sidebar from "../SIDEBAR/Sidebar";
import ActionButton from "../ActionButton/ActionButton";
import GridViewList from "../GridViewList/GridViewList";
import Alerts from "../Alert/Alerts";
import InputModal from "../InputModal/InputModal";

const Layout = () => {
  const firebase=useFireBase();
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [keyArr, setkeyArr] = useState([]);
  const [visibilty, setVisibility] = useState(false);
  // const [check, setCheck] = useState(false);
  const [star, toggleStar] = useState(false);
  const handleStar = async(e,id) => {
    const obj = data.find((item) => item.id === id);
    const imp=obj.important;
    obj.important= !imp;
    const res= await firebase.updateData(id,{important:obj.important});
    console.log(res);
    toggleStar(obj.important);
  };
  

  const enabler = () => {
    if (keyArr.length > 0) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  useEffect(() => {
    enabler();
    console.log("key ARR", keyArr);
  }, [keyArr]);

  const handleOpen = () => {
    setOpen(!open);
  };

  // getting data
  const getData=async() => {
    const res=await firebase.getAllData();
      setData(res);    
  }
  useEffect(()=>getData(), [open]);
// CHECK UN CHECK
  const handleSelect = (e, id) => {
    const obj = data.find((item) => item.id === id);
    if (obj.checked) {
      setkeyArr((prevKeyArr) => {
        return prevKeyArr.filter((item) => item !== id);
      });
    } else {
      setkeyArr((prevKeyArr) => [...prevKeyArr, id]);
    }
    obj.checked = !obj.checked;
  };

  // add task
  const addtask = async () => {
    if (!todo) {
      setOpenAlert(true);
    } else {
      const ref = await firebase.postData({
        todo,
        important: false,
        completed: false,
        time: new Date(),
      } );
      console.log(ref.id);
      setOpenAlert(false);
      setTodo("");
    }
    handleOpen();
  };


// RENDERING..............
  return (
    <>
      {openAlert ? (
        <Alerts sev="warning" message="Must not be empty" openVal={true} />
      ) : (
        ""
      )}

      <div className="container">
        <Sidebar />
        <div className="right-side-container">
          <div className="top-nav-bar">
            <h1>Tasks</h1>
            <img src="/images/setting.png" alt="" />
          </div>
          <main className="main-area">
            <aside className="left-actions-container">
              <ActionButton
                action_title="add a task"
                action_image="/images/plus_sign.png"
                func={handleOpen}
              />
              {visibilty ? (
                <>
                  <ActionButton
                    action_title="delete all"
                    action_image="/images/bin.png"
                  />
                  <ActionButton
                    action_title="Edit"
                    action_image="/images/edit.png"
                    func={handleOpen}
                  />
                  <ActionButton
                    action_title="Mark Completed"
                    action_image="/images/checked.png"
                  />
                </>
              ) : (
                ""
              )}
            </aside>
            <aside className="data-grid-container">
              <ul>
                {data.map((ele) => (
                  <GridViewList
                    para={ele.data.todo}
                    key={ele.id}
                    handle={(e) => {
                      handleSelect(e, ele.id);
                    }}
                    star={star}
                    handleStar={(e)=>handleStar(e,ele.id)}
                    enable={enabler}
                  />
                ))}
              </ul>
            </aside>
          </main>
        </div>
      </div>

      {/* MODAL  */}
      <InputModal
        open={open}
        todo={todo}
        setTodo={(e) => setTodo(e.target.value)}
        handleOpen={handleOpen}
        addtask={addtask}
      />
    </>
  );
};

export default Layout;
