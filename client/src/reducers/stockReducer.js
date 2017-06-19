import { GET_DATA } from "../actions/types";

const INITIAL_STATE = { symbols: [], data: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DATA:
      const { symbols, data } = action.payload.data;
      return { ...state, symbols, data };
    default:
      return state;
  }
}
