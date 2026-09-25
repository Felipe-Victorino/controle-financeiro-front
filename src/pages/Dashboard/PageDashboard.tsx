import "../../styles/Pages.css"
import PageContainer from "@/components/Containers/PageContainer.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DashboardContainer from "@/components/Containers/DashboardContainer.tsx";
import DashboardTitle from "@/components/DashboardTitle.tsx";
import RecentTransactions from "@/components/DataCards/RecentTransactions.tsx";
import FinanceSummary from "@/components/DataCards/FinanceSummary.tsx";
import {Button, Card, Carousel, Heading, IconButton} from "@chakra-ui/react";
import type {LocationLinkCardType} from "@/types/DataCards.ts";
import {MdArrowBack, MdArrowForward} from "react-icons/md";

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

                <ActionsRow/>
                <FinanceSummary/>

                <RecentTransactions/>
            </DashboardContainer>

        </PageContainer>
    )
}


const LocationCard = ({data}: { data: LocationLinkCardType }) => {
    const navigate = useNavigate();
    return (
        <Card.Root>
            <Card.Body>
                <Card.Title>
                    <Heading>
                        {data.name}
                    </Heading>

                </Card.Title>
                <Card.Description>
                    {data.description}
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent={"flex-end"}>
                <Button onClick={() => {
                    navigate(data.link);
                }
                }>
                    Ver mais
                </Button>

            </Card.Footer>

        </Card.Root>
    )
}

const locations: LocationLinkCardType[] = [
    {
        name: "Perfil",
        description: "Gerencie as suas preferências e dados",
        link: "/user"
    },
    {
        name: "Categorias",
        description: "Gerencie as suas categorias pessoais",
        link: "/categories"
    },
    {
        name: "Carteiras",
        description: "Gerencie as suas carteiras e carteiras que você pertence",
        link: "/wallets"
    },
    {
        name: "Transações",
        description: "Gerencie as suas transações realizadas",
        link: "/transactions"
    }
]

const ActionsRow = () => {

    return (
        <Carousel.Root slideCount={locations.length} slidesPerPage={3} gap={"0.5rem"}>
            <Carousel.Control justifyContent="center" gap="4" width="full">
                <Carousel.PrevTrigger asChild>
                    <IconButton size="xs" variant="outline">
                        <MdArrowBack/>
                    </IconButton>
                </Carousel.PrevTrigger>

                <Carousel.ItemGroup width="full">
                    {locations.map((_src, index) => (
                        <Carousel.Item key={index} index={index}>
                            <LocationCard data={_src}/>
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>

                <Carousel.NextTrigger asChild>
                    <IconButton size="xs" variant="outline">
                        <MdArrowForward/>
                    </IconButton>
                </Carousel.NextTrigger>
            </Carousel.Control>

            <Carousel.Indicators/>
        </Carousel.Root>
    )
}

export default PageDashboard;