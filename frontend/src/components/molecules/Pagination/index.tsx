import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type {PaginationProps} from "./types.ts";
import Button from "../../atoms/Button";

export default function Pagination({
   page,
   totalPages,
   onPrev,
   onNext,
   className = "",
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div
            className={`pagination ${className}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
            <Button
                onClick={onPrev}
                disabled={page === 1}
                icon={<FiChevronLeft />}
                className="btn-pagination"
            />

            <span style={{ fontWeight: 500 }}>
                Page {page} / {totalPages}
            </span>

            <Button
                onClick={onNext}
                disabled={page === totalPages}
                icon={<FiChevronRight />}
                className="btn-pagination"
            />
        </div>
    );
}
