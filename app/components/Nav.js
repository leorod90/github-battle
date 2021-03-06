var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return(
    <ul className='nav'>
      <li>
        <NavLink exact to='/' activeClassName='active'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/battle' activeClassName='active'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink to='/popular' activeClassName='active'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;