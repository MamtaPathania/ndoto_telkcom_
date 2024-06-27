import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/category'>categories</Link>
      <Link to='/videos'>single</Link>
    </div>
  )
}

export default Home
