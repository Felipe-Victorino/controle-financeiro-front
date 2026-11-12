import type {Options} from "check-password-strength";

export const strengthOptions: Options<string> = [
    {
        id: 1,
        value: "Fraca",
        minDiversity: 0,
        minLength: 0
    },
    {
        id: 2,
        value: "Medíocre",
        minDiversity: 2,
        minLength: 6
    },
    {
        id: 3,
        value: "Forte",
        minDiversity: 3,
        minLength: 8
    },
    {
        id: 4,
        value: "Muito forte",
        minDiversity: 4,
        minLength: 10
    },
]