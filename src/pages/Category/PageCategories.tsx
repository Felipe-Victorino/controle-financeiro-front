import {useEffect, useState} from "react";
import {Badge, Box, Button, For, HStack, Icon, Spinner, VStack} from "@chakra-ui/react";
import {BiSolidChess} from "react-icons/bi";
import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/ui/Containers/DashboardContainer.tsx";
import DashboardTitle from "@/components/ui/DashboardTitle/DashboardTitle.tsx";
import type {CategoryResponseValues} from "@/types/ServerResponseDTO.ts";
import {CategoryService} from "@/services/CategoryService.ts";
import {toaster} from "@/components/ui/toaster.tsx";
import {useRequest} from "@/hooks/useRequest.ts";
import {ModalDialog} from "@/components/ui/ModalDialog/ModalDialog.tsx";
import CategoryForm from "@/pages/Category/form/CategoryForm.tsx";
import {ConfirmDialog} from "@/components/ui/ModalDialog/ConfirmDialog.tsx";
import {EMPTY_CATEGORY} from "@/pages/Category/types/CategoryTypes.ts";
import type {InfoField} from "@/components/ui/InfoList/InfoList.tsx";
import {DataCard} from "@/components/ui/InfoList/DataCard.tsx";


export const categoryFields: InfoField<CategoryResponseValues>[] = [
    {label: "Tipo", value: (c) => (c.type === "RECEIPT" ? "Recibo" : "Despesa")},
    {
        label: "Cor",
        value: (c) => (
            <HStack>
                <Box boxSize="4" rounded="full" bg={c.color}/>
                {c.color}
            </HStack>
        ),
    },
    {
        label: "Status",
        value: (c) => (
            <Badge colorPalette={c.isActive ? "green" : "gray"}>{c.isActive ? "Ativa" : "Inativa"}</Badge>
        ),
    },
];

const PageCategories = () => {
    type DialogMode = "create" | "edit" | "delete" | null;

    const [mode, setMode] = useState<DialogMode>(null);
    const [selected, setSelected] = useState<CategoryResponseValues | null>(null);

    const closeDialog = () => setMode(null);
    const handleOpenChange = (open: boolean) => {
        if (!open) closeDialog();
    };


    const openEdit = (category: CategoryResponseValues) => {
        setSelected(category);
        setMode("edit");
    };
    const openDelete = (category: CategoryResponseValues) => {
        setSelected(category);
        setMode("delete");
    };


    const {loading, error, data: categories, run} = useRequest<CategoryResponseValues[]>(
        (err: { message: any; }) => toaster.create(
            {type: "error", title: err.message, duration: 3000}
        ),
    );

    const loadCategories = () =>
        run(async () => {
            const response = await CategoryService.instance.getCategoryList();
            return response.data;
        });

    useEffect(() => {
        void loadCategories();
    }, []);

    const isLoading = loading || (categories === null && !error);

    return (
        <PageContainer>
            <DashboardContainer
                dashHeader={
                    <DashboardTitle
                        name="Categorias"
                        body="Essa é a lista de categorias, crie, desative ou atualize categorias registradas."
                    />
                }
            >
                <HStack>
                    <Button onClick={() => setMode("create")}>Criar Categoria</Button>
                </HStack>

                <For
                    each={categories ?? []}
                    fallback={
                        isLoading ? (
                            <Spinner/>
                        ) : error ? (
                            <VStack>
                                Não foi possível carregar as categorias.
                                <Button onClick={loadCategories}>Tentar novamente</Button>
                            </VStack>
                        ) : (
                            <VStack textAlign="center" fontWeight="medium">
                                <Icon>
                                    <BiSolidChess/>
                                </Icon>
                                Sem categorias...
                            </VStack>
                        )
                    }
                >
                    {(item) => <DataCard
                        item={item}
                        title={(c) => c.name}
                        fields={categoryFields}
                        onEdit={openEdit}
                        onDelete={openDelete}
                    />}
                </For>
                <ModalDialog
                    open={mode === "create"}
                    onOpenChange={handleOpenChange}
                    title="Nova categoria"
                    closeOnInteractOutside={false}
                >
                    <CategoryForm
                        initialValues={EMPTY_CATEGORY}
                        submitLabel="Criar nova categoria"
                        onSubmit={(values) => {
                            return CategoryService.instance.createCategory({...values});
                        }
                        }
                        onSuccess={() => {
                            closeDialog();
                            void loadCategories();
                        }}
                    />
                </ModalDialog>

                <ModalDialog
                    open={mode === "edit"}
                    onOpenChange={handleOpenChange}
                    title="Editar categoria"
                    closeOnInteractOutside={false}
                >
                    {selected && (
                        <CategoryForm
                            key={selected.id}
                            initialValues={{
                                name: selected.name,
                                color: selected.color,
                                icon: selected.icon,
                                type: selected.type
                            }}
                            submitLabel="Salvar alterações"
                            onSubmit={(values) =>
                                CategoryService.instance.updateCategory(selected.id, {
                                    ...values,
                                })
                            }
                            onSuccess={() => {
                                closeDialog();
                                void loadCategories();
                            }}
                        />
                    )}
                </ModalDialog>

                <ConfirmDialog
                    open={mode === "delete"}
                    onOpenChange={handleOpenChange}
                    title="Excluir categoria"
                    description={`Tem certeza que deseja excluir "${selected?.name}"? Essa ação não pode ser desfeita.`}
                    confirmLabel="Excluir"
                    onConfirm={async () => {
                        if (!selected) return;
                        await CategoryService.instance.deleteCategory(selected.id);
                        void loadCategories();
                    }}
                />
            </DashboardContainer>
        </PageContainer>
    );
};

export default PageCategories;