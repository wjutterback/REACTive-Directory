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
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>First</th>
          <th scope='col'>Last</th>
          <th scope='col'>Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
}
export default ReactTable;
