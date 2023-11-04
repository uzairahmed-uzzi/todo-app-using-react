import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";

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

const InputModal = (props) => {
    const {open,todo,setTodo,handleOpen,addtask} = props;
      
  return (
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
            onChange={setTodo}
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
  );
};

export default InputModal;
