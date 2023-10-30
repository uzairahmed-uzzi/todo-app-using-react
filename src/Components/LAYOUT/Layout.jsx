import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import "./Layout.css";
import Sidebar from "../SIDEBAR/Sidebar";
import ActionButton from "../ActionButton/ActionButton";
import GridViewList from "../GridViewList/GridViewList";
import Alerts from "../Alert/Alerts";
import InputModal from "../InputModal/InputModal";

const Layout = () => {
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [keyArr, setkeyArr] = useState([]);
  const [visibilty, setVisibility] = useState(false);
  const [check, setCheck] = useState(false);
  

  const enabler = () => {
    if (keyArr.length > 0) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  useEffect(() => {
    enabler();
    console.log("key ARR",keyArr);

  }, [keyArr]);

  const handleOpen = () => {
    setOpen(!open);
  };
  // create collection
  const dbCollection = collection(db, "todo");
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

  const handleSelect = (e,id) => {

     setkeyArr((prevKeyArr) => {
      if (check) {
        return prevKeyArr.filter((item) => item !== id);
      } else {
        return [...prevKeyArr, id];
      }
    });

    setCheck(!check);
  };
  
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
                    id={ele.id}
                    handle={handleSelect}
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
        setOpen={setOpen}
        dbCollection={dbCollection}
        todo={todo}
        setTodo={setTodo}
        setOpenAlert={setOpenAlert}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default Layout;
