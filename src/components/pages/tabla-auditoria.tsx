import { Link } from "react-router-dom";

import soporte from "/assets/soporte.svg";
import mostrar from "/assets/mostrar.svg";
import autorizar from "/assets/autorizar.svg";
import salir from "/assets/back.svg";
import { useFetchAuditoria } from "../../hooks/useFetchUsers";

const TablaAuditoria = () => {
  const { data, loading, error } = useFetchAuditoria();

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/*nav-auditoria*/}

      <section className="dark:bg-gray-900 p-4">
        <h1 className="text-color dark:text-gray-100 text-4xl mb-4">
          Módulo Auditoria
        </h1>
        <nav className="">
          <ol className="mb-2 flex text-gray-700 dark:text-gray-300">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Auditoria
            </li>
          </ol>
          <div className="pb-2 w-10">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className=" bg-white dark:bg-gray-800 p-5 ml-0  mb-11 shadow-lg shadow-indigo-500/40  rounded-md w-full">
        {/*header-table*/}
        <label className="font-bold text-lg text-stone-600 dark:text-stone-300">
          Buscar registro Auditoria :
        </label>
        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter flex items-center space-x-2">
            <input
              placeholder=" Consultar Auditoria..."
              className="block  w-[280px] h-10  border-2 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="1">10 Paginas</option>
              <option value="2">20 Paginas</option>
              <option value="3">30 Paginas</option>
            </select>
            <button className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Ver Autorizaciones
            </button>
          </div>
        </section>

        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-center">
              <th className=" w-[90px]">Fecha Radicados</th>
              <th className=" w-[90px]">Tipo Documento </th>
              <th className=" w-[100px]">Identificacion</th>
              <th className=" w-[90px]">Nombre Completo</th>
              <th className=" w-[90px]">Convenio</th>
              <th className=" w-[70px]">IPS Primaria</th>
              <th className=" w-[90px]">Fecha Orden</th>
              <th className=" w-[100px]">Lugar Radicacion</th>
              <th className=" w-[100px]">IPS Remite</th>
              <th className=" w-[90px]">Profesional</th>
              <th className=" w-[90px]">Especialidad</th>
              <th className=" w-[100px]">Tipo Servicio</th>
              <th className=" w-[90px]">Quien Radica</th>
              <th className=" w-[65px]">Soporte</th>
              <th className=" w-[65px]">Ver Servicios</th>
              <th className=" w-[65px]">Autorizar Servicios</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
            {data.map((auditoria) => (
              <tr>
                <td>
                  {auditoria.radicadoDate
                    ? auditoria.radicadoDate.getTime()
                    : "N/A"}
                </td>
                <td>{auditoria.documentType}</td>
                <td>{auditoria.documentNumber}</td>
                <td>{auditoria.namePatient}</td>
                <td>{auditoria.convenio}</td>
                <td>{auditoria.ipsPrimary}</td>
                <td>{auditoria.orderDate ? auditoria.orderDate.getTime() : "N/A"  }</td>
                <td>{auditoria.place  }</td>
                <td>{auditoria.ipsRemitente  }</td>
                <td>{auditoria.profetional}</td>
                <td>{auditoria.speciality}</td>
                <td>{auditoria.typeServices}</td>
                <td>{auditoria.radicador}</td>
                <td>
                  <img src={soporte} alt="soporte-icon" />
                </td>
                <td>
                  <img src={mostrar} alt="mostrar-icon" />
                </td>
                <td>
                  <img src={autorizar} alt="autorizar-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
      </div>
    </>
  );
};

export default TablaAuditoria;
