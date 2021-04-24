import React from 'react';
import { useState, useEffect } from 'react';
import { API } from '../data/API';
// import Input from './input';

function ReactTable() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const [sortedField, setSortedField] = useState(null);

  //TODO: Not great - reruns the whole API search in order to sort immediately on click, will fix later
  useEffect(() => {
    const handleSearch = async () => {
      const results = await API.search();
      const resultsData = await results.json();
      const toBeSorted = resultsData.results;
      if (sortedField === 'First') {
        toBeSorted.sort((a, b) => {
          return a.name.first < b.name.first
            ? -1
            : a.name.first > b.name.first
            ? 1
            : 0;
        });
      }
      setItems(toBeSorted);
    };
    handleSearch();
  }, [sortedField]);

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
    console.log(sortedField);
    if (sortedField === 'First') {
      console.log(filtered);
      filtered.sort((a, b) => {
        return a.name.first < b.name.first
          ? -1
          : a.name.first > b.name.first
          ? 1
          : 0;
      });
    }
    setSearch(filtered);
    if (value !== null) {
      setSearchBool(true);
    } else setSearchBool(false);
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
            <th scope='col'>
              <button type='button' onClick={() => setSortedField('Last')}>
                Last
              </button>
            </th>
            <th scope='col'>
              <button type='button' onClick={() => setSortedField('City')}>
                City
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {search.length !== 0 && searchEmployees}
          {search.length === 0 && searchBool === false && listEmployees}
        </tbody>
      </table>
    </>
  );
}
export default ReactTable;
