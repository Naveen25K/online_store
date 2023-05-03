import { AppBar, Avatar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">
            Dash <span style={{ color: "orange" }}>board</span>
          </Typography>
          <Tabs sx={{ gap: "20px" }} textColor="white">
            <Tab label="Home" />
            <Tab label="About" />
            <Tab label="Contact" />
          </Tabs>
          <Avatar src="https://mui.com/static/images/avatar/3.jpg"></Avatar>
        </Toolbar>
      </AppBar>

      {/* card content  */}
    </React.Fragment>
  );
};

export default Header;
