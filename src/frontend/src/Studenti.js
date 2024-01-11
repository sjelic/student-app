import React from "react";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000";

const Studenti = () => {
  const [studenti, postaviStudente] = useState([]);
  const [student, postaviStudenta] = useState({});
  const [studentId, postaviStudentId] = useState(null);
  const [mode, postaviMode] = useState("unos");
  const navigate = useNavigate();

  const dohvatiStudente = async () => {
    const podaci = await axios.get('http://localhost:5000/api/v1/studenti');
    const studenti = podaci.data.studenti;
    postaviStudente(studenti);
  }

  const pokreniPromenu = (s) => {
    postaviStudenta(s);
    postaviStudentId(s.id);
    postaviMode('promena');
  }

  const detaljiStudenta = (s) => {
    navigate("/studenti/"+s.id)
  }

  const promeniStudenta = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/api/v1/studenti/${studentId}`, student);
  
      const ss = studenti.map(s => 
        {
          if (s.id === studentId)
          {
            return data.data.student;
          }
          else{
            return s;
          }
        });
      postaviStudente(ss);
      postaviStudenta({});
      postaviMode('unos');
      
    } catch(err)
    {
      console.log(err.message);
    }
  }


  const unesiStudenta = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://localhost:5000/api/v1/studenti',
      student,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    ).then(
      (data) => {
        postaviStudente([...studenti, data.data]);
      }
    );
  }
  const promeni = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviStudenta(values => ({...values, [name]: value}));
    console.log(student);
  }

  useEffect( () => {dohvatiStudente(); }, []);
  //console.log(studenti);
  return (
    
    <div className="container mt-3">
    <Header/>
      <h2>Upis studenta</h2>
      
      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="ime">
            Ime:
          </label>
          <input type="text" className="form-control" id="ime" placeholder="Upišite ime" name="ime" value={student.ime} onChange={promeni}/>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="prezime">
            Prezime:
          </label>
          <input type="text" className="form-control" id="prezime" placeholder="Upišite prezime" name="prezime" value={student.prezime} onChange={promeni}/>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="email">
            Email:
          </label>
          <input type="text" className="form-control" id="email" placeholder="Upišite email" name="email" value={student?.email} onChange={promeni}/>
        </div>

        <button type="submit" className="btn btn-primary" onClick={
          (e) => { mode === 'unos' ? unesiStudenta(e) : promeniStudenta(e)} 
        }>Sačuvaj</button>
      </form>
      <br/>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {
            studenti.map(
              student => {
                return(
                  <tr>
                    <td className='col-2'>
                      <button type='submit' className='btn btn-secondary btn-sm' onClick={() => pokreniPromenu(student)}><FontAwesomeIcon icon={faEdit} /></button> &nbsp;
                      <button type='submit' className='btn btn-danger btn-sm'><FontAwesomeIcon icon={faTrashAlt} />
                      </button> &nbsp;
                      <button type='submit' className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faSearch}  onClick={() => detaljiStudenta(student)}/>
                      </button>
                    </td>
                    <td>{student.ime}</td>
                    <td>{student.prezime}</td>
                    <td>{student.email}</td>

                  </tr>
                )

              }
            )
          }
        </tbody>

      </table>
    </div>
  );
}

export default Studenti;
