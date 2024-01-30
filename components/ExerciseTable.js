import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Button} from "@nextui-org/react";


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
      
      <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Repetitions</TableColumn>
        <TableColumn>Exercise</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Weight</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>

      <TableBody>
        {filteredData.map(obj => (
          <TableRow key={`${obj._id}-${obj.date}`}>
            <TableCell>{obj.repetitions}</TableCell>
            <TableCell>{obj.exercise}</TableCell>
            <TableCell>{new Date(obj.date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</TableCell>
            <TableCell>{obj.weight}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(obj._id)}>
                <i className='bi bi-trash'></i>
              </Button>
            </TableCell>
             </TableRow>
        ))}

      </TableBody>
    </Table>
    </div>
  );
}

export default ExerciseTable;