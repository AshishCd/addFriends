import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ handleClose, show, deleteBtnId, friendListArr, deletePermanently }) => {
    const deletePerson = friendListArr.filter((i) => i.id === deleteBtnId);
  return (
    <>
      <Modal onHide={handleClose} animation={false} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to Permanently delete ${deletePerson[0].text} from your friend list?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, don't DELETE
          </Button>
          <Button variant="danger" onClick={() => deletePermanently()}>
            Yes, DELETE?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
