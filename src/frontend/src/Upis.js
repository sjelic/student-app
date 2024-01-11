import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

const Upis = () => {

    const [studenti, postaviStudente] = useState([]);
    const [predmeti, postaviPredmete] = useState([]);
    const [studentId, postaviIdStudenta] = useState("");
    const [predmetId, postaviIdPredmeta] = useState("");
    const [status, setStatus] = useState(-1);


    const upisiStudenta = async (e) => {
        e.preventDefault();
        try {
            let upis = {
                'student_id': studentId,
                'predmet_id': predmetId
            }
            const podaci = await axios.post('http://localhost:5000/api/v1/upis', upis);
            setStatus(podaci.status);
            setTimeout(() => {setStatus(-1);}, 3000);
            
            
            
        } catch (err) {
            console.log(err.message);
        }
    }

    const dohvatiStudente = async () => {
        const podaci = await axios.get('http://localhost:5000/api/v1/studenti');
        postaviStudente(podaci.data.studenti);
    }

    const dohvatiPredmete = async () => {
        const podaci = await axios.get('http://localhost:5000/api/v1/predmeti');
        postaviPredmete(podaci.data.predmeti);
        console.log(predmeti);
    }
    useEffect( () => {dohvatiStudente(); dohvatiPredmete();}, []);
    return (
        <div className="container mt-3">
            <Header/>
            <br/>
            {
            (status === 200) ?
            (<div class="alert alert-success alert-dismissible fade show">
            Student je upisan.
            </div>) :
            ""
            }
            <form>
                <div className="mb-3 mt-3">
                <label for="student" class="form-label">Student:</label>
                    <select id="student" class="form-select" onChange={(e) => {postaviIdStudenta(e.target.selectedOptions[0].value)}}>
                        {
                            studenti.map(
                                (student) => {
                                    return (
                                        <option value={student.id}>{student.ime} {student.prezime}</option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>

                <div className="mb-3 mt-3">
                <label for="predmet" class="form-label">Predmet:</label>
                    <select id="predmet" class="form-select" onChange={(e) => {postaviIdPredmeta(e.target.selectedOptions[0].value)}}>
                        {
                            predmeti.map(
                                (predmet) => {
                                    return (
                                        <option value={predmet.id}>{predmet.naziv}</option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>

            <button type="submit" className="btn btn-primary" onClick={ (e) => {upisiStudenta(e)}}>Upiši</button>
        </form>

    </div>
    )
}

export default Upis;