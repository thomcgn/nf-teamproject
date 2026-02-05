import ReactDOM from "react-dom";
import Button from "../../atoms/Button";
import type {ModalDeleteProps} from "./types.ts";

export default function ModalDelete({ isOpen, onClose, onConfirm, itemName }: ModalDeleteProps) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-delete">
                <img
                    src="https://media.istockphoto.com/id/1256113485/photo/adorable-little-toddler-girl-or-infant-baby-crying-when-unsatisfied-when-finished-eating-food.jpg?s=612x612&w=0&k=20&c=fUZ-2AK8zqPn3hkuwDK8KG37z3r-UnVhZa2KG19mRxw="
                    alt="Crying"
                    className="modal-delete__image"
                />
                <h2 className="modal-delete__title">Are you sure?</h2>
                <p className="modal-delete__text">
                    {itemName
                        ? `Oh no! The recipe "${itemName}" will be gone forever! 😢`
                        : "This item will be deleted. Are you sure? 😢"}
                </p>

                <div className="modal-delete__actions">
                    <Button className="btn-secondary" onClick={onClose} text="No, keep it!" />
                    <Button className="btn-primary" onClick={onConfirm} text="Yes, delete it!" />
                </div>
            </div>
        </div>,
        document.body
    );
}
