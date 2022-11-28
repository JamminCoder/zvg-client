export default class ModalHandler {
    constructor(modal, setModal) {
        this.modal = modal;
        this.setModal = setModal;
    }

    new(ModalElement, props) {
        !this.modal ? this.setModal(<ModalElement close={ () => this.setModal(null) } { ...props }/>) : this.setModal(null);
    }

    closeIfExists(modal) {
        if (modal) this.setModal(null);
    }
}