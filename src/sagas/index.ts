import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, call } from "redux-saga/effects";

import {
  retrieveGamesAPI,
  retrieveSingleGameAPI,
  addGameAPI,
  deleteGameAPI,
} from "../api-calls";
import { IGame } from "../components/Interfaces/Game";
import { sagaTestingConsole } from "../config/util";

const consoleLog = (errStr: string, errExp: any) => {
  sagaTestingConsole ?? console.log(errStr, errExp);
};
// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_GAMES", fetchAllGames);
  yield takeEvery("ADD_NEW_GAME", addNewGame);
  yield takeEvery("FETCH_SINGLE_GAME", fetchSingleGame);
  yield takeEvery("DELETE_GAME", deleteGame);
}

export function* fetchAllGames() {
  // get all games from the DB
  try {
    const { data } = yield call(retrieveGamesAPI);
    const games: IGame[] = data;
    consoleLog("get all games:", games);
    yield put({ type: "SET_GAMES", payload: games });
  } catch (err) {
    consoleLog("Error in Saga GET", err);
  }
}

export function* fetchSingleGame(action: any) {
  // get one game from the DB
  try {
    const gameId = action.payload;
    const { data } = yield call(retrieveSingleGameAPI, gameId);
    const singleGame: IGame = data;
    consoleLog("get single game:", singleGame);
    yield put({ type: "SET_GAME_DETAILS", payload: singleGame });
  } catch (err) {
    consoleLog("Error in Saga GET single resource", err);
  }
} // end fetchSingleGame

export function* addNewGame(action: any) {
  // add a new game to the DB
  try {
    const game = action.payload;
    yield call(addGameAPI, game);
    yield put({
      type: "FETCH_GAMES",
    });
  } catch (err) {
    consoleLog("Error in Saga POST", err);
  }
} // end addNewGame

export function* deleteGame(action: any) {
  try {
    const gameId = action.payload;
    yield call(deleteGameAPI, gameId);
    yield put({
      type: "FETCH_GAMES",
    });
  } catch (err) {
    consoleLog("Error in Saga Delete", err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store a single game's details
const gameDetails = (state = {}, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_GAME_DETAILS":
      return action.payload;
    case "CLEAR_DETAILS":
      return {};
    default:
      return state;
  }
};

// Used to store games returned from the server
const games = (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_GAMES":
      return action.payload;
    default:
      return state;
  }
};

let middleware: any = [];
if (sagaTestingConsole) {
  middleware = applyMiddleware(sagaMiddleware, logger);
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    games,
    gameDetails,
  }),
  // Add sagaMiddleware to our store
  middleware,
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
