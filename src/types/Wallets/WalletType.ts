export const WALLET_MEMBER_ROLES = [
    {value: "OWNER", label: "Dono"},
    {value: "EDITOR", label: "Editor"},
    {value: "VIEWER", label: "Visualizador"}
] as const;

export type MemberRole = (typeof WALLET_MEMBER_ROLES)[number]["value"]


export interface WalletMemberValues {
    userEmail: string,
    role: MemberRole,
}

export const EMPTY_MEMBER: WalletMemberValues = {
    userEmail: "",
    role: "VIEWER"
}

export interface WalletValues {
    id: string,
    name: string,
    memberEmails: string[],
    ownerEmail: string,
    description: string,
    createdIn: string,
}

export const EMPTY_WALLET: WalletValues = {
    id: "",
    name: "",
    memberEmails: [],
    ownerEmail: "",
    description: "",
    createdIn: "",
}