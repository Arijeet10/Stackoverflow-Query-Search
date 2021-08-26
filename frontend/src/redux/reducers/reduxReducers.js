import ActionTypes from "../actions/actionTypes";

const inititalState={
    search:{},
    data:[],
    loading:false
}

export const reducer=(state=inititalState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_SEARCH:
            return{
                ...state,
                search:payload
            }
        case ActionTypes.SET_DATA:
            return{
                ...state,
                data:payload
            };     
        case ActionTypes.SET_RESET:
            return{
                search:{},
                data:[],
                loading:false
            }
        default:
            return{
                ...state
            };
    }
};