import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import light from '../../img/sun-512.png'
import * as actions from '../../state/actions/index.js';
import './PageNav.sass';

function PageNav({ loading, cardsPerPage, totalPosts }) {
  // React
  const [filter, setFilter] = useState("default");
  const [order, setOrder] = useState("default");
  const [inputData, setInputData] = useState('');
  const [pageNumbers, setPageNumbers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // Redux
  const dispatch = useDispatch();
  const { updateCurrentPage, orFilBy, resetOrFilBy } = bindActionCreators(actions, dispatch);
  const currentPage = useSelector(state => state.recipes.currentPage);
  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / cardsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
    if (filter === "default" && order === "default" && inputData === '') resetOrFilBy()
    else orFilBy(filter, order, inputData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPosts, filter, order, refresh, inputData,]);
  const handleChangeOrder = e => setOrder(e.target.value);
  const handleChangeFilter = e => setFilter(e.target.value);
  const handleReset = () => {
    setFilter("default")
    setOrder("default")
    setInputData('')
    setRefresh(refresh + 1)
  }
  if (loading) {
    return (
    <nav id="nav">
      <NavLink to="/home" id="company">
        <div id="circle"></div>
        <h1 id="myCompany">My company</h1>
      </NavLink>
      <div id="lighter">
        <button id="lightSwitcherr">
          <img id="light" src={light} alt=""></img>
        </button>
      </div>
    </nav>
    );
  } else {
    return (
      <div>
      <nav id='nav'>
        <NavLink to='' id='company'>
          <div id='circle'></div>
          <h1 id='myCompany'>My company</h1>
        </NavLink>
        <div id='end'>
          <button id='lightSwitcher'><img id='light' src={light} alt=''></img></button>
          <input placeholder='Search...' id='searchBar' type="text" value={inputData} onChange={e => setInputData(e.target.value)}></input>
        </div>
      </nav>
      <NavLink id="create" to='/create'>+</NavLink>
      <div id='form'>
        <button id='resetButton' onClick={() => handleReset()}>Reset</button>
        <form>
          <select id="orders" className='decorated' onChange={e => handleChangeOrder(e)} value={order}>
            <option value="default">Order by</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="H">Highest rating</option>
            <option value="L">Lowest rating</option>
          </select>
          <select id="filters" className='decorated' onChange={e => handleChangeFilter(e)} value={filter}>
            <option value="default">Filter type</option>
            <option value="Gluten Free">Gluten Free</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Primal">Primal</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Vegan">Vegan</option>
            <option value="Dairy Free">Dairy Free</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Low FOODMAP">Low FOODMAP</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Paleo">Paleo</option>
            <option value="Whole30">Whole30</option>
          </select>
        </form>
      </div>
        <div className='navtop'>
          {/* <p>{currentPage}</p> */}
          <button className='bf-btn' onClick={() => currentPage > 1 ? updateCurrentPage('prev') : console.log('Que estas haciendo? 🤔')}> Prev </button>
          <ul className="pagination">
            {pageNumbers.map(number => {
              return (
                <li key={number}>
                  <button className={Number(currentPage) === Number(number) ? "page-number-buttons-selected" : "page-number-buttons"} onClick={() => updateCurrentPage(number)}> {number} </button>
                </li>
              );
            })}
          </ul>
          <button className='bf-btn' onClick={() => currentPage !== Math.ceil(totalPosts / cardsPerPage) ? updateCurrentPage('next') : console.log('Que estas haciendo? 🤔')}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
export default PageNav;