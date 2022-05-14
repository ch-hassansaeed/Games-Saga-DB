import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";

function Header() {
  const dispatch = useDispatch();

  // on 'back to to list' click,
  // clear the details reducer
  // so that the next game clicked doesn't load weird
  const clearDetailsReducer = () => {
    dispatch({
      type: "CLEAR_DETAILS",
    });
  };

  return (
    <div id="header-container">
      <h1 id="app-title">Games Saga DB</h1>

      <Box m={1}>
        <Button component={Link} to="/" onClick={clearDetailsReducer}>
          <HomeIcon /> &nbsp; Home
        </Button>

        <Button component={Link} to="/addgame">
          <AddBoxIcon /> &nbsp; Add Movie
        </Button>
      </Box>
    </div>
  );
}

export default Header;
