import React from "react";
import { toast } from "react-toastify";

const DoctorDeleteModal = ({deletingDoctor,setDeletingDoctor,refetch}) => {
  const {name,_id} =  deletingDoctor;

  const deleteDoctor = _id => {
    console.log(_id);
      fetch(`http://localhost:5000/doctors/${_id}`,{
          method:'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
      }).then((res) => res.json())
      .then((result) => {
          console.log(result);
          if(result.deletedCount){
              toast.success(`doctor:${name} is deleteded`);
              setDeletingDoctor(null)
              refetch();
          }
      })
    
}
  return (
    <div>

      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
        
        <h3 class="text-lg font-bold text-error">Are you sure ,you want to delete DR.{name}? </h3>
        <p className="text-xs">Once you delete you can't find DR.{name}</p>
          <div class="modal-action">
            <button className="btn btn-xs btn-error" onClick={() => deleteDoctor(_id)}>delete</button>
            <label for="delete-modal" class="btn btn-xs btn-success">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDeleteModal;
