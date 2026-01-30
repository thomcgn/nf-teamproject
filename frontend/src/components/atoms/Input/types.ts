type BaseInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

type TextInputProps = BaseInputProps & {
    type?: "text" | "email" | "password";
    value: string;
    onChange: (value: string) => void;
};

type NumberInputProps = BaseInputProps & {
    type: "number";
    value: number;
    onChange: (value: number) => void;
};

export type InputProps = TextInputProps | NumberInputProps;
