import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const Predmeti = () => {
    const [predmet, postaviPredmet] = useState({});
    const [predmeti, postaviPredmete] = useState([]);
    const navigate = useNavigate();

    const dohvatiPredmete = async () => {
        const podaci = await axios.get('http://localhost:5000/api/v1/predmeti');
        postaviPredmete(podaci.data.predmeti);
        console.log(predmeti);
    }

    const unesiPredmet = async (e) => {
        e.preventDefault();
        try {
          
          const data = await axios.post(
            'http://localhost:5000/api/v1/predmeti', predmet
          );
          postaviPredmete([...predmeti, data.data]);
          //console.log(studenti);
        } catch (err) {
          console.log(err.message);
        }
      }

    const promeni = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        postaviPredmet(values => ({...values, [name]: value}));
        console.log(predmet);
      }
    
    const detaljiPredmeta = (p) => {
    navigate("/predmeti/"+p.id)
    }

    useEffect( () => {dohvatiPredmete(); }, []);
    return <div className="container mt-3">
        <Header/>
        <form>
        <div className="mb-3 mt-3">
          <label htmlFor="ime">
            Naziv:
          </label>
          <input type="text" className="form-control" id="naziv" placeholder="Naziv predmeta" name="naziv" value={predmet.naziv} onChange={promeni}/>
        </div>

        <button type="submit" className="btn btn-primary" onClick={ (e) => {unesiPredmet(e)}}>Sačuvaj</button>
      </form>
      <br/>
      <table class="table table-hover">
    <thead>
      <tr>
        <th></th>
        <th>Naziv</th>
      </tr>
    </thead>
    <tbody>
        {
            predmeti.map(
                predmet => {
                    return (
                        <tr>
                            <td className='col-1'><button type='submit' className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faSearch}  onClick={() => detaljiPredmeta(predmet)}/>
                      </button></td>
                            <td>{predmet.naziv}</td>
                        </tr>
                    )
                }
            )
        }
    </tbody>
  </table>

    </div>
}

export default Predmeti;