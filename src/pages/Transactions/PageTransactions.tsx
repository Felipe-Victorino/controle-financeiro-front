import PageContainer from "@/components/ui/Containers/PageContainer.tsx";
import DashboardContainer from "@/components/ui/Containers/DashboardContainer.tsx";
import DashboardTitle from "@/components/ui/DashboardTitle/DashboardTitle.tsx";
import type {CategoryResponseValues, TransactionResponseValues} from "@/types/ServerResponseDTO.ts";
import type {InfoField} from "@/components/ui/InfoList/InfoList.tsx";
import {formatCurrency, formatDateOnly} from "@/utils/format.ts";
import {Badge, Button, For, HStack, Icon, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {toaster} from "@/components/ui/toaster.tsx";
import {useRequest} from "@/hooks/useRequest.ts";
import {useEffect, useMemo, useState} from "react";
import {TransactionService} from "@/services/TransactionService.ts";
import {CategoryService} from "@/services/CategoryService.ts";
import {useTransactionStream} from "@/hooks/useTransactionStream.ts";
import {BiSolidChess} from "react-icons/bi";
import {DataCard} from "@/components/ui/InfoList/DataCard.tsx";
import {ModalDialog} from "@/components/ui/ModalDialog/ModalDialog.tsx";
import {TransactionForm} from "@/pages/Transactions/form/TransactionForm.tsx";
import {EMPTY_TRANSACTION} from "@/pages/Transactions/types/TransactionTypes.ts";
import {ConfirmDialog} from "@/components/ui/ModalDialog/ConfirmDialog.tsx";

export const buildTransactionFields = (categories: CategoryResponseValues[]): InfoField<TransactionResponseValues>[] => {
    const names = new Map(categories.map((c) => [c.id, c.name]));
    return [
        {
            label: "Valor",
            value: (t) => (
                <Text fontWeight="semibold" color={t.type === "RECEIPT" ? "green.600" : "red.600"}>
                    {t.type === "RECEIPT" ? "+ " : "- "}{formatCurrency(t.value)}
                </Text>
            ),
        },
        {label: "Categoria", value: (t) => names.get(t.categoryId) ?? "-"},
        {label: "Data", value: (t) => formatDateOnly(t.dateTransaction)},
        {label: "Criado por", value: (t) => t.createdBy},
    ];
};

type DialogMode = "create" | "edit" | "delete" | null;

const PageTransactions = () => {
    const {walletId = ""} = useParams<{ walletId: string }>();
    const toastError = (err: { message: string }) =>
        toaster.create({type: "error", title: err.message, duration: 3000});

    const txs = useRequest<TransactionResponseValues[]>(toastError);
    const cats = useRequest<CategoryResponseValues[]>(toastError);
    const [mode, setMode] = useState<DialogMode>(null);
    const [selected, setSelected] = useState<TransactionResponseValues | null>(null);

    const loadTransactions = () =>
        txs.run(async () => (await TransactionService.instance.list(walletId)).data);

    const loadCategories = () =>
        cats.run(async () => {
            return (await CategoryService.instance.getCategoryList()).data;
        });

    useEffect(() => {
        void loadTransactions();
        void loadCategories();
    }, [walletId]);

    const live = useTransactionStream(walletId, () => void loadTransactions());

    const transactions = txs.data ?? [];
    const fields = useMemo(() => buildTransactionFields(cats.data ?? []), [cats.data]);
    const balance = transactions.reduce(
        (sum, t) => sum + (t.type === "RECEIPT" ? t.value : -t.value), 0,
    );
    const isLoading = txs.loading || (txs.data === null && !txs.error);

    const closeDialog = () => setMode(null);
    const handleOpenChange = (open: boolean) => {
        if (!open) closeDialog();
    };
    const openEdit = (t: TransactionResponseValues) => {
        setSelected(t);
        setMode("edit");
    };
    const openDelete = (t: TransactionResponseValues) => {
        setSelected(t);
        setMode("delete");
    };
    const afterChange = () => {
        closeDialog();
        void loadTransactions();
    };

    return (
        <PageContainer>
            <DashboardContainer
                dashHeader={
                    <DashboardTitle name="Transações" body="Receitas e despesas desta carteira."/>
                }
            >
                <HStack justify="space-between">
                    <Button onClick={() => setMode("create")}>Nova transação</Button>
                    <HStack>
                        <Badge colorPalette={live ? "green" : "gray"}>{live ? "Ao vivo" : "Desconectado"}</Badge>
                        <Text fontWeight="semibold">Saldo: {formatCurrency(balance)}</Text>
                    </HStack>
                </HStack>

                <For
                    each={transactions}
                    fallback={
                        isLoading ? (
                            <Spinner/>
                        ) : txs.error ? (
                            <VStack>
                                Não foi possível carregar as transações.
                                <Button onClick={loadTransactions}>Tentar novamente</Button>
                            </VStack>
                        ) : (
                            <VStack textAlign="center" fontWeight="medium">
                                <Icon><BiSolidChess/></Icon>
                                Sem transações...
                            </VStack>
                        )
                    }
                >
                    {(t) => (
                        <DataCard
                            item={t}
                            title={(x) => x.description || "Sem descrição"}
                            fields={fields}
                            onEdit={openEdit}
                            onDelete={openDelete}
                        />
                    )}
                </For>

                <ModalDialog
                    open={mode === "create"} onOpenChange={handleOpenChange}
                    title="Nova transação" closeOnInteractOutside={false}
                >
                    <TransactionForm
                        categories={cats.data ?? []}
                        initialValues={EMPTY_TRANSACTION}
                        submitLabel="Criar transação"
                        onSubmit={(v) => TransactionService.instance.create(walletId, v)}
                        onSuccess={afterChange}
                    />
                </ModalDialog>

                <ModalDialog
                    open={mode === "edit"} onOpenChange={handleOpenChange}
                    title="Editar transação" closeOnInteractOutside={false}
                >
                    {selected && (
                        <TransactionForm
                            key={selected.id}
                            categories={cats.data ?? []}
                            initialValues={{
                                type: selected.type,
                                categoryId: String(selected.categoryId),
                                value: String(selected.value),
                                description: selected.description ?? "",
                                dateTransaction: selected.dateTransaction,
                            }}
                            submitLabel="Salvar alterações"
                            onSubmit={(v) => TransactionService.instance.update(walletId, selected.id, v)}
                            onSuccess={afterChange}
                        />
                    )}
                </ModalDialog>

                <ConfirmDialog
                    open={mode === "delete"} onOpenChange={handleOpenChange}
                    title="Excluir transação"
                    description="Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita."
                    confirmLabel="Excluir"
                    onConfirm={async () => {
                        if (!selected) return;
                        await TransactionService.instance.remove(walletId, selected.id);
                        void loadTransactions();
                    }}
                />
            </DashboardContainer>
        </PageContainer>
    );
};

export default PageTransactions;