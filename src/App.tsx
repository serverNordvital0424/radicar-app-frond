import { Route, Routes, Navigate } from "react-router-dom";

//*Componentes
import SideBar from "./components/pages/sidebar";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Login from "./components/pages/login";
import Perfil from "./components/pages/perfil";
import Inicio from "./components/pages/inicio";
import TablaRadicacion from "./components/pages/TablaRadicacion";
import TablaAuditoria from "./components/pages/TablaAuditoria";
import TablaRegistrosAuditados from "./components/pages/tablas-radicacion/TablaRegistrosAuditados";
import TablaCirugias from "./components/pages/TablaCirugia";
import TablaCups from "./components/pages/tablas-radicacion/TablaCups";
import TablaPacientes from "./components/pages/tablas-radicacion/TablaPacientes";
import TablaRadicadores from "./components/pages/tablas-radicacion/TablaRadicadores";
import TablaMunicipios from "./components/pages/tablas-radicacion/TablaMunicipios";
import TablaConvenios from "./components/pages/tablas-radicacion/TablaConvenio";
import TablaTipoDocumento from "./components/pages/tablas-radicacion/TablaTipoDocumento";
import TablaIpsPrimaria from "./components/pages/tablas-radicacion/TablaIpsPrimaria";
import TablaLugarRadicacion from "./components/pages/tablas-radicacion/TablaLugarRadicacion";
import TablaIpsRemite from "./components/pages/tablas-radicacion/TablaIpsRemite";
import TablaEspecialidad from "./components/pages/tablas-radicacion/TablaEspecialidad";
import TablaTipoServicio from "./components/pages/tablas-radicacion/TablaTipoServicio";
import Usuarios from "./components/pages/usuarios";
import RegistrarUsuarios from "./components/pages/RegistrarUsuarios";
import TablaAutorizarServicios from "./components/pages/tablas-radicacion/TablaAutorizarServicios";
import CookieConsent from "./components/PopCookie";

//*Contextos
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { PrivateRoutes } from "./components/PrivateRoutes";
import FileManager from "./components/pages/SistemaArchivosSGC";
import { UserProfileProvider } from "./context/userProfileContext";
import { SidebarProvider } from "./context/sidebarContext";

function AppRoutes() {
  const { theme } = useTheme();
  return (
    <div className={`font-semibold ${theme === "dark" ? "dark" : ""}`}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/*"
            element={
              <div className="grid min-h-screen grid-rows-layout">
                <Navbar />
                <div className="relative flex">
                  <SideBar />
                  <main className="flex-1 overflow-auto bg-slate-200 dark:bg-gray-900">
                    <Layout>
                      <Routes>
                        <Route path="/home" element={<Inicio />} />
                        <Route
                          path="/tabla-radicacion"
                          element={<TablaRadicacion />}
                        />
                        <Route
                          path="/tabla-auditoria"
                          element={<TablaAuditoria />}
                        />
                        <Route
                          path="/tabla-registros-auditados"
                          element={<TablaRegistrosAuditados />}
                        />
                        <Route
                          path="/tabla-cirugias"
                          element={<TablaCirugias />}
                        />
                        <Route path="/tabla-cups" element={<TablaCups />} />
                        <Route
                          path="/tabla-pacientes"
                          element={<TablaPacientes />}
                        />
                        <Route
                          path="/tabla-radicadores"
                          element={<TablaRadicadores />}
                        />
                        <Route
                          path="/tabla-municipios"
                          element={<TablaMunicipios />}
                        />
                        <Route
                          path="/tabla-convenios"
                          element={<TablaConvenios />}
                        />
                        <Route
                          path="/tabla-tipo-documento"
                          element={<TablaTipoDocumento />}
                        />
                        <Route
                          path="/tabla-ips-primaria"
                          element={<TablaIpsPrimaria />}
                        />
                        <Route
                          path="/tabla-lugar-radicacion"
                          element={<TablaLugarRadicacion />}
                        />
                        <Route
                          path="/tabla-ips-remite"
                          element={<TablaIpsRemite />}
                        />
                        <Route
                          path="/tabla-especialidad"
                          element={<TablaEspecialidad />}
                        />
                        <Route
                          path="/tabla-tipo-servicio"
                          element={<TablaTipoServicio />}
                        />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route
                          path="/registrar-usuarios"
                          element={<RegistrarUsuarios />}
                        />
                        <Route
                          path="/tabla-autorizar-servicios"
                          element={<TablaAutorizarServicios />}
                        />
                        <Route
                          path="/SistemGestionCalidad"
                          element={<FileManager />}
                        />
                        <Route path="*" element={<Navigate to="/home" />} />
                      </Routes>
                    </Layout>
                  </main>
                </div>
                <Footer />
              </div>
            }
          />
        </Route>

        {/* Ruta por defecto para redirigir a la página de inicio */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <SidebarProvider>
          <CookieConsent />
          <AppRoutes />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </SidebarProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
}
