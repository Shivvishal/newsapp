import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div style={{marginBottom:'90px'}}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(55, 72, 97)" }}>
        <div className="container-fluid">
          <img src="https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157248.jpg?semt=ais_country_boost&w=740" alt="" height={"60px"} width={"60px"} border-radius="50%" />
          <a className="navbar-brand" href="#" >News App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent" >
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item ">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item"> <Link className="nav-link active" to="/busniess">Business</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/general">General</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/health">Health</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/science">Science</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/sports">Sports</Link></li>
              <li className="nav-item"> <Link className="nav-link active" to="/technology">Technology</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
