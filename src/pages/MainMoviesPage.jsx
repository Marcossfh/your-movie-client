import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function MainMoviesPage() {
  const [data, setData] = useState(null);

  return (
    <div>
      <h3>CREA Y VISITA PELIS MOLONAS</h3>

      <Link to="/terror-page">PELIS DE TERROR</Link>
      <br />
      <Link to="/syfy-page">PELIS DE SYFY</Link>
      <br />
      <Link to="/create-movies-page">CREA TU PELI</Link>
    </div>
  );
}

export default MainMoviesPage;
