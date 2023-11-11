import React, { useState, useEffect } from "react";
import { useFireBase } from "../../Firebase/Firebase";
import { useParams, useLocation } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../SIDEBAR/Sidebar";
import ActionButton from "../ActionButton/ActionButton";
import Alerts from "../Alert/Alerts";
import InputModal from "../InputModal/InputModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Outlet } from "react-router-dom";
import LeftDrawer from "../LeftDrawer/LeftDrawer";

const Layout = () => {
  const firebase = useFireBase();
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [openConfirmDelete, setConfirmOpenDelete] = useState(false);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [keyArr, setkeyArr] = useState([]);
  const [visibilty, setVisibility] = useState(false);
  const [msg, setMsg] = useState("must not be empty");
  const location = useLocation();
  const [pathName, setPathName] = useState("Tasks");
  const [width, setWidth] = React.useState(window.innerWidth);
  const switchPathName = () => {
    const path = location.pathname.slice(1);
    switch (path) {
      case "important":
        return "Importants Tasks";
      case "completed":
        return "Completed Tasks";
      default:
        return "Tasks";
    }
  };
  // EDIT TODO
  const editTodo = (e) => {
    if (keyArr.length === 1) {
      const obj = data.find((item) => item.id === keyArr[0]);
      setTodo(obj.data.todo);
      handleOpen();
      setEdit(true);
    } else if (keyArr.length > 1) {
      setMsg("only 1 should be selected");
      setOpenAlert(true);
    } else {
      setMsg("Select atleast 1 ");
      setOpenAlert(true);
    }
  };
  // MARK COMPLETED
  const markCompleted = () => {
    if (keyArr.length >= 1) {
      keyArr.forEach(async (ele, ind) => {
        const obj = data.find((item) => item.id === ele);
        obj && (await firebase.updateData(ele, { completed: true }));
      });
    } else {
      setMsg("Select atleast 1 ");
      setOpenAlert(true);
    }
    setRefresh((prev) => !prev);
    handleConfirmOpen();
  };
  // DELETE DATA
  const markDeleted = () => {
    if (keyArr.length >= 1) {
      keyArr.forEach(async (ele, ind) => {
        const obj = data.find((item) => item.id === ele);
        obj && (await firebase.deleteData(ele));
        keyArr.slice(ind, 1);
      });
    } else {
      setMsg("Select atleast 1 ");
      setOpenAlert(true);
    }
    setRefresh((prev) => !prev);

    handleConfirmOpenDelete();
  };
  // CONFIRM TASK
  // const confirmTask=(e,op)=>{
  //   if(op===1){
  //     // COMPLETED TASKS
  //     setCompleted(true);
  //     handleConfirmOpen()
  //   }else if(op===2){
  //     handleConfirmOpen()
  //   }else{
  //     setMsg("Cancelled");
  //     setOpenAlert(true);
  //   }
  // }

  // ENABLE ACTION BUTTONS
  const enabler = () => {
    if (keyArr.length > 0) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  useEffect(() => {
    enabler();
  }, [keyArr]);

  //OPEN MODAL
  const handleConfirmOpen = () => {
    setOpenConfirm(!openConfirm);
  };
  const handleConfirmOpenDelete = () => {
    setConfirmOpenDelete(!openConfirmDelete);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  // getting data
  const getData = async () => {
    const res = await firebase.getAllData();
    setData(res);
  };
  useEffect(() => {
    getData();
  }, [open, refresh]);
  // UNCHECK AND EMPTY KEY ARR
  useEffect(() => {
    data.forEach((ele, ind) => {
      ele.checked = false;
    });
    setkeyArr([]);
    setPathName(() => switchPathName());
  }, [refreshPage, refresh]);
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
    } else if (edit) {
      await firebase.updateData(keyArr[0], { todo: todo });
    } else {
      const ref = await firebase.postData({
        todo,
        important: false,
        completed: false,
        time: new Date(),
      });
    }
    setOpenAlert(false);
    setEdit(false);
    setTodo("");
    handleOpen();
  };
  // SCREEN STATE
  const breakpoint = 700;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  // RENDERING..............
  return (
    <>
      {openAlert && <Alerts sev="warning" message={msg} openVal={true} />}

      <div className="container">
        {(() => {
          if (width > breakpoint) {
            return (
              <Sidebar refreshPage={() => setRefreshPage((prev) => !prev)} />
            );
          } else {
            <LeftDrawer>
              <Sidebar refreshPage={() => setRefreshPage((prev) => !prev)} />
            </LeftDrawer>;
          }
        })()}
        <div className="right-side-container">
          <div className="top-nav-bar">
            <h1>{pathName}</h1>
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
                    action_title="delete"
                    action_image="/images/bin.png"
                    func={() => handleConfirmOpenDelete()}
                  />
                  <ActionButton
                    action_title="edit"
                    action_image="/images/edit.png"
                    func={editTodo}
                  />
                  <ActionButton
                    action_title="mark completed"
                    action_image="/images/checked.png"
                    func={() => handleConfirmOpen()}
                  />
                </>
              ) : (
                ""
              )}
            </aside>
            <aside className="data-grid-container">
              {data && <Outlet context={[handleSelect, data, enabler]} />}
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
      <ConfirmModal
        open={openConfirm}
        handleOpen={handleConfirmOpen}
        confirmTask={() => markCompleted()}
        cancelTask={() => handleConfirmOpen()}
      />
      <ConfirmModal
        open={openConfirmDelete}
        handleOpen={handleConfirmOpenDelete}
        confirmTask={() => markDeleted()}
        cancelTask={() => handleConfirmOpenDelete()}
      />
    </>
  );
};

export default Layout;
