import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { AiOutlineCheck,AiOutlineClear } from "react-icons/ai";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

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

const ConfirmModal = (props) => {
    const {open,handleOpen,confirmTask,cancelTask} = props;
      
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
          
          <Button
            variant="contained"
            sx={{ border: "1px solid black",fontSize:"2rem" }}
            onClick={() => {
              confirmTask();
            }}
        
          >
            <AiOutlineCheck />{" "}
          </Button>
          <Button
            variant="contained"
            sx={{ border: "1px solid black",fontSize:"2rem" }}
            onClick={() => {
              cancelTask();
            }}
         

          >
            <ClearOutlinedIcon />{" "}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
