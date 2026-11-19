// hooks/useTransactionStream.ts
import {useEffect, useRef, useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import UserService from "@/services/UserService.ts";
import api from "@/config/AxiosConfig.ts";

class FatalError extends Error {
}

const currentToken = (): string | undefined =>
    JSON.parse(localStorage.getItem("user") || "null")?.token;

export const useTransactionStream = (walletId: string, onChange: () => void) => {
    const [live, setLive] = useState(false);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange; // always the latest loader, without reconnecting

    useEffect(() => {
        if (!walletId) return;
        const ctrl = new AbortController();
        let failures = 0;
        let firstConnection = true;

        fetchEventSource(`${api.defaults.baseURL}/wallets/${walletId}/transactions/stream`, {
            signal: ctrl.signal,
            // runs on every (re)connection, so it always sends the current token
            fetch: (input, init) =>
                fetch(input, {...init, headers: {...init?.headers, Authorization: `Bearer ${currentToken()}`}}),

            async onopen(res) {
                if (res.ok) {
                    failures = 0;
                    return;
                }
                if (res.status === 401 || res.status === 403) {
                    // any authenticated call: if the token expired, your axios interceptor refreshes it
                    await UserService.instance.getAuthenticatedUserData();
                    throw new Error("retry with the new token");
                }
                throw new FatalError(`stream refused (${res.status})`);
            },
            onmessage(ev) {
                if (ev.event === "connected") {
                    setLive(true);
                    if (!firstConnection) onChangeRef.current(); // resync after a reconnect
                    firstConnection = false;
                } else if (ev.event === "transaction-changed") {
                    onChangeRef.current();
                }
            },
            onclose() {
                throw new Error("closed by the server"); // the 30-minute timeout: reconnect
            },
            onerror(err) {
                setLive(false);
                if (err instanceof FatalError || ++failures > 5) throw err; // stop retrying
                return Math.min(1000 * 2 ** failures, 15000); // wait before retrying, in ms
            },
        }).catch(() => setLive(false));

        return () => ctrl.abort();
    }, [walletId]);

    return live;
};