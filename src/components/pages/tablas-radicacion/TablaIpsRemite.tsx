//*Funciones y Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import ModalAction from "../modals/ModalAction";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import { useFetchIpsRemite } from "../../../hooks/useFetchUsers";
//*Icons
import salir from "/assets/back.svg";
import ModalAgregarDato from "../modals/ModalAgregarDato";

const ITEMS_PER_PAGE = 8;

const TablaIpsRemite = () => {
  const { data, loading, error } = useFetchIpsRemite();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
    "id",
    "name",
    "status",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>;

  return (
    <>
      {/* nav-table */}

      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo IPS Remite
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio IPS Remite
            </li>
          </ol>
          <div className="w-10 pb-2">
            <img
              src={salir}
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar IPS Remite :
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
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <ModalAgregarDato name="IPS Remite" endPoint="ips-remite" />
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <table className="w-full mx-auto text-sm text-center dark:text-gray-200">
              <thead>
                <tr className="text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                  <th className=" w-[60px]">ID</th>
                  <th className=" w-[200px]">Nombre IPS Remite</th>
                  <th className=" w-[100px]">Estado</th>
                  <th className=" w-[80px]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentData().map((ips) => (
                  <tr key={ips.id}>
                    <td>{ips.id}</td>
                    <td>{ips.name}</td>
                    <td>{ips.status ? "Activo" : "Inactivo"} </td>
                    <td>
                      <ModalAction
                        name="IPS Remite"
                        id={ips.id}
                        endPoint="update-status-ips-remite"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>‎ </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </>
        )}
      </section>
    </>
  );
};

export default TablaIpsRemite;
