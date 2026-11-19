import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/ui/Containers/DashboardContainer.tsx";
import {useRequest} from "@/hooks/useRequest.ts";
import UserService from "@/services/UserService.ts";
import {useEffect} from "react";
import type {UserResponseValues} from "@/types/ServerResponseDTO.ts";
import {toaster} from "@/components/ui/toaster.tsx";
import {Badge, HStack, Spinner} from "@chakra-ui/react";
import DashboardTitle from "@/components/ui/DashboardTitle/DashboardTitle.tsx";
import {type InfoField, InfoList} from "@/components/ui/InfoList/InfoList.tsx";
import {formatDate} from "@/utils/format.ts";


export const userFields: InfoField<UserResponseValues>[] = [
    {label: "Nome", value: (u) => u.name},
    {label: "Email", value: (u) => u.email},
    {
        label: "Perfis",
        value: (u) => (
            <HStack wrap="wrap">
                {u.authorities.map((a) => (
                    <Badge key={a}>{a}</Badge>
                ))}
            </HStack>
        ),
        hidden: (u) => u.authorities.length === 0,
    },
    {label: "Criado em", value: (u) => formatDate(u.createdIn)},
];

const PageUser = () => {
    return (
        <PageContainer>
            <DashboardContainer dashHeader={<DashboardTitle
                name="Conta"
                body=""
            />}>
                <UserInfoList/>
            </DashboardContainer>
        </PageContainer>
    )
}

const UserInfoList = () => {
    const {run, data, loading} = useRequest<UserResponseValues>(
        (err: { message: any; }) => toaster.create(
            {type: "error", title: err.message, duration: 3000}),
    )


    useEffect(() => {
        void run(async () => {
            const response = await UserService.instance.getAuthenticatedUserData();
            return response.data;
        });
    }, []);

    if (loading || !data) return <Spinner/>;

    return <InfoList item={data} fields={userFields}/>;
}

export default PageUser;