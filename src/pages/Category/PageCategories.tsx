import PageContainer from "@/components/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/Containers/DashboardContainer.tsx";
import CategoryCard from "@/components/DataCards/CategoryCard.tsx";
import type {CategoryResponse} from "@/types/CategoryResponse.ts";
import DashboardTitle from "@/components/DashboardTitle.tsx";

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