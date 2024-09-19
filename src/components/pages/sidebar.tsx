//*Funciones y Hooks
import { FC, useRef, useState, useEffect } from "react";
import Modal from "./modals/ModalReporte";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

//*Icons
import home from "/assets/home.svg";
import flag from "/assets/flag.svg";
import user from "/assets/user.svg";
import user2 from "/assets/user2.svg";
import user1 from "/assets/user1.svg";
import audit from "/assets/audit.svg";
import table from "/assets/table.svg";
import arrow from "/assets/arrow.svg";
import folder from "/assets/folder.svg";
import report from "/assets/report.svg";
import filing from "/assets/filing.svg";
import surgery from "/assets/surgery.svg";
import arrowUp from "/assets/arrow-up.svg";
import userMain from "/assets/userMain.svg";
import services from "/assets/services.svg";
import taskList from "/assets/task-list.svg";

const SideBar: FC = () => {
  //*constante para slide del sidebar y funciones
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //*Variables para identificación de la tabla
  const [openAccordions, setOpenAccordions] = useState({
    services: false,
    quality: false,
    reports: false,
    tablets: false,
    admin: false,
  });
  //*constante para el acordion del sidebar
  const accordionRef = useRef<HTMLDivElement>(null);
  //*constantes y modulos
  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //*Accede al rol del usuario
  const { rol } = useAuth(); // <! ITERA ROLES DESDE LOGIN !>

  //*Funcion para hacer el color de los botones del sidebar
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
      : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white";
  };
  //*Funcion para manejar la logica del sidebar
  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (accordionRef.current) {
      accordionRef.current.style.maxHeight = openAccordions.quality
        ? `${accordionRef.current.scrollHeight}px`
        : "0px";
    }
  }, [openAccordions.quality]);

  return (
    <aside
      className={`flex flex-col h-full transition-all duration-500 ease-in-out overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l bg-white dark:bg-gray-800 dark:border-gray-700 ${
        isCollapsed ? "w-28" : "w-64 absolute"
      } h-full px-4 py-8 overflow-y-auto border-r border-gray-200 rtl:border-r-0 rtl:border-l bg-white dark:bg-gray-800 dark:border-gray-700 `}
    >
      <div>
        <button
          onClick={toggleSideBar}
          className="mb-4 text-gray-600 transition-all duration-300 dark:text-gray-900 group"
        >
          <img
            src={arrow}
            alt=""
            className={`mx-1 transition-all duration-500 dark:bg-white dark:rounded-full dark:px-1 dark:py-1 bg-gray-300 px-1 py-1 rounded-full ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1 gap-3 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-4">
            {!isCollapsed && (
              <label className="px-2 text-lg font-bold text-[#049AE7] uppercase">
                Servicios
              </label>
            )}
            <NavLink to="/home">
              {({ isActive }) => (
                <div
                  className={`flex items-center px-3 py-2 transition-colors duration-500 transform rounded-lg group relative ${getLinkClass(
                    "/home"
                  )} ${
                    isActive
                      ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                      : ""
                  }`}
                >
                  <img
                    src={home}
                    alt=""
                    className="w-5 h-5 group-hover:invert dark:invert"
                  />
                  {!isCollapsed && (
                    <span
                      className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                        isActive
                          ? "text-white dark:text-gray-200"
                          : "group-hover:text-white dark:group-hover:text-gray-200"
                      }`}
                    >
                      Inicio
                    </span>
                  )}
                  {isCollapsed && (
                    <span
                      className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                      style={{ top: "70%", transform: "translateX(-10%)" }}
                    >
                      Inicio
                    </span>
                  )}
                </div>
              )}
            </NavLink>

            {/* Modulo de acordion 2*/}
            {/* < -- MODULO GESTION CALIDAD -- > */}
            <div className="space-y-3">
              <div>
                <button
                  onClick={() => toggleAccordion("quality")}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                    openAccordions.quality
                      ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                  } w-full`}
                >
                  <img
                    src={folder}
                    alt=""
                    className={`w-5 h-5 ${
                      openAccordions.quality
                        ? "invert"
                        : "group-hover:invert dark:invert"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75]  ${
                        openAccordions.quality
                          ? "text-white dark:text-gray-200"
                          : ""
                      }`}
                    >
                      Gestión de Calidad
                    </span>
                  )}
                  {isCollapsed && (
                    <span
                      className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                      style={{ top: "70%", transform: "translateX(-24%)" }}
                    >
                      Calidad
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                      openAccordions.quality ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.quality && (
                  <div className="mt-2 space-y-3">
                    <NavLink to="/SistemGestionCalidad">
                      {({ isActive }) => (
                        <div
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                            isActive
                              ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                              : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                          }`}
                        >
                          <img
                            src={flag}
                            alt=""
                            className={`w-5 h-5 mx-2 ${
                              isActive
                                ? "invert"
                                : "group-hover:invert dark:invert"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                isActive ? "text-white dark:text-gray-200" : ""
                              }`}
                            >
                              Norte de Santander
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/*  MODULO GESTION SERVICIOS  */}
            {[10, 3, 1].includes(Number(rol)) && (
              <div>
                <button
                  onClick={() => toggleAccordion("services")}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                    openAccordions.services
                      ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                  } w-full`}
                >
                  <img
                    src={services}
                    alt=""
                    className={`w-5 h-5 ${
                      openAccordions.services
                        ? "invert"
                        : "group-hover:invert dark:invert"
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                        openAccordions.services
                          ? "text-white dark:text-gray-200"
                          : ""
                      }`}
                    >
                      Gestión de Servicios
                    </span>
                  )}
                  {isCollapsed && (
                    <span
                      className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                      style={{ top: "70%", transform: "translateX(-35%)" }}
                    >
                      Servicios
                    </span>
                  )}
                  <img
                    src={arrowUp}
                    alt=""
                    className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                      openAccordions.services ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordions.services && (
                  <div className="mt-2 space-y-3">
                    {[10, 3, 1].includes(Number(rol)) && (
                      <NavLink to="/tabla-radicacion">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={taskList}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Radicador
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(-35%)",
                                }}
                              >
                                Radicador
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    )}
                    <div></div>
                    {[10, 15, 1].includes(Number(rol)) && (
                      <NavLink to="/tabla-cirugias">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={surgery}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Cirugía
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(-15%)",
                                }}
                              >
                                Cirugía
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    )}
                    <div></div>
                    {[3, 1].includes(Number(rol)) && (
                      <NavLink to="/tabla-auditoria">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={audit}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Auditoría
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(-28%)",
                                }}
                              >
                                Auditoría
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* MODULO GESTION REPORTES  */}
            {[6, 2, 14, 3, 15, 1].includes(Number(rol)) && (
              <div className="space-y-3">
                <div>
                  <button
                    onClick={() => toggleAccordion("reports")}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      openAccordions.reports
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                    } w-full`}
                  >
                    {/* Icono y texto para el tercer acordeón */}
                    <img
                      src={filing}
                      alt=""
                      className={`w-5 h-5 ${
                        openAccordions.reports
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                          openAccordions.reports
                            ? "text-white dark:text-gray-200"
                            : ""
                        }`}
                      >
                        Gestión de Reportes
                      </span>
                    )}
                    {isCollapsed && (
                      <span
                        className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                        style={{ top: "70%", transform: "translateX(-35%)" }}
                      >
                        Reportes
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 dark:invert ${
                        openAccordions.reports ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.reports && (
                    <div className="mt-2 space-y-3">
                      <button
                        onClick={openModal}
                        className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                          openAccordions.quality
                            ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                            : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                        } w-full`}
                      >
                        <img
                          src={report}
                          alt=""
                          className="w-5 h-5 mx-2 group-hover:invert dark:invert"
                        />
                        {!isCollapsed && (
                          <span className="text-sm font-medium whitespace-nowrap stroke-inherit">
                            Reporte de Radicación
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Component */}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              formType={"Autorizacion"}
            />
            {/* MODULO TABLAS RADICACION */}
            {[1].includes(Number(rol)) && (
              <div className="space-y-3">
                <div>
                  <button
                    onClick={() => toggleAccordion("tablets")}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      openAccordions.tablets
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white"
                    } w-full`}
                  >
                    {/* Icono y texto para el cuarto acordeón */}
                    <img
                      src={table}
                      alt=""
                      className={`w-5 h-5 ${
                        openAccordions.tablets
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`absolute left-8 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                          openAccordions.tablets
                            ? "text-white dark:text-gray-200"
                            : "group-hover:text-white dark:group-hover:text-gray-200"
                        }`}
                      >
                        Tabla Radicación
                      </span>
                    )}
                    {isCollapsed && (
                      <span
                        className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                        style={{ top: "70%", transform: "translateX(-20%)" }}
                      >
                        Tablas
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                        openAccordions.tablets ? "rotate-180" : ""
                      } dark:invert`}
                    />
                  </button>

                  {openAccordions.tablets && (
                    <div className="mt-2 space-y-3">
                      {/* Tabla radicación Cups */}
                      <NavLink to="/tabla-cups">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Cups
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Pacientes */}
                      <NavLink to="/tabla-pacientes">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Pacientes
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Radicadores */}
                      <NavLink to="/tabla-radicadores">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Radicadores
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Municipios */}
                      <NavLink to="/tabla-municipios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Municipios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Convenios */}
                      <NavLink to="/tabla-convenios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Convenios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Tipo Documento */}
                      <NavLink to="/tabla-tipo-documento">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Tipo Documento
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación IPS Primaria */}
                      <NavLink to="/tabla-ips-primaria">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                IPS Primaria
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Lugar Radicación */}
                      <NavLink to="/tabla-lugar-radicacion">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Lugar Radicación
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación IPS Remitente */}
                      <NavLink to="/tabla-ips-remite">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                IPS Remitente
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Especialidad */}
                      <NavLink to="/tabla-especialidad">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Especialidad
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      {/* Tabla radicación Tipo Servicio */}
                      <NavLink to="/tabla-tipo-servicio">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white"
                            }`}
                          >
                            <img
                              src={report}
                              alt=""
                              className={`w-5 h-5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : "group-hover:text-white dark:group-hover:text-gray-200"
                                }`}
                              >
                                Tipo Servicio
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/*Tabla Configuraciones*/}
          <div className="flex flex-col mx-3 space-y-3">
            {!isCollapsed && (
              <label className="-px-2 text-lg font-bold text-[#049AE7] uppercase dark:text-[#4F9BDC]">
                Configuraciones
              </label>
            )}

            {/* Tabla Configuraciones 1 */}
            {/* < -- MODULO ADIM (PERFIL) -- > */}
            {[1].includes(Number(rol)) && (
              <div className="flex flex-col -mx-3 space-y-3">
                <div>
                  <button
                    onClick={() => toggleAccordion("admin")}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                      openAccordions.admin
                        ? "bg-color text-white dark:bg-gray-700 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-200 hover:bg-color hover:text-white dark:hover:bg-gray-600"
                    } w-full`}
                  >
                    <img
                      src={userMain}
                      alt=""
                      className={`w-5 h-5 ${
                        openAccordions.admin
                          ? "invert"
                          : "group-hover:invert dark:invert"
                      }`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`absolute left-9 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                          openAccordions.admin
                            ? "text-white dark:text-gray-200"
                            : "group-hover:text-white dark:group-hover:text-gray-200"
                        }`}
                      >
                        Administrador
                      </span>
                    )}
                    {isCollapsed && (
                      <span
                        className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                        style={{ top: "70%", transform: "translateX(-30%)" }}
                      >
                        Usuario
                      </span>
                    )}
                    <img
                      src={arrowUp}
                      alt=""
                      className={`w-6 h-6 ml-auto transition-transform duration-300 ${
                        openAccordions.admin ? "rotate-180" : ""
                      } dark:invert`}
                    />
                  </button>
                  {openAccordions.admin && (
                    <div className="mt-2 space-y-3">
                      <NavLink to="/Perfil">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user}
                              alt=""
                              className={`w-5.8 h-5.5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-10 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Mi Perfil
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(1.6%)",
                                }}
                              >
                                Perfil
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      <NavLink to="/Usuarios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user1}
                              alt=""
                              className={`w-5.8 h-5.5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-10 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Usuarios
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(-28%)",
                                }}
                              >
                                Usuarios
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                      <div></div>
                      <NavLink to="/registrar-usuarios">
                        {({ isActive }) => (
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 transform group ${
                              isActive
                                ? "bg-color2 text-white dark:bg-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-200 hover:bg-color2 hover:text-white dark:hover:bg-gray-600"
                            }`}
                          >
                            <img
                              src={user2}
                              alt=""
                              className={`w-5.5 h-5.5 mx-2 ${
                                isActive
                                  ? "invert"
                                  : "group-hover:invert dark:invert"
                              }`}
                            />
                            {!isCollapsed && (
                              <span
                                className={`absolute left-10 mx-2 text-sm font-medium whitespace-nowrap stroke-inherit stroke-[0.75] ${
                                  isActive
                                    ? "text-white dark:text-gray-200"
                                    : ""
                                }`}
                              >
                                Registrar Usuarios
                              </span>
                            )}
                            {isCollapsed && (
                              <span
                                className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 dark:bg-gray-500 left-14 group-hover:opacity-100"
                                style={{
                                  top: "70%",
                                  transform: "translateX(-30%)",
                                }}
                              >
                                Registrar
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
