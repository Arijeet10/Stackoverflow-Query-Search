import ActionTypes from "../actions/actionTypes";

const inititalState={
    data:[],
    loading:false
}

export const reducer=(state=inititalState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_DATA:
            return{
                ...state,
                data:payload
            };     
        default:
            return{
                ...state
            };
    }
};