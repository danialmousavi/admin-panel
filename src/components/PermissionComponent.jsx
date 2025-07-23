import React from 'react'
import useHasPermission from '../hooks/permissionsHooks';
import { Navigate } from 'react-router-dom';

export default function PermissionComponent({component,pTitle}) {
    const hasPermission = useHasPermission(pTitle);
    return hasPermission ? component : <Navigate to={-1}/>;

}
