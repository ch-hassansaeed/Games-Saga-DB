import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./GameDetails.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { gameImage } from "../../config/util";

function GameDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  // grab the single game details from redux store
  const gameDetails = useSelector((store: any) => store.gameDetails);

  // on 'back to to list' click,
  // clear the details reducer
  // so that the next game clicked doesn't load weird
  const clearDetailsReducer = () => {
    dispatch({
      type: "CLEAR_DETAILS",
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_GAME",
      payload: gameDetails.id,
    });
    history.push("/");
  };

  // local state for the delet dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        component={Link}
        to="/"
        color="primary"
        className="back-button"
        onClick={clearDetailsReducer}
      >
        <ArrowBackIcon /> Back To List
      </Button>
      <div className="details-container">
        <h2 className="game-detail-title">{gameDetails.title}</h2>
        <div id="status-box">
          {gameDetails.status == "Available" ? (
            <CheckCircleIcon className="icon-green" />
          ) : (
            <CancelIcon className="icon-red" />
          )}
          &nbsp;
          {gameDetails.status}
        </div>
        <img className="detail-image" src={gameImage(gameDetails.poster)} />
        <div className="description-container">
          <p className="description-text">{gameDetails.description}</p>
        </div>
        <Box mt={7}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                handleDelete();
              }}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default GameDetails;
