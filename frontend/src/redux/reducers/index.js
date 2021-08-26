import {combineReducers} from "redux";
import { reducer } from "./reduxReducers";

const reducers=combineReducers({
    Data:reducer,
});

export default reducers;