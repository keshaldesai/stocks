import { GET_DATA, DATA_UPDATE, ADD_STOCK } from "../actions/types";

const INITIAL_STATE = { symbols: [], data: [], error: "" };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      if (!action.payload.data) {
        return INITIAL_STATE;
      }
      const { symbols, data } = action.payload.data;
      return { ...state, symbols, data };
    case DATA_UPDATE:
      const updatedSymbols = action.payload.symbols;
      const updatedData = action.payload.data;
      return { ...state, symbols: updatedSymbols, data: updatedData };
    case ADD_STOCK:
      if (action.error) {
        return { ...state, error: "No data found" };
      }
      return { ...state, error: "" };
    default:
      return state;
  }
}
