import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Axios from "axios";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

function App() {
  // definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      // Promise para ejecutar multiples api al mismo tiempo
      const [letra, informacion] = await Promise.all([Axios(url), Axios(url2)]);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);

      // guardarLetra(resultado.data.lyrics);
    };
    consultarApiLetra();
  }, [busquedaletra, info]);

  return (
    <>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
