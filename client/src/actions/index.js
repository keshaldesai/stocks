import { GET_DATA, CONNECT, DATA_UPDATE } from "./types";
import axios from "axios";

const API = "http://localhost:8000/api";

export function getData() {
  const request = axios.get(`${API}/default`);
  return {
    type: GET_DATA,
    payload: request
  };
}

export function connectSocket() {
  return {
    type: CONNECT,
    url: "ws://localhost:8000"
  };
}

export function dataReceived(data) {
  return {
    type: DATA_UPDATE,
    payload: data
  };
}
