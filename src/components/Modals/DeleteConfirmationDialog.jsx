import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'react-bootstrap';
import deleteGif from '../../assets/delete_anime.gif';

const DeleteConfirmationDialog = ({
    open,
    onDelete = () => { },
    onClose = () => { },
    buttonName,
    modalHeading,
    message,
}) => {

    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <>
            <Modal
                id="showModal"
                onHide={handleClose}
                size="md"
                show={open}
                centered
            >
                <ModalHeader className="bg-light text-dark p-3 fw-bold" closeButton>
                    {modalHeading
                        ? modalHeading
                        : "CONFIRMATION FOR DELETION"}
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col justify-center items-center">
                        <img className="h-[100px] md:h-[150px] w-[100px] md:w-[150px]" src={deleteGif} alt="delete-gif" />
                        <p className="text-xl md:text-2xl text-black">Are you sure?</p>
                        <p className="mb-5 text-md md:text-lg font-normal">
                            {message ?
                                <p>{message}</p>
                                :
                                <p>
                                    Are you sure you want to delete this item?
                                </p>
                            }
                            
                        </p>
                    </div>
                    <div className="d-flex gap-3 justify-content-center md:mt-4 md:mb-2">
                        <Button
                            className="bg-grey border-grey"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="btn-soft-danger border-danger"
                            onClick={handleDelete}
                        >
                            {buttonName ? buttonName : "Yes, Confirm!"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default DeleteConfirmationDialog;