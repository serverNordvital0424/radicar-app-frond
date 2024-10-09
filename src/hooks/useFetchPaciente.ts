import { useEffect, useState } from "react";
import { IPacientes } from "../models/IPacientes";
import { api } from "../utils/api-config";
import { fetchPacientes } from "../services/apiService";

export const useFetchPaciente = () => {
  const [data, setData] = useState<IPacientes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const getData = async (documento: string) => {
      try {
        const pacientes = await api.post('/pacientes-documento', {
          documentNumber: documento
        });

        if (pacientes.data.length === 0) {
          setError("No se encontraron pacientes con el documento ingresado");
          setData(null);
        }else{
          setData(pacientes.data);
          setError(null);
        }

      } catch (error) {
        setError("Error al obtener los datos de los pacientes.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

  return { data, loading, error, getData };
};


// hook para traer todos los datos del paciente
export const useFetchPacientes = () => {

  const [pacientes, setPacientes] = useState<IPacientes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorPacientes, setErrorPacientes] = useState<string | null>(null);

  useEffect(() =>{
    
    const getPacientes = async () => {
      try {
        const response = await fetchPacientes();
  
        setPacientes(response);
  
      } catch (error) {
        setErrorPacientes("Error al obtener los datos de los pacientes.");
      } finally {
        setLoading(false);
      }
    };
    getPacientes();
  }, [])


  return { pacientes, loading, errorPacientes };


}

