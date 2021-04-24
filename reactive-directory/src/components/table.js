import React from 'react';
import { useState, useEffect } from 'react';
import { API } from '../data/API';

function ReactTable() {
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    const results = await API.search();
    const resultsData = await results.json();
    setItems(resultsData.results);
  };

  useEffect(() => {
    handleSearch();
  }, []);
  console.log(items);

  function TableEmployee(props) {
    return (
      <tbody>
        <tr>
          <th scope='row'>{props.data.index}</th>
          <td>
            <img
              src={props.data.picture.thumbnail}
              alt='employee thumbnail'
            ></img>
          </td>
          <td>{props.data.name.first}</td>
          <td>{props.data.name.last}</td>
          <td>{props.data.location.city}</td>
        </tr>
      </tbody>
    );
  }
  let index = 0;
  const listEmployees = items.map((employee) => {
    index += 1;
    Object.assign(employee, { index: index });
    return <TableEmployee data={employee} />;
  });

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Picture</th>
          <th scope='col'>First</th>
          <th scope='col'>Last</th>
          <th scope='col'>City</th>
        </tr>
      </thead>
      {listEmployees}
    </table>
  );
}
export default ReactTable;
