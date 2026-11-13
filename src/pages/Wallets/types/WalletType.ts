
export const WALLET_MEMBER_ROLES = [
    {value: "OWNER", label: "Dono"},
    {value: "EDITOR", label: "Editor"},
    {value: "VIEWER", label: "Visualizador"}
] as const;

export type MemberRole = (typeof WALLET_MEMBER_ROLES)[number]["value"]

export interface WalletMemberValues{
    userEmail: string,
    role: MemberRole,

}
export const EMPTY_MEMBER: WalletMemberValues = {
    userEmail: "",
    role: "VIEWER"
}