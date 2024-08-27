import { Link } from "react-router-dom";

import soporte from "/assets/soporte.svg";
import salir from "/assets/back.svg";


const TablaCirugias = () => {
  return (
    <>
      {/*nav-auditoria*/}

      <section>
        <h1 className="text-color text-4xl mb-4">Módulo Cirugias</h1>
        <nav className="">
          <ol className="mb-2 flex">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cirugias
            </li>
          </ol>
          <div className="pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className=" bg-white p-5 ml-0  mb-11 shadow-lg shadow-indigo-500/40  rounded-md w-full">
        {/*header-table*/}

        <label className="font-bold text-lg text-stone-600">
          Buscar registro Cirugia :
        </label>
        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter flex items-center space-x-2">
            <input
              placeholder=" Consultar Cirugia..."
              className="block  w-[280px] h-10  border-2 rounded-md focus:outline-none focus:ring"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[100px] rounded-md"
            >
              <option value="">Paginas</option>
              <option value="1">10 Paginas</option>
              <option value="2">20 Paginas</option>
              <option value="3">30 Paginas</option>
            </select>
          </div>
        </section>

        <table className="text-sm mx-auto">
          <thead>
            <tr className="text-center">
              <th className="px-4 py-2">Fecha - Hora del Radicado</th>
              <th className="px-4 py-2">N.º Radicado</th>
              <th className="px-4 py-2">N.º Documento</th>
              <th className="px-4 py-2">Nombre Completo</th>
              <th className="px-4 py-2">Nombre Paciente</th>
              <th className="px-4 py-2">Servicio de Radicado</th>
              <th className="px-4 py-2">Fecha Auditoria</th>
              <th className="px-4 py-2">Justificación Auditoria</th>
              <th className="px-4 py-2">Especialidad</th>
              <th className="px-4 py-2">Mostrar</th>
              <th className="px-4 py-2">Servicio Solicitado</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">....texto alusivo</td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button>
                  <img src={soporte} alt="Mostrar" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* pagination */}
      </div>
    </>
  );
};

export default TablaCirugias;
