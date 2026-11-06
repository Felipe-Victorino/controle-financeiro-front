import { useState } from "react";
import type { NetworkErrorResponse } from "@/types/ServerErrors.ts";

export const useRequest = <T= void>(onError?: (err: NetworkErrorResponse) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<NetworkErrorResponse | null>(null);
    const [data, setData] = useState<T| null>(null)

    const run = async (action: () => Promise<T>) => {
        setLoading(true);
        setError(null);
        try {
            const result = await action();
            setData(result)
            return result;
        } catch (e: unknown) {
            const err = e as NetworkErrorResponse;
            setError(err);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, run };
};