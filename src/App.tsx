import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard.tsx";

import PageLogin from "@/pages/Login/PageLogin.tsx";
import {Box} from "@chakra-ui/react";
import PageRegister from "@/pages/NewUser/PageRegister.tsx";
import PageForgotPassword from "@/pages/ForgotPassword/PageForgotPassword.tsx";
import PageResetPassword from "@/pages/ChangePassword/PageResetPassword.tsx";


function App() {
    return (
        <Box h={"100vh"}>
            <BrowserRouter>
                <Routes>

                    <Route index path={"/"} element={<PageLogin/>}></Route>
                    <Route path={"auth"}>
                        <Route path="login" element={<PageLogin/>}></Route>
                        <Route path="signin" element={<PageRegister/>}></Route>
                        <Route path="forgot" element={<PageForgotPassword/>}></Route>
                        <Route path="reset" element={<PageResetPassword/>}></Route>
                    </Route>


                    <Route path="dash" element={<Dashboard/>}>

                    </Route>
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
