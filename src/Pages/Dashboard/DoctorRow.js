import React from "react";
import { toast } from "react-toastify";

const DoctorRow = ({ docotor, index, refetch }) => {
  const { _id,name, specility, image } = docotor;
  const deleteDoctor = _id => {
      console.log(_id);
      const isDelete = window.confirm(`Are you sure You wan't to delete this doctor?`)
      if(isDelete){
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
                refetch();
            }
        })
      }
  }
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div class="avatar">
          <div class="w-16 mask mask-hexagon">
            <img src={image} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{specility}</td>
      <td> <label htmlFor="delete-modal"  className="btn  modal-button btn-xs btn-error" onClick={() => deleteDoctor(_id)}>Delete</label> </td>
    </tr>
  );
};

export default DoctorRow;