import React from 'react';
import { useState, useEffect } from 'react';
import { API } from '../data/API';
// import Input from './input';

function ReactTable() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [sortedField, setSortedField] = useState(null);

  const handleSearch = async () => {
    const results = await API.search();
    const resultsData = await results.json();
    setItems(resultsData.results);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {});

  function TableEmployee({ data }) {
    return (
      <tr>
        <th scope='row'>{data.index}</th>
        <td>
          <img src={data.picture.thumbnail} alt='employee thumbnail'></img>
        </td>
        <td>{data.name.first}</td>
        <td>{data.name.last}</td>
        <td>{data.location.city}</td>
      </tr>
    );
  }

  function handleInputChange({ target }) {
    let value = target.value.toLowerCase();
    let filtered = items.filter((employee) => {
      return (
        employee.name.first.toLowerCase().indexOf(value) !== -1 ||
        employee.name.last.toLowerCase().indexOf(value) !== -1 ||
        employee.location.city.toLowerCase().indexOf(value) !== -1
      );
    });
    console.log(filtered);
    //TODO: Filter cannot be undone due to overwriting state (using setItems)
    // setItems(filtered);
    setSearch(filtered);
    //with setSearch get div cannot be a child of tr
  }

  let index = 0;
  let searchEmployees = search.map((employee) => {
    index += 1;
    Object.assign(employee, { index: index });
    return <TableEmployee key={employee.cell} data={employee} />;
  });

  index = 0;
  let listEmployees = items.map((employee) => {
    index += 1;
    Object.assign(employee, { index: index });
    return <TableEmployee key={employee.cell} data={employee} />;
  });

  return (
    <>
      <div className='form-outline'>
        <input
          type='search'
          id='form1'
          className='form-control'
          placeholder='Search Employees'
          aria-label='Search'
          onChange={handleInputChange}
        />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Picture</th>
            <th scope='col'>
              <button type='button' onClick={() => setSortedField('First')}>
                First
              </button>
            </th>
            <th scope='col'>Last</th>
            <th scope='col'>City</th>
          </tr>
        </thead>
        <tbody>
          {search.length !== 0 && searchEmployees}
          {search.length === 0 && listEmployees}
        </tbody>
      </table>
    </>
  );
}
export default ReactTable;
