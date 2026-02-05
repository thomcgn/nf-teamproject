import type {ReactNode} from "react";

export type CardProps = {
    title: string,
    children?: ReactNode
    backButtonTo?: string;
    extra?: ReactNode
}