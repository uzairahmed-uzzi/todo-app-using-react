import * as React from 'react';
import {Alert,Stack,Collapse,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Alerts=(props)=> {
  const [openAlert,setOpenAlert]=React.useState(props.openVal);
  const handleClose=()=>{
    setOpenAlert(!openAlert)
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Collapse in={openAlert}>
        <Alert
        severity={props.sev}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      </Collapse>
     
    </Stack>
  );
}
export default Alerts