import React from "react";

const Login = () => {
    return (
        <div class="container mt-3">
            <h2>Prijava</h2>
            <form>
                <div class="mb-3 mt-3">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Upišite email" name="email"/>
                </div>
                <div class="mb-3">
                <label for="pwd">Šifra:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Upišite šifru" name="pswd"/>
                </div>
                <div class="form-check mb-3">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" name="remember"/> Zapamti
                </label>
                </div>
                <button type="submit" class="btn btn-primary">Prijava</button>
            </form>
        </div>
    )
}
export default Login;