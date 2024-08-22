import { Link } from "react-router-dom";

import salir from "/assets/back.svg";

const TablaCups = () => {
  return(
    <>
        {/* nav-table */}

        <section> 
            <h1 className="text-color text-4xl mb-4 ">Módulo Cups</h1>
            <nav>
                <ol className="mb-2 flex">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Cups
                    </li>
                </ol>
                <div  className="pb-2">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>
        
        {/* container-table */}
        <section className=" bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40 rounded-md w-full overflow-hidden">
            {/* header-tale */}

            <section className="header-tabla pb-6 flex justify-between items-center">
                <div className="container-filter">
                    <label className="font-bold text-lg text-stone-600">
                        Buscar Cup :
                    </label> 
                   <input
                        placeholder=" Consultar Cup..."
                        className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring"
                   >
                   </input>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                    <select
                        name=""
                        id=""
                        className="border-2 h-[40px] w-[90px] rounded-md"
                    >
                        <option value="">PAGES</option>
                        <option value="10">10 PAGES</option>
                        <option value="20">20 PAGES</option>
                        <option value="30">30 PAGES</option>
                    </select>
                    <button className="borde-2 w-[90px] h-12 rounded-md bg-color text-white active:bg-emerald-900">
                        Agregar Cup
                    </button>
                </div>
            </section>

            <table className="text-sm w-full  table-fixed ">
                <thead>
                    <tr>
                        <th className="break-words w-[80px]">ID</th>
                        <th className="break-words w-[80px]">Codigo</th>
                        <th className="break-words w-auto">Descripcion del Cup</th>
                        <th className="break-words w-[120px]">Estado</th>
                        <th className="break-words w-[80px]">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr>
                        <td className="break-words w-[50px]">9</td>
                        <td className="break-words w-[60px]">57255287 </td>
                        <td className="break-words w-auto">...texto alusivowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</td>
                        <td className="break-words w-[120px]">ACTIVO</td>
                        <td className="break-words w-[80px]">"icon"</td>
                    </tr>
                    <tr>
                        <td className="break-words whitespace-normal overflow-auto text-clip w-[50px]">...texto alusivo </td>
                        <td className="break-words whitespace-normal overflow-auto text-clip w-[60px]">...texto alusivo </td>
                        <td className="break-words whitespace-normal overflow-auto text-clip w-auto">...texto alusivo </td>
                        <td className="break-words whitespace-normal overflow-auto text-clip w-[120px]">...texto alusivo </td>
                        <td className="break-words whitespace-normal overflow-auto text-clip w-[80px]">"icon"</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </>
  ); 

};

export default TablaCups;