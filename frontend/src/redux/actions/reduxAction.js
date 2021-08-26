import ActionTypes from "./actionTypes";

export const setData=(data)=>{
    return {
        type:ActionTypes.SET_DATA,
        payload:Object.entries(data)
    };
};
