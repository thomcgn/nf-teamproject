import React from "react";
import type { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
                                         name,
                                         value,
                                         onChange,
                                         placeholder,
                                         type = "text",
                                         label,
                                         disabled = false,
                                     }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        if (type === "number") {
            onChange(rawValue === "" ? "" : Number(rawValue));
        } else {
            onChange(rawValue);
        }
    };
    return (
        <div className="input-wrapper">
            {label && <label htmlFor={name}  className="input-label">{label}</label>}
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                className="custom-input"
            />
        </div>
    );
};

export default Input;
