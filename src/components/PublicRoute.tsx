import AuthService from "@/services/AuthService.ts";
import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";

const AuthRoute = ({ children }: {children: ReactNode}) => {
    if (AuthService.instance.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default AuthRoute;