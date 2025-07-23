const initialState={
    roles:[],
    error:"",
    loading:false
}

const rolesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'SEND_ROLES_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'RECIVE_ROLES_RESPONSE':
            return {
                roles: action.payload,
                loading: false,
                error:""
            };
        case 'RECIVE_ROLES_ERROR':
            return {
                error: action.payload,
                loading: false,
                roles: []
            };
        default:
            return state;
    }
}
export default rolesReducer;