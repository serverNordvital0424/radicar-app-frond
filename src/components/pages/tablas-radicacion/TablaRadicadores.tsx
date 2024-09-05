//*Funciones y Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import ModalAction from "../modals/ModalAction";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../LoadingSpinner";
import ModalRadicador from "../modals/ModalRadicador";
import usePagination from "../../../hooks/usePagination";
import { useFetchRadicador } from "../../../hooks/useFetchUsers";
//*Icons
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 10;

const TablaRadicadores = () => {
  const { data, loading, error } = useFetchRadicador();
  const [itemPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch(data, [
    "id",
    "name",
    "status",
  ]);
  const { currentPage, totalPages, paginate, currentData } = usePagination(
    filteredData,
    itemPerPage
  );

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {/* nav-table */}

      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Radicadores
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Radicadores
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt="" />
            </Link>
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Radicador :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-1 space-x-2">
            <select
              name=""
              id=""
              value={itemPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-[40px] w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">PAGES</option>
              <option value="10">10 PAGES</option>
              <option value="20">20 PAGES</option>
              <option value="30">30 PAGES</option>
            </select>
            {/* <button className="borde-2 w-[150px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Agregar Radicador
            </button> */}
            <ModalRadicador></ModalRadicador>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <table className="w-full mx-auto text-sm ">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                  <th className=" w-[80px]">ID</th>
                  <th className=" w-[600px] ">Nombre Prestador</th>
                  <th className=" w-[150px]">Estado</th>
                  <th className=" w-[150px]">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center  dark:text-gray-200">
                {currentData().map((radicador) => (
                  <tr>
                    <td>{radicador.id}</td>
                    <td>{radicador.name}</td>
                    <td>{radicador.status ? "Activo" : "Inactivo"}</td>
                    <td>
                      <ModalAction nom="Radicadores" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Controles de Paginacion */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </>
        )}
      </section>
    </>
  );
};

export default TablaRadicadores;