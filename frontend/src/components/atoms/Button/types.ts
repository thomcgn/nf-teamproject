export type ButtonProps = {
    onClick?: () => void;
    icon?: React.ReactNode;
    text?: string;
    className?: string;
    onlyIcon?: boolean;
    disabled?: boolean;
};