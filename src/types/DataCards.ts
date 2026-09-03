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