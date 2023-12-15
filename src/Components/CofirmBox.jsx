// Modal.js

import React from "react";
import Modal from "react-modal";

const CustomModal = ({ isOpen, handleClose, children,handleDelete,users }) => {
  return (
    <Modal
      className={
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 bg-white p-8 outline-none"
      }
      isOpen={isOpen}
      users={users}
      onRequestClose={handleClose}
      contentLabel="Modal"
    >
      <p className="text-gray-600 mb-4">Are you sure you want to delete?</p>
      <div className="flex justify-end ">
            <button onClick={handleDelete}>Yes</button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
          onClick={handleClose}
        >
          No
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default CustomModal;
