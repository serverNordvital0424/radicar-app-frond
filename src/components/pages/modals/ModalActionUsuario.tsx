//*Funciones y Hooks
import React, { useEffect, useState, useMemo } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useFetchDocumento,
  useFetchMunicipio,
  useFetchRoles,
} from "../../../hooks/useFetchUsers";
import { IUsuarios } from "../../../models/IUsuarios";
import { updateUsuarios } from "../../../services/updarteUsuarios";

//*Icons
import { MapPinIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface ModalActionUsuarioProps {
  id: number;
  //   update: boolean;
  ususario: IUsuarios | null;
}

const ModalActionUsuario: React.FC<ModalActionUsuarioProps> = ({
  id,
  ususario,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const [load, setLoad] = useState(false);

  //hook para traer los tipos de documentos
  const { dataDocumento, errorDocumento } = useFetchDocumento(load);

  // hook para traer los roles
  const { dataRol, errorRol } = useFetchRoles(load);

  // hook para traer  las municipios
  const { municipios, errorMunicipios } = useFetchMunicipio(load);

  useEffect(() => {
    if (isOpen) {
      setLoad(true);
    }
  }, [isOpen]);

  const validationSchema = useMemo(()=> Yup.object({
    tipoDocumento: Yup.string().required("El tipo de documento es obligatorio"),
    correo: Yup.string().required("El correo es obligatorio"),
    identificacion: Yup.string()
      .required("La identificación es obligatoria")
      .min(5, "La identificación debe tener al menos 5 caracteres")
      .max(11, "La identificación debe tener como máximo 15 caracteres"),
    nombres: Yup.string()
      .required("El nombre completo es obligatorio")
      .min(2, "El nombre completo debe tener al menos 2 caracteres")
      .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
    apellidos: Yup.string()
      .required("El nombre completo es obligatorio")
      .min(2, "El nombre completo debe tener al menos 2 caracteres")
      .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
    rol: Yup.string().required("El rol es obligatorio"),
    municipio: Yup.string().required("El municipio es obligatorio"),
    contrasena: Yup.string()
      .optional()
      .min(8, "Debe tener minimo 8 caracteres")
      .max(150, "Debe tener máximo 150 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)"
      ),
    status: Yup.string().required("El estado es obligatorio")
  }), []);

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      correo: "",
      identificacion: "",
      nombres: "",
      apellidos: "",
      rol: "",
      municipio: "",
      contrasena: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("dniType", values.tipoDocumento);
        formData.append("email", values.correo);
        formData.append("dniNumber", values.identificacion);
        formData.append("name", values.nombres);
        formData.append("lastName", values.apellidos);
        formData.append("rol", values.rol);
        formData.append("municipio", values.municipio);
        formData.append("password", values.contrasena);
        formData.append("status", values.status);

        const response = await updateUsuarios(id, formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setIsOpen(false);
            // window.location.reload();
          }, 2000);
        } else {
          setSuccess(false);
          setError("Ocurrió un error al intentar actualizar el usuario");
        }
      } catch (error) {
        setSuccess(false);
        setError(`Ocurrió un error al intentar guardar el cups ${error}`);
      }
    },
  });
  // console.log(formik.errors)

  useEffect(() => {
    if (ususario) {
      formik.setValues({
        tipoDocumento: ususario.idDocumento.toString(),
        correo: ususario.email,
        identificacion: ususario.dniNumber.toString(),
        nombres: ususario.name,
        apellidos: ususario.lastName,
        rol: ususario.idRol.toString(),
        municipio: ususario.idMunicipio.toString(),
        contrasena: "",
        status: ususario.status ? "1" : "0",
      });
    }
  }, [ususario]);

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (errorDocumento) return <p>Error al cargar los tipos de documentos</p>;
  if (errorMunicipios) return <p>Error al cargar los convenios</p>;
  if (errorRol) return <p>Error al cargar las ips primarias</p>;

  return (
    <>
      <button
        type="button"
        className={`border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900  ${
          showAnimation && !closing ? "opacity-100" : "opacity-100"
        }`}
        onClick={toggleModal}
      >
        Actualizar
      </button>
      {isOpen && (
        <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
            onClick={toggleModal}
          ></div>

          {/* Contenido del Formulario */}
          <section>
            <div
              className={`z-10 w-[900px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Datos Usuario
                </h1>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 hover:bg-gray-300 dark:hover:text-gray-900 hover:text-gray-900 w-7 h-7"
                >
                  &times;
                </button>
              </div>

              {/* Contenido del formulario */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-6 p-4">
                  <div className="flex items-center">
                    <InformationCircleIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                    <h2 className="pl-1 text-xl text-color dark:text-white">
                      Datos Personales:
                    </h2>
                  </div>
                  {/* USER NAMES */}
                  <div className="grid grid-cols-2 gap-2 px-3">
                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Nombres
                      </label>
                      <input
                        name="nombres"
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Ingrese Nombres..."
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.nombres && formik.errors.nombres
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.nombres && formik.errors.nombres ? (
                        <label className="text-red-500">
                          {formik.errors.nombres}
                        </label>
                      ) : null}
                    </div>
                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Apellidos
                      </label>
                      <input
                        name="apellidos"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Ingrese Apellidos..."
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.apellidos && formik.errors.apellidos
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.apellidos && formik.errors.apellidos ? (
                        <label className="text-red-500">
                          {formik.errors.apellidos}
                        </label>
                      ) : null}
                    </div>
                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Tipo Documento
                      </label>
                      <select
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.tipoDocumento &&
                          formik.errors.tipoDocumento
                            ? "border-red-500 dark:border-red-500"
                            : "dark:border-gray-600 border-gray-200"
                        }`}
                        name="tipoDocumento"
                        value={formik.values.tipoDocumento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">SELECCIONE</option>
                        {dataDocumento.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.tipoDocumento &&
                      formik.errors.tipoDocumento ? (
                        <label className="text-red-500">
                          {formik.errors.tipoDocumento}
                        </label>
                      ) : null}
                    </div>

                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Numero Cedula
                      </label>
                      <input
                        name="identificacion"
                        value={formik.values.identificacion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        placeholder="Ingrese Identificación..."
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.identificacion &&
                          formik.errors.identificacion
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.identificacion &&
                      formik.errors.identificacion ? (
                        <label className="text-red-500">
                          {formik.errors.identificacion}
                        </label>
                      ) : null}
                    </div>
                  </div>
                  {/* USER MAIL AND DATES */}
                  <div className="flex items-center">
                    <IdentificationIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                    <h2 className="pl-2 text-xl text-color dark:text-gray-100">
                      Contacto:
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3 px-3">
                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Correo Electrónico
                      </label>
                      <input
                        type="mail"
                        placeholder="Ingresa Correo..."
                        name="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.correo && formik.errors.correo
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } `}
                      />
                      {formik.touched.correo && formik.errors.correo ? (
                        <label className="text-red-500">
                          {formik.errors.correo}
                        </label>
                      ) : null}
                    </div>

                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 text- dark:text-gray-200">
                        Municipio
                      </label>
                      <select
                        name="municipio"
                        value={formik.values.municipio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.municipio && formik.errors.municipio
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } `}
                      >
                        {municipios.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.municipio && formik.errors.municipio ? (
                        <label className="text-red-500">
                          {formik.errors.municipio}
                        </label>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 p-4">
                  <div className="flex items-center">
                    <MapPinIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                    <h2 className="pl-1 text-xl text-color dark:text-white">
                      Rol y Contraseña:
                    </h2>
                  </div>
                  {/* USER LOCATION AND THEIR PROPERTIES */}
                  <div className="grid grid-cols-2 gap-3 px-3">
                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Rol
                      </label>
                      <select
                        name="rol"
                        value={formik.values.rol}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full text-base px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.rol && formik.errors.rol
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } `}
                      >
                        <option value="">SELECCIONE</option>
                        {dataRol.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.rol && formik.errors.rol ? (
                        <label className="text-red-500">
                          {formik.errors.rol}
                        </label>
                      ) : null}
                    </div>

                    <div className="">  
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Contraseña
                      </label>
                      <input
                        name="contrasena"
                        value={formik.values.contrasena}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="password"
                        placeholder="Ingrese Contraseña..."
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.contrasena && formik.errors.contrasena
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } `}
                      />
                      {formik.touched.contrasena && formik.errors.contrasena ? (
                        <label className="text-red-500">
                          {formik.errors.contrasena}
                        </label>
                      ) : null}
                    </div>

                    <div>
                      <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                        Estado
                      </label>
                      <select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                          formik.touched.status && formik.errors.status
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        } `}
                      >
                        <option value="">SELECCIONE</option>
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                      </select>
                      {formik.touched.status && formik.errors.status ? (
                        <label className="text-red-500">
                          {formik.errors.status}
                        </label>
                      ) : null}
                    </div>

                  </div>
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 border-t-gray-900 dark:border-t-white h-14 dark:bg-gray-600">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                  >
                    Actualizar
                  </button>
                  {success && (
                    <span className="text-green-500">
                      Usuario actualizado con éxito!
                    </span>
                  )}
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalActionUsuario;
