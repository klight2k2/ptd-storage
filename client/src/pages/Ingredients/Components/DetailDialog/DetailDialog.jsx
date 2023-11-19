import Modal from "antd/es/modal/Modal";

const DetailDialog = ({ open, handleClose, handleCancel, ingredient }) => {
  console.log(ingredient);
  return (
    <>
      <Modal centered open={open} onOk={handleClose} onCancel={handleCancel}>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default DetailDialog;
