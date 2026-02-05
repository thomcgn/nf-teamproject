import type {CardProps} from "./types.ts";
import {Link} from "react-router-dom";

export default function Card({ children, title, backButtonTo, extra}: CardProps) {
    return (
        <div className="card">
            <div className="card__content">
                <div className="card__header">
                    {backButtonTo ? (
                        <Link to={backButtonTo} className="btn btn--ghost">
                            ←
                        </Link>
                    ) : <div />}

                        <h1 className="card__title">{title}</h1>

                    {extra ? (
                        <div className="card__extra">{extra}</div>
                    ) : <div />}
                </div>
                {children}
            </div>
        </div>
    );
}

