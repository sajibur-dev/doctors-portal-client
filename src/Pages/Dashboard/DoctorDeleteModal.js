import React from "react";

const DoctorDeleteModal = ({setIsDelete}) => {
  return (
    <div>

      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
        <label for="delete-modal" class="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsDelete(false)} >✕</label>
        <h3 class="text-lg font-bold">Are you sure,you want to delete this doctor ? </h3>
          <div class="modal-action">
            <label for="delete-modal" onClick={() => setIsDelete(true)} class="btn">
              Yes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDeleteModal;
