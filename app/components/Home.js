var React = require('react');
var Link = require('react-router-dom').Link;

function Home() {
  return (
    <div className='home-container'>
      <h1>GitHub Battle!!</h1>
      <Link className='button' to='/battle'>
        Battle
      </Link>
    </div>
  )
}

module.exports = Home;