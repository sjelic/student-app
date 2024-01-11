import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [korisnicko_ime, postaviKorisnickoIme] = useState("");
    const [sifra, postaviSifru] = useState("");
    const [status, postaviStatus] = useState(-1);
    const [poruka, postaviPoruku] = useState("");
    const navigate = useNavigate();

    const prijavi = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/v1/prijava', {'korisnicko_ime': korisnicko_ime, 'sifra': sifra}).then(
            (token) => {
                localStorage.setItem("jwt", token.data.access_token);
                postaviStatus(200);
                postaviPoruku("Korisnik je uspešno prijavljen");
                setTimeout(() => {postaviStatus(-1); postaviPoruku(""); navigate("/studenti")}, 1000);

            }
        ).catch(
            error => {
                postaviStatus(error.response.status);
                postaviPoruku(error.response.data.message);
                setTimeout(() => {postaviStatus(-1); postaviPoruku("")}, 3000);
            }
        )

    }



    return (
        <div class="container mt-3">
            <h2>Prijava</h2>
            <form>
                <div class="mb-3 mt-3">
                <label for="korisnicko_ime">Korisničko ime:</label>
                <input type="text" class="form-control" id="korisnicko_ime" placeholder="Upišite korisničko ime" name="korisnicko_ime" onChange={(e) => {postaviKorisnickoIme(e.target.value)}}/>
                </div>
                <div class="mb-3">
                <label for="sifra">Šifra:</label>
                <input type="password" class="form-control" id="sifra" placeholder="Upišite šifru" name="sifra" onChange={(e) => {postaviSifru(e.target.value)}}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e) => prijavi(e)}>Prijava</button>
                <br/>
                <br/>
                {(status != 200 && status != -1) ?
                (<div class="alert alert-danger alert-dismissible fade show">
                {poruka}
                </div>) :
                ""}
                {(status == 200 && status != -1) ?
                (<div class="alert alert-success alert-dismissible fade show">
                {poruka}
                </div>) :
                ""}
            </form>
        </div>
    )
}
export default Login;