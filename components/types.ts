import { DataItemDto } from "../resources/data";

export const SELECTED_ID = "10";

export type DataItem = {
    isOpened?: boolean;
    isActive?: boolean;
    children?: DataItem[];
} & DataItemDto;