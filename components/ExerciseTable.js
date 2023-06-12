import React from 'react';

const ExerciseTable = ({ exercise, data }) => {
  const filteredData = data.filter(obj => obj.exercise === exercise);

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Repetitions</th>
          <th>Exercise</th>
          <th>Date</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(obj => (
          <tr key={`${obj._id}-${obj.date}`}>
            <td>{obj.repetitions}</td>
            <td>{obj.exercise}</td>
            <td>{obj.date}</td>
            <td>{obj.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseTable;