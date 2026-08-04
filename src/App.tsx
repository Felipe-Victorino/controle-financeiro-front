import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import NewUser from "./pages/NewUser/NewUser";
import RequestPassword from "./pages/RequestPassword/RequestPassword.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";

function App() {
    return (
        <div className="app">

            <main className="h-full">

                <BrowserRouter>
                    <Header title={"FinFin"}/>
                    <Routes>

                        <Route index path={"/"} element={<Login/>}></Route>
                        <Route path={"auth"}>
                            <Route path="login" element={<Login/>}></Route>
                            <Route path="signin" element={<NewUser/>}></Route>
                            <Route path="forgot" element={<RequestPassword/>}></Route>
                            <Route path="reset" element={<ChangePassword/>}></Route>
                        </Route>


                        <Route path="dash" element={<Dashboard/>}>

                        </Route>
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
