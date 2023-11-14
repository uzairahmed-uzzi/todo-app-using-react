import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import './LeftDrawer.css'

export default function LeftDrawer(props) {


  return (
    <>

          <SwipeableDrawer
            anchor={"left"}
            open={props.state}
            onClose={props.onClose}
            onOpen={props.onOpen}

          >
            <Box
              sx={{
                width: '80vw'
              }}
              role="presentation"
              onClick={props.onClose}
              onKeyDown={props.onClose}
            >
                {props.children}
            </Box>
          </SwipeableDrawer>
     </>
  );
}
