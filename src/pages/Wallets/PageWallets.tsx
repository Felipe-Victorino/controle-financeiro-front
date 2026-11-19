import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/ui/Containers/DashboardContainer.tsx";
import DashboardTitle from "@/components/ui/DashboardTitle/DashboardTitle.tsx";


export const PageWallets = () => {
    return (
        <PageContainer>
            <DashboardContainer dashHeader={<DashboardTitle
                name="Carteiras"
            />}>

            </DashboardContainer>
        </PageContainer>
    )
}


