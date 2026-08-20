import {Button, CloseButton, Drawer, For, Icon, Portal, Stack} from "@chakra-ui/react";
import {MdHome, MdLogout, MdMenu, MdPerson, MdSwapHoriz} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const HeaderDrawer = () => {
    const navigate = useNavigate();
    const navLinks = [
        {name: "Página Inicial", link: "/dash", icon: <MdHome/>},
        {name: "Perfil", link: "/user", icon: <MdPerson/>},
        {name: "Transações", link: "/transactions", icon: <MdSwapHoriz/>}
    ]


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
                                            key={index}
                                            onClick={() => navigate(item.link)}
                                            variant={"ghost"}
                                            justifyContent={"start"}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Button>
                                    )}
                                </For>
                            </Stack>

                        </Drawer.Body>
                        <Drawer.Footer>

                            <Button
                                w={"100%"}

                                variant="surface">
                                <MdLogout/>Sair
                            </Button>

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