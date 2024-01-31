import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useAsyncList} from "@react-stately/data";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, Button, getKeyValue} from "@nextui-org/react";
// import { list } from 'postcss';


const ExerciseTable = ({ exercise, data, my_list }) => {

  const router = useRouter();

  // console.log("data: ", data);
  // console.log("my_list: ", my_list);

  // const filteredList = my_list.items.filter(obj => obj.exercise === exercise);
  // console.log("filtered list: ", filteredList);
  // console.log("current exercise: ", exercise);

  const [liftingData, setLiftingData] = useState(data);

  // filter the data by exercise, and sort by date
  const filteredData = liftingData.filter(obj => obj.exercise === exercise);
  filteredData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // let list = useAsyncList({

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

  // console.log(my_list);


  return (
    <div style={{borderRadius:'10px', overflow: 'hidden'}}>
      
      <Table 
        aria-label="Example static collection table"
        selectionMode='single'
        sortDescriptor={my_list.sortDescriptor}
        onSortChange={my_list.sort}>
        <TableHeader>
          <TableColumn key="repetitions" allowsSorting>Repetitions</TableColumn>
          <TableColumn key="exercise" allowsSorting>Exercise</TableColumn>
          <TableColumn key="date" allowsSorting>Date</TableColumn>
          <TableColumn key="weight" allowsSorting>Weight</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>

        <TableBody
          items={my_list.items.filter(obj => obj.exercise === exercise)}>
            {(item) => (
              <TableRow key={`${item._id} - ${item.date}`}>
                {(columnKey) => <TableCell> {getKeyValue(item, columnKey)} </TableCell>}
                {/* <TableCell> Hi ! </TableCell> */}
              </TableRow>
            )}

          </TableBody>

        {/* <TableBody>
          {filteredData.map(obj => (
            <TableRow key={`${obj._id}-${obj.date}`}>
               {(columnKey) => <TableCell> {getKeyValue(obj, columnKey)} </TableCell>}
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

        </TableBody> */}

      </Table>
    </div>
  );
}

export default ExerciseTable;