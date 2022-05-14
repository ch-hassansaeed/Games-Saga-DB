import { IGame } from "../components/Interfaces/Game";
import axiosClient from "../config/axios";

export async function retrieveGamesAPI() {
  return await axiosClient.get("/games");
}

export async function retrieveSingleGameAPI(id: number) {
  return await axiosClient.get(`/games/${id}`);
}

export async function addGameAPI(game: IGame) {
  return await axiosClient.post("/games", game);
}

export async function deleteGameAPI(id: number) {
  return await axiosClient.delete(`/games/${id}`);
}

export async function editGameAPI(game: IGame) {
  return await axiosClient.put(`/games/${game.id}`, game);
}
