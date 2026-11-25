// features/wallets/WalletMembersDialog.tsx
import {useEffect} from "react";
import {Spinner, Text, VStack} from "@chakra-ui/react";
import {toaster} from "@/components/ui/toaster.tsx";
import {useRequest} from "@/hooks/useRequest.ts";
import {WalletMemberService} from "@/services/WalletMemberService";
import {buildMemberColumns} from "@/pages/Wallets/form/WalletMemberColumns.tsx";
import MemberForm from "@/pages/Wallets/form/WalletMemberForm.tsx";
import DataTable from "@/components/ui/DataTable/DataTable.tsx";
import {ModalDialog} from "@/components/ui/ModalDialog/ModalDialog.tsx";
import type {WalletMemberResponseValues} from "@/types/ServerResponseDTO.ts";
import type {MemberRole} from "@/types/Wallets/WalletType.ts";


interface ContentProps {
    walletId: string;
    canManage: boolean;
    onChanged?: () => void; // lets the page refresh its wallet list (memberEmails)
}

const MembersContent = ({walletId, canManage, onChanged}: ContentProps) => {
    const toastError = (err: { message: string }) =>
        toaster.create({type: "error", title: err.message, duration: 3000});
    const members = useRequest<WalletMemberResponseValues[]>(toastError);
    const change = useRequest(toastError);

    const load = () =>
        members.run(async () => (await WalletMemberService.instance.list(walletId)).data);

    useEffect(() => {
        void load();
    }, [walletId]);

    const afterChange = () => {
        void load();
        onChanged?.();
    };

    const columns = buildMemberColumns({
        canManage,
        onRoleChange: (m, role: MemberRole) =>
            void change.run(async () => {
                await WalletMemberService.instance.updateRole(walletId, m.id, {role});
                afterChange();
            }),
        onRemove: (m) =>
            void change.run(async () => {
                await WalletMemberService.instance.remove(walletId, m.id);
                afterChange();
            }),
    });

    return (
        <VStack align="stretch" gap="6">
            {canManage && (
                <MemberForm
                    initialValues={{userEmail: "", role: "EDITOR"}}
                    submitLabel="Adicionar membro"
                    onSubmit={(v) => WalletMemberService.instance.create(walletId, v)}
                    onSuccess={afterChange}
                />
            )}
            <DataTable
                items={members.data ?? []}
                columns={columns}
                rowKey={(m) => m.id}
                pageSize={5}
                empty={members.loading ? <Spinner/> : <Text>Sem membros.</Text>}
            />
        </VStack>
    );
};

interface DialogProps {
    walletId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    canManage: boolean;
    onChanged?: () => void;
}

export const WalletMembersDialog = ({walletId, open, onOpenChange, canManage, onChanged}: DialogProps) => (
    <ModalDialog open={open} onOpenChange={onOpenChange} title="Membros da carteira">
        {walletId && <MembersContent walletId={walletId} canManage={canManage} onChanged={onChanged}/>}
    </ModalDialog>
);