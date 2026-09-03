import "../../styles/Pages.css"
import PageContainer from "@/components/Containers/PageContainer.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DashboardContainer from "@/components/Containers/DashboardContainer.tsx";
import DashboardTitle from "@/components/DashboardTitle.tsx";
import RecentTransactions from "@/components/DataCards/RecentTransactions.tsx";
import FinanceSummary from "@/components/DataCards/FinanceSummary.tsx";

const PageDashboard = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        if (localStorage.getItem("login") == null) {
            navigate("/auth/login")
        }
    }

    useEffect(() => {
        redirectToLogin();
    }, [])

    return (
        <PageContainer>
            <DashboardContainer dashHeader={
                <DashboardTitle
                    name={"Dashboard"}

                    body={"Bem vindo ao serviço FinFin, este é seu dashboard"}
                />
            }
            >

                <FinanceSummary/>

                <RecentTransactions/>
            </DashboardContainer>

        </PageContainer>
    )
}

export default PageDashboard;