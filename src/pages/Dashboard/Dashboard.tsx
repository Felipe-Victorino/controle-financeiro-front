import "../../styles/Pages.css"
import PageContainer from "@/components/Containers/PageContainer.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DashboardContainer from "@/components/Containers/DashboardContainer.tsx";
import {Card} from "@chakra-ui/react";
import DashboardTitle from "@/components/DashboardTitle.tsx";

const Dashboard = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        if (sessionStorage.getItem("login") == null) {
            navigate("/auth/login")
        }
    }
    useEffect(() => {
        redirectToLogin();
    }, [])

    return (
        <PageContainer>
            <DashboardContainer dashHeader={<DashboardTitle name={"Dashboard"}/>}>
                <Card.Root>
                    <Card.Header>
                        Bem vindo a conta
                    </Card.Header>
                    <Card.Body>

                    </Card.Body>
                </Card.Root>
                <Card.Root>

                    <Card.Body>
                        <Card.Title>
                            Transações recentes
                        </Card.Title>
                    </Card.Body>

                </Card.Root>
                <Card.Root>

                    <Card.Body>
                        <Card.Title>
                            Resumo financeiro
                        </Card.Title>
                    </Card.Body>

                </Card.Root>
            </DashboardContainer>

        </PageContainer>
    )
}

export default Dashboard;