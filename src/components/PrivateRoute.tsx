import { Navigate } from 'react-router-dom';
import AuthService from "@/services/AuthService.ts";
import type {ReactNode} from "react";


const PrivateRoute = ({ children }: {children: ReactNode}) => {
    if (!AuthService.instance.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;