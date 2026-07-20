import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import NewUser from "./pages/NewUser/NewUser";
import RequestPassword from "./pages/RequestPassword/RequestPassword.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";

function App() {
    return (
        <div className="bg-emerald-100 dark:bg-mist-900 min-h-screen flex flex-col">
            <Header title={"FinFin"}/>
            <main className="grow p-8">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}></Route>
                        <Route path="/signin" element={<NewUser/>}></Route>
                        <Route path="/forgot" element={<RequestPassword/>}></Route>
                        <Route path="/dash" element={<Dashboard/>}></Route>
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
