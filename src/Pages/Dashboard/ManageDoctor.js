import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DoctorDeleteModal from "./DoctorDeleteModal";
import DoctorRow from "./DoctorRow";

const ManageDoctor = () => {
    const [deletingDoctor,setDeletingDoctor] = useState(null);
    
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5000/doctors", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(doctors);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1>Manage your doctor {doctors.length} :</h1>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Avater</th>
                  <th>Name</th>
                  <th>Specility</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <DoctorRow
                    key={doctor._id}
                    index={index}
                    docotor={doctor}
                    refetch={refetch}
                    setDeletingDoctor={setDeletingDoctor}
                  />
                ))}
              </tbody>
            </table>
          </div>
           {deletingDoctor &&  <DoctorDeleteModal setDeletingDoctor={setDeletingDoctor} refetch={refetch} deletingDoctor={deletingDoctor}/>}
        </div>
      )}
    </>
  );
};

export default ManageDoctor;
