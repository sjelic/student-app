import React from "react";

const Registracija = () => {
    return (
        <div class="container mt-3">
            <h2>Registracija</h2>
            <form>
                <div class="mb-3 mt-3">
                <label for="ime">Ime:</label>
                <input type="text" class="form-control" id="ime" placeholder="Upišite ime" name="ime"/>
                </div>

                <div class="mb-3 mt-3">
                <label for="prezime">Prezime:</label>
                <input type="text" class="form-control" id="prezime" placeholder="Upišite prezime" name="prezime"/>
                </div>

                <div class="mb-3 mt-3">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Upišite email" name="email"/>
                </div>
                <div class="mb-3 mt-3">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Upišite email" name="email"/>
                </div>
                <div class="mb-3">
                <label for="pwd">Šifra:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Upišite šifru" name="pswd"/>
                </div>
                <div class="mb-3">
                <label for="pwdagain">Ponovite šifru:</label>
                <input type="password" class="form-control" id="pwdagain" placeholder="Upišite šifru" name="pswdagain"/>
                </div>

                <button type="submit" class="btn btn-primary">Pošalji</button>
            </form>
        </div>
    )
}
export default Registracija;