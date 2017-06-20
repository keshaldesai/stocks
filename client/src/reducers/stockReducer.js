import { GET_DATA, DATA_UPDATE } from "../actions/types";

const INITIAL_STATE = { symbols: [], data: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      const { symbols, data } = action.payload.data;
      return { ...state, symbols, data };
    case DATA_UPDATE:
      const updatedSymbols = action.payload.symbols;
      const updatedData = action.payload.data;
      return { ...state, symbols: updatedSymbols, data: updatedData };
    default:
      return state;
  }
}
