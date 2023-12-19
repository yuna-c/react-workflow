import { combineReducers } from 'redux';
import * as types from './actionType';

const membersReducer = (state = { members: [] }, action) => {
	if (action.type === types.MEMBERS.start) return state;
	else if (action.type === types.MEMBERS.success) return { ...state, members: action.payload };
	else if (action.type === types.MEMBERS.fail) return { ...state, members: action.payload };
	else return state;
};

const historyReducer = (state = { history: [] }, action) => {
	if (action.type === types.HISTORY.start) return state;
	else if (action.type === types.HISTORY.success) return { ...state, history: action.payload };
	else if (action.type === types.HISTORY.fail) return { ...state, history: action.payload };
	else return state;
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	if (action.type === types.YOUTUBE.start) return state;
	else if (action.type === types.YOUTUBE.success) return { ...state, youtube: action.payload };
	else if (action.type === types.YOUTUBE.fail) return { ...state, youtube: action.payload };
	else return state;
};

const reducers = combineReducers({ membersReducer, historyReducer, youtubeReducer });
export default reducers;
