import {
    AvatarFallback,
    AvatarGroup,
    AvatarRoot,
    Button,
    CloseButton,
    Drawer,
    For,
    HStack,
    Icon,
    Portal,
    Stack
} from "@chakra-ui/react";
import {MdCategory, MdHome, MdLogout, MdMenu, MdSettings, MdSwapHoriz, MdWallet} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import React from "react";

const HeaderDrawer = () => {
    const navigate = useNavigate();

    const username = localStorage.getItem("name") || "Wayne";

    const navLinks = [
        {name: "Página Inicial", link: "/dashboard", icon: <MdHome/>},
        {name: "Categorias", link: "/categories", icon: <MdCategory/>},
        {name: "Carteiras", link: "/wallets", icon: <MdWallet/>},
        {name: "Transações", link: "/transactions", icon: <MdSwapHoriz/>},
        {name: "Configurações", link: "/settings", icon: <MdSettings/>}
    ]

    const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
    }

    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <Button variant="ghost" size="md">
                    <Icon>
                        <MdMenu/>
                    </Icon>
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop/>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Navegação</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Stack>
                                <For each={navLinks}>
                                    {(item, index) => (
                                        <Button
                                            w={"100%"}
                                            size={"xl"}
                                            key={index}
                                            onClick={() => navigate(item.link)}
                                            variant={"ghost"}
                                            justifyContent={"start"}
                                        >
                                            <Icon size={"lg"}>
                                                {item.icon}
                                            </Icon>

                                            {item.name}
                                        </Button>
                                    )}
                                </For>
                            </Stack>

                        </Drawer.Body>
                        <Drawer.Footer>

                            <HStack
                                w={"100%"}
                                gap={"2em"}
                                justify={"space-between"}

                            >

                                <Button
                                    variant="surface"
                                    onClick={
                                        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            e.preventDefault()
                                            navigate("/user")
                                        }
                                    }
                                >

                                    <HStack w={"100%"} justify={"flex-start"}>


                                        <AvatarGroup>
                                            <AvatarRoot size={"xs"}>
                                                <AvatarFallback/>
                                            </AvatarRoot>
                                        </AvatarGroup>


                                        {username}


                                    </HStack>
                                </Button>


                                <Button
                                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => logOut(e)}

                                    variant="surface">
                                    <MdLogout/>Sair
                                </Button>
                            </HStack>


                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default HeaderDrawer;