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


function App() {

    const [indexElement, setIndexElement] = useState(<PageLogin/>)

    useEffect(() => {
        function changeRootElement() {
            if (localStorage.getItem("login") === "true") {
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
                    <Route path={"auth"}>
                        <Route path="login" element={<PageLogin/>}></Route>
                        <Route path="signin" element={<PageRegister/>}></Route>
                        <Route path="forgot" element={<PageForgotPassword/>}></Route>
                        <Route path="reset" element={<PageResetPassword/>}></Route>
                    </Route>


                    <Route path="dashboard" element={<PageDashboard/>}>

                    </Route>
                    <Route path={"categories"} element={<PageCategories/>}/>


                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
