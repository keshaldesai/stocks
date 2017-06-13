import { GET_DATA } from '../actions/types';

const INITIAL_STATE = { data: {} };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (GET_DATA):
			const newData = state.data;
			newData[action.payload.data.symbol] = action.payload.data;
			return { ...state, data: newData }
		default:
			return state;
	}
}