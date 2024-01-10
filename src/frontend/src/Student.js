import React from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const Student = () => {
    const {studentId} = useParams();
    const [student, postaviStudenta] = useState({});

    const dohvatiStudenta = async () => {
        const podaci = await axios.get('http://localhost:5000/api/v1/studenti/'+studentId);
        postaviStudenta(podaci.data.student);
      }
    useEffect( () => {dohvatiStudenta(); }, []);
    return <div className="container mt-3">
        <Header />
        <br/>
        <div class="card">
            <div class="card-header bg-secondary text-white">Detalji o studentu</div>
            <div class="card-body">
            <table class="table table-borderless">
                <tbody>
                <tr>
                    <td>Ime:</td>
                    <td>{student.ime}</td>
                </tr>
                <tr>
                    <td>Prezime:</td>
                    <td>{student.prezime}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{student.email}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
}

export default Student;
