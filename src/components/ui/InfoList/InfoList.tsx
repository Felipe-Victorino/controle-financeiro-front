import {DataList} from "@chakra-ui/react";
import type {ReactNode} from "react";

export type InfoField<T> = {
    label: string;
    value: (item: T) => ReactNode;
    hidden?: (item: T) => boolean; // optional: skip a row for some items
};

interface InfoListProps<T> {
    item: T;
    fields: InfoField<T>[];
    orientation?: "horizontal" | "vertical";
}

export const InfoList = <T, >({item, fields, orientation = "horizontal"}: InfoListProps<T>) => (
    <DataList.Root orientation={orientation}>
        {fields
            .filter((f) => !f.hidden?.(item))
            .map((f) => (
                <DataList.Item key={f.label}>
                    <DataList.ItemLabel>{f.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{f.value(item)}</DataList.ItemValue>
                </DataList.Item>
            ))}
    </DataList.Root>
);