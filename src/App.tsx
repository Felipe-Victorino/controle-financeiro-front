import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import PageDashboard from "./pages/Dashboard/PageDashboard.tsx";

import PageLogin from "@/pages/Auth/Login/PageLogin.tsx";
import {Box} from "@chakra-ui/react";
import PageRegister from "@/pages/Auth/NewUser/PageRegister.tsx";
import PageForgotPassword from "@/pages/Auth/ForgotPassword/PageForgotPassword.tsx";
import PageResetPassword from "@/pages/Auth/ChangePassword/PageResetPassword.tsx";
import {useEffect, useState} from "react";
import PageCategories from "@/pages/Category/PageCategories.tsx";
import AuthRoute from "@/components/PublicRoute.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import AuthService from "@/services/AuthService.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {

    const [indexElement, setIndexElement] = useState(<PageLogin/>)

    useEffect(() => {
        function changeRootElement() {
            if (AuthService.instance.isAuthenticated()) {
                setIndexElement(<PageDashboard/>)
            }
        }

        changeRootElement()
    }, []);

    return (
        <Box h={"100vh"}>

            <BrowserRouter>
                <Routes>

                    <Route index path={"/"} element={indexElement}></Route>

                    <Route path="login" element={<AuthRoute><PageLogin/></AuthRoute> }/>
                    <Route path="signin" element={<AuthRoute><PageRegister/></AuthRoute>}/>
                    <Route path="forgot" element={<AuthRoute><PageForgotPassword/></AuthRoute>}/>
                    <Route path="reset" element={<AuthRoute><PageResetPassword/></AuthRoute>}/>

                    <Route path="home" element={<PrivateRoute><PageDashboard/></PrivateRoute>}/>
                    <Route path={"categories"} element={<PrivateRoute><PageCategories/></PrivateRoute>}/>


                </Routes>
            </BrowserRouter>
            <Toaster/>
        </Box>
    );
}

export default App;
