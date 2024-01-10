import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link"> Početna stranica</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/studenti" className="nav-link">Studenti</NavLink>
                </li>

                <li className="nav-item">
                   <NavLink to="/predmeti" className="nav-link">Predmeti</NavLink>
                </li>
                </ul>
            </div>
            
            <div>
                <button class="btn btn-primary" type="button" onClick={()=> {navigate('/auth/registracija')}}>Registracija</button>
            </div>
            &
            <div>
                <button class="btn btn-primary" type="button" onClick={()=> {navigate('/auth/prijava')}}>Prijava</button>
            </div>
            &
        </nav>
    )
}

export default Header;