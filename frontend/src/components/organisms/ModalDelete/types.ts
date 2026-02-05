export type ModalDeleteProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
};