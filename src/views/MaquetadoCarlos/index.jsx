import ResponsiveAppBar from "../../layouts/Header";
import AccionesLaborales from "../../components/MaquetadoCarlos/AccionesLaborales";
import Documentos from "../../components/MaquetadoCarlos/Documentos";

import ListAL from "../../components/MaquetadoCarlos/AccionesLaborales/List";
import ListDO from "../../components/MaquetadoCarlos/Documentos/List";

const MaquetadoCarlos = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "50px" }}>
          <AccionesLaborales />
          <ListAL />
          <Documentos />
          <ListDO />
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default MaquetadoCarlos;
