import type {To} from "react-router-dom";

export interface LocationLinkCardType {
    name: string,
    description: string,
    link: To,
}

export interface FinanceSummaryType {
    total: number
}

export interface RecentTransactionsType {
    transactions: [
        {
            value: number
            type: string
            date: Date
        }
    ]
}