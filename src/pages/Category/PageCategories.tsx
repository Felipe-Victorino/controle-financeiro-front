import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/ui/Containers/DashboardContainer.tsx";
import CategoryCard from "@/components/ui/DataCards/CategoryCard.tsx";
import type {CategoryResponse} from "@/types/CategoryResponse.ts";
import DashboardTitle from "@/components/ui/DashboardTitle/DashboardTitle.tsx";

const PageCategories = () => {

    const testCategory: CategoryResponse = {
        color: "",
        icon: "smile",
        isActive: false,
        type: "RECEIPT",
        id: 0,
        name: "All"
    }

    return (
        <PageContainer>
            <DashboardContainer dashHeader={<DashboardTitle
                name={"Categorias"}

                body={"Essa é a lista de categorias, crie, desative ou atualize categorias registradas."}
            />}>

                <CategoryCard category={testCategory}>

                </CategoryCard>

            </DashboardContainer>
        </PageContainer>
    )
}

export default PageCategories;