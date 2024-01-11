import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const Registracija = () => {
    const [korisnik, postaviKorisnika] = useState({});
    const [status, setStatus] = useState(-1);

    const registruj = async (e) => {
        e.preventDefault();
        try {
          
          const data = await axios.post(
            'http://localhost:5000/api/v1/registracija', korisnik
          );
          setStatus(data.status);
          setTimeout(() => {setStatus(-1);}, 3000);
        } catch (err) {
          console.log(err.message);
        }
      }

    const postavi = (e) =>
    {
        const name = e.target.name;
        const value = e.target.value;
        postaviKorisnika(values => ({...values, [name]: value}));
    }


    return (
        <div class="container mt-3">
            <h2>Registracija</h2>
            <form>
                <div class="mb-3 mt-3">
                <label for="ime">Ime:</label>
                <input type="text" class="form-control" id="ime" placeholder="Upišite ime" name="ime" onChange={postavi}/>
                </div>

                <div class="mb-3 mt-3">
                <label for="prezime">Prezime:</label>
                <input type="text" class="form-control" id="prezime" placeholder="Upišite prezime" name="prezime" onChange={postavi}/>
                </div>

                <div class="mb-3 mt-3">
                <label for="korisnicko_ime">Korisničko ime:</label>
                <input type="text" class="form-control" id="korisnicko_ime" placeholder="Upišite korisničko ime" name="korisnicko_ime" onChange={postavi}/>
                </div>
                <div class="mb-3">
                <label for="sifra">Šifra:</label>
                <input type="password" class="form-control" id="sifra" placeholder="Upišite šifru" name="sifra" onChange={postavi}/>
                </div>

                <button type="submit" class="btn btn-primary" onClick={(e) => registruj(e)}>Pošalji</button>
            </form>
            <br/>
            {
            (status == 200) ?
            (<div class="alert alert-success alert-dismissible fade show">
            Korisnik je uspešno registrovan.
            </div>) :
            ""
            }
        </div>
    )
}
export default Registracija;