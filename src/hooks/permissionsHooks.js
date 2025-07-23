import { useSelector } from "react-redux";

const useHasPermission = (pTitle) => {
    const user= useSelector(state => state.rolesReducer.roles);
    const roles=user.roles
    let permissions=[];
    for (const role of roles) {
        permissions=[...permissions, ...role.permissions];
    }
    return permissions.findIndex(p=>p.title.includes(pTitle))>-1;
}
export default useHasPermission;