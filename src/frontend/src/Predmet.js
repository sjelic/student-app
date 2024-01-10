import React from "react";
import { useParams } from "react-router-dom";

const Predmet = () => {
    const {predmetId} = useParams();
    return (
        <div>
            <h1>Predmet ID: {predmetId}</h1>
        </div>
    )
}

export default Predmet;