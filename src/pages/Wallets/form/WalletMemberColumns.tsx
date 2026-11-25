import {Badge, IconButton} from "@chakra-ui/react";
import {LuUserMinus} from "react-icons/lu";
import type {DataColumn} from "@/components/ui/DataTable/DataTable";
import {SelectInput} from "@/components/ui/Fields/SelectInput.tsx";
import type {WalletMemberResponseValues} from "@/types/ServerResponseDTO.ts";
import {type MemberRole, WALLET_MEMBER_ROLES} from "@/types/Wallets/WalletType.ts";

const roleLabel = (role: MemberRole) =>
    role === "OWNER" ? "Proprietário" : WALLET_MEMBER_ROLES.find((r) => r.value === role)?.label ?? role;

interface Options {
    canManage: boolean;
    onRoleChange: (member: WalletMemberResponseValues, role: MemberRole) => void;
    onRemove: (member: WalletMemberResponseValues) => void;
}

export const buildMemberColumns = ({
                                       canManage,
                                       onRoleChange,
                                       onRemove
                                   }: Options): DataColumn<WalletMemberResponseValues>[] => [

    {header: "Email", hideBelow: "md", cell: (m) => m.userEmail},
    {
        header: "Permissão",
        cell: (m) =>
            canManage && m.role !== "OWNER" ? (
                <SelectInput
                    size="xs"
                    w="36"
                    aria-label={`Permissão de ${m.userEmail}`}
                    value={m.role}
                    options={WALLET_MEMBER_ROLES}
                    onChange={(e) => onRoleChange(m, e.currentTarget.value as MemberRole)}
                />
            ) : (
                <Badge colorPalette={m.role === "OWNER" ? "purple" : "gray"}>{roleLabel(m.role)}</Badge>
            ),
    },
    ...(canManage
        ? [{
            header: "Ações",
            align: "end" as const,
            cell: (m: WalletMemberResponseValues) =>
                m.role === "OWNER" ? null : (
                    <IconButton aria-label="Remover membro" size="xs" variant="ghost" colorPalette="red"
                                onClick={() => onRemove(m)}>
                        <LuUserMinus/>
                    </IconButton>
                ),
        }]
        : []),
];