import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const ExerciseTable = ({ exercise, data }) => {

  const router = useRouter();


  const [liftingData, setLiftingData] = useState(data);

  // filter the data by exercise, and sort by date
  const filteredData = liftingData.filter(obj => obj.exercise === exercise);
  filteredData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });



  // handleDelete function for when Delete button is clicked
  const handleDelete = async (objectId) => {

    try {
      // delete object using specified API
      await fetch(`/api/deleteObject/${objectId}`, {method: 'DELETE'});
      console.log("done fetching...")
      // fetch liftingData again and change state, so that table component is rerendered
      const response = await fetch("/api/getLiftingData");
      const updated_data = await response.json();
      setLiftingData(updated_data);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  }; // end of handleDelete()

  useEffect(() => {
    setLiftingData(data);
  }, [data]);


  return (
    <div style={{borderRadius:'10px', overflow: 'hidden'}}>
      <table className="table table-striped table-bordered table-rounded custom-table">
        <thead className="table-dark">
          <tr>
            <th>Repetitions</th>
            <th>Exercise</th>
            <th>Date</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(obj => (
            <tr key={`${obj._id}-${obj.date}`}>
              <td style={{ border: 'none'}}> {obj.repetitions} </td>
              <td> {obj.exercise} </td>
              <td> {new Date(obj.date).toLocaleDateString('en-US', {timeZone: 'UTC'})} </td>
              <td> {obj.weight} </td>

              <td style={{ border: 'none'}}>
                <button type="button" className="btn" onClick={() => handleDelete(obj._id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseTable;