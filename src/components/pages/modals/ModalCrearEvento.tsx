import { useFormik } from 'formik'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import * as Yup from 'yup'
import ErrorMessage from '../../ErrorMessageModals'

const ModalCrearEvento = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const validationSchema = Yup.object({
        titulo: Yup.string().required("El título es requerido")
            .min(2, "El título debe tener al menos 2 caracteres")
            .max(200, "El título debe tener máximo 200 caracteres"),
        descripcion: Yup.string().required("La descripción es requerida")
            .min(2, "La descripción debe tener al menos 2 caracteres")
            .max(300, "La descripción debe tener máximo 300 caracteres"),
        color: Yup.string().required("El color es requerido"),
        fechaInicio: Yup.date().required("La fecha de inicio es requerida"),
        fechaFin: Yup.date().required("La fecha de fin es requerida")
    })

    // configuración de formik
    const formik = useFormik({
        initialValues: {
            titulo: "",
            descripcion: "",
            color: "",
            fechaInicio: "",
            fechaFin: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    const toggleModal = () => {
        setModalOpen((prev) => !prev)
    }

    const openModal = () => {
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        document.body.style.overflow = ""
        toggleModal()
    }
    if (modalOpen) {
        openModal()
    }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
      >
        Crear Evento
      </button>

    {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center pt-10 bg-black bg-opacity-50 backdrop-blur-sm">
        <section>
          <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 bg-white rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-800 dark:text-white">
            <button
              onClick={closeModal} // Cerrar modal al hacer clic en "X"
              className="absolute top-2 right-2"
            >
              <div className="pr-2 text-xl text-gray-500 hover-gray-700">
                &times;
              </div>
            </button>


            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-10 p-4 mb-4">
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Titulo:
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={formik.values.titulo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese código..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.titulo} && formik.errors.titulo}
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.titulo && formik.errors.titulo ? (
                        <ErrorMessage>{formik.errors.titulo}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Descripción:
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.descripcion && formik.errors.descripcion
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.descripcion &&
                      formik.errors.descripcion ? (
                        <ErrorMessage>{formik.errors.descripcion}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Color:
                    </label>
                    <input
                      type="color"
                      name="color"
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.color && formik.errors.color
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.color &&
                      formik.errors.color ? (
                        <ErrorMessage>{formik.errors.color}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Fecha de Inicio:
                    </label>
                    <input
                      type="datetime-local"
                      name="fechaInicio"
                      value={formik.values.fechaInicio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.fechaInicio && formik.errors.fechaInicio
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.fechaInicio &&
                      formik.errors.fechaInicio ? (
                        <ErrorMessage>{formik.errors.fechaInicio}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Fecha de Fin:
                    </label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={formik.values.fechaFin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.fechaFin && formik.errors.fechaFin
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.fechaFin &&
                      formik.errors.fechaFin ? (
                        <ErrorMessage>{formik.errors.fechaFin}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Botones */}

                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-300 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    onClick={closeModal}
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-500 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600"
                    type="submit"
                  >
                    Subir
                  </button>
                  {/* {success && (
                    <div className="text-green-500 dark:text-green-300">
                      {modulo == "cups" ? "CUPS" : "Diagnostico"} creado
                      correctamente.
                    </div>
                  )}
                  {error && (
                    <div className="text-red-500 dark:text-red-300">
                      {error}
                    </div>
                  )} */}
                </div>
              </form>

            
          </div>
        </section>
      </div>
    )}

    </>
  )
}

export default ModalCrearEvento
