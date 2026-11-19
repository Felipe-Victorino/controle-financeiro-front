export interface CategoryResponseValues {
    id: number,
    name: string,
    color: string,
    icon: string,
    type: "RECEIPT" | "EXPENSE",
    isActive: boolean

}

export interface UserResponseValues {
    name: string,
    email: string,
    authorities: string[],
    createdIn: string
}

export interface WalletMemberResponseValues {
    id: number
    walletId: string,
    userEmail: string,
    role: "OWNER" | "EDITOR" | "VIEWER",
    joinedIn: string
}

export interface WalletResponseValues {
    id: string
    name: string,
    ownerEmail: string,
    memberEmails: string[],
    description: string,
    createdIn: string
}

export interface TransactionResponseValues {
    id: number,
    walletId: string,
    categoryId: number,
    type: "RECEIPT" | "EXPENSE",
    value: number,
    description: string | null
    dateTransaction: string; // "2026-11-12"
    createdBy: string;
    createdIn: string;
}