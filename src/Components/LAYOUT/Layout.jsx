import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { Modal, Box, TextField, Button } from "@mui/material";
import { db } from "../../Firebase/Firebase";
import "./Layout.css";
import Sidebar from "../SIDEBAR/Sidebar";
import ActionButton from "../ActionButton/ActionButton";
import GridViewList from "../GridViewList/GridViewList";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import Alerts from "../Alert/Alerts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Layout = () => {
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [keyArr,setkeyArr]=useState([]);
  const [visibilty, setVisibility] = useState(false);
  const enabler=()=>{
    if(keyArr.length>0){
      setVisibility(true)
    }else{
      setVisibility(false)
    }
  }

  const handleOpen = () => {
    setOpen(!open);
    if(keyArr.length==1){
      const textObj= data.find(item=>item.id==keyArr[0])
      console.log(textObj)
    }
  };
  // create collection
  const dbCollection = collection(db, "todo");
  const addtask = async () => {
    if (!todo) {
      setOpenAlert(true);
    } else {
      const ref = await addDoc(dbCollection, {
        todo,
        important: false,
        completed: false,
        time: new Date(),
      });
      console.log(ref.id);
      setOpenAlert(false);
      setTodo("");
    }
    handleOpen();
  };
  // getting data
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(
        query(dbCollection, orderBy("time", "asc"))
      );

      const dataArray = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dataArray.push({ id: doc.id, data });
      });

      setData(dataArray);
    })();
  }, [data]);

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
                {data.map(ele => <GridViewList para={ele.data.todo} key={ele.id} id={ele.id} keyArray={keyArr} setterKeyArr={setkeyArr} enable={enabler} />)}
              </ul>
            </aside>
          </main>
        </div>
      </div>

      {/* MODAL  */}

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Todo"
              variant="standard"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              value={todo}
            />
            <Button
              variant="contained"
              sx={{ border: "1px solid black" }}
              onClick={() => {
                addtask();
              }}
            >
              <AiOutlinePlus />{" "}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Layout;
