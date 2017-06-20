import {
  GET_DATA,
  CONNECT,
  DATA_UPDATE,
  ADD_STOCK,
  REMOVE_STOCK
} from "./types";
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

export function addStock(symbol) {
  const request = axios.post(`${API}/add`, { symbol });
  return {
    type: ADD_STOCK,
    payload: request
  };
}

export function removeStock(symbol) {
  const request = axios.post(`${API}/remove`, { symbol });
  return {
    type: REMOVE_STOCK,
    payload: request
  };
}
