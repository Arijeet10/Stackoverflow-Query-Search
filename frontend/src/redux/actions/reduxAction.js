import ActionTypes from "./actionTypes";

export const setData=(data)=>{
    return {
        type:ActionTypes.SET_DATA,
        payload:Object.entries(data)
    };
};

export const setSearchInput=(data)=>{
    return {
        type:ActionTypes.SET_SEARCH,
        payload:Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&') //serializing the user input object into list of url query params
    }
}
