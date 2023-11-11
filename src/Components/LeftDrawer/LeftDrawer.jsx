import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import './LeftDrawer.css'

export default function LeftDrawer(props) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
          <Button onClick={toggleDrawer( true)}>Left</Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer( false)}
            onOpen={toggleDrawer(true)}

          >
            <Box
              sx={{
                width: '20vw'
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
                {props.children}
            </Box>
          </SwipeableDrawer>
     </>
  );
}
