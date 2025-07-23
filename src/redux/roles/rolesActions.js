import { RECIVE_ROLES_ERROR, RECIVE_ROLES_RESPONSE, SEND_ROLES_REQUEST } from "./rolesType"

export const sendRolesRequest=()=>{
    return{
        type:SEND_ROLES_REQUEST
    }
}

export const reciveRolesResponse=(data)=>{
    return{
        type:RECIVE_ROLES_RESPONSE,
        payload:data
    }
}

export const reciveRolesError=(error)=>{
    return{
        type:RECIVE_ROLES_ERROR,
        payload:error
    }
}