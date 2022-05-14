import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./NewGameForm.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

function NewGameForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // local state to store new game info
  const [newGameData, setNewGameData] = useState({
    title: "",
    poster: "",
    description: "",
    status: "",
  });

  /* --- Handle input changes --- */
  const titleChange = (event: any) => {
    setNewGameData({ ...newGameData, title: event.target.value });
  };

  const posterChange = (event: any) => {
    setNewGameData({ ...newGameData, poster: event.target.value });
  };

  const descriptionChange = (event: any) => {
    setNewGameData({ ...newGameData, description: event.target.value });
  };

  const statusChange = (event: any) => {
    setNewGameData({ ...newGameData, status: event.target.value });
  };

  /* --- Handle Form Submit --- */
  // on form submit dispatch the addNewGame Saga
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    dispatch({
      type: "ADD_NEW_GAME",
      payload: newGameData,
    });
    history.push("/");
    setNewGameData({
      title: "",
      poster: "",
      description: "",
      status: "",
    });
  };

  // handle Cancel Button Click
  const handleCancel = () => {
    history.push("/");
    setNewGameData({
      title: "",
      poster: "",
      description: "",
      status: "",
    });
  };

  return (
    <div>
      <h2>Add a New Game</h2>
      <div id="form-container">
        <form onSubmit={handleFormSubmit}>
          {/* FORM INPUTS */}

          {/* Title Input */}
          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              label="Game Title"
              variant="outlined"
              type="text"
              value={newGameData.title}
              onChange={titleChange}
            />
          </Box>
          {/* Poster URL Input */}
          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              label="Game Poster URL"
              variant="outlined"
              type="text"
              value={newGameData.poster}
              onChange={posterChange}
            />
          </Box>
          {/* Description Input */}
          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              multiline
              rows={5}
              variant="outlined"
              label="Description"
              value={newGameData.description}
              onChange={descriptionChange}
            />
          </Box>
          {/* Dropdown for status selector */}
          <FormControl style={{ minWidth: 200 }} variant="outlined">
            <InputLabel id="statusList">Status:</InputLabel>
            <Select
              name="status"
              value={newGameData.status}
              onChange={statusChange}
              label="Status"
              labelId="statusList"
            >
              <MenuItem value="">
                <em>--Choose A Status--</em>
              </MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Unavailable">Unavailable</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <br />
          {/* Submit Button */}
          <div id="form-buttons">
            <Box m={1}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            <Box m={1}>
              <Button color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </div>
        </form>
        {/* Cancel button for go back to home page */}
      </div>
    </div>
  );
}

export default NewGameForm;
