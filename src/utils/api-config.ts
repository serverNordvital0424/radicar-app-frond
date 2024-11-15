import axios from 'axios'

const token = localStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://localhost:3600/api/v1',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }else if(rol){
            config.headers['Authorization'] = `Bearer ${rol}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const getFolderContent = async (folderId?: string) => {
    const idMunicipio = localStorage.getItem('Municipio')
    const path = folderId ? `/sistema-calidad/${folderId}` : '/sistema-calidad';
    return api.get(path, {
        params: {
            Municipio: idMunicipio
        },
    });
};


export const createFolder = async (parentFolderId: string | null, name: string) => {
    console.log(name)
    const idMunicipio = localStorage.getItem('Municipio')

    const datosUsuario = JSON.parse(localStorage.getItem('user') || '{}');
    const idUsuario = datosUsuario.id;

    const folderName = name;

    return api.post('/carpetas', {parentFolderId, folderName, municipio: idMunicipio, user_id: idUsuario});
}

export const uploadFile = async (formData: FormData, id: number | string) => {
    return api.post(`/archivo`, formData, {
        params: {
            parentFolderId: id, // Pasar el ID de la carpeta en los parámetros de la URL
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteItem = (id: string, type: "carpetas" | "archivo") => {
    return api.delete(`/${type}/${id}`);
};


export const downloadFile = (id: string) => {
    console.log(id)
    return api.get(`/download-file/${id}`, {
        responseType: 'blob'
    })
}

// * funciones para cambiar el nombre de carpetas y archivos

export const renameItems = async (folderId: string, parentFolderId: string  | null , newName: string, type: "carpetas" | "archivo" ) => {
    console.log(folderId, parentFolderId, newName, type)
    return api.put(`/${type}/${folderId}`, { name: newName, parentFolderId });
};

// actualizar datos del paciente

export const updatePatientData = async (data: FormData, id: string) => {
    return api.put(`/pacientes/${id}`, data);
};

// guardar datos a radicar
export const saveRadicar = async (data: FormData) => {
    return api.post(`/radicacion`, data);
}

// guardar el archivo soporte de radicar
export const saveFileRadicar = async (file: FormData) => {
    return api.post(`/soportes`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// guardar CUPS
export const saveCups = async (data: FormData) => {
    return api.post(`/cups-radicados`, data);
}

export const saveGestionAuxiliar = async (data: FormData, endpoint: string) => {
    return api.post(`/${endpoint}`, data)
}

export const AuditarRadicado = async (data: object, id: number) => {
    return api.put(`/autorizar-radicado/${id}`, data)
}

export const autorizarCups = async (data: object, id: number) => {
    return api.put(`/autorizar-cups/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const updateCupsAuditados = async (id: number, data: FormData) => {
    return api.put(`/actualizar-cups/${id}`, data)
}

export const updateStatusData = async (id: number, data: FormData, endPoint: string) => {
    return api.put(`/${endPoint}/${id}`, data);
}

export const createTableRadicacion = (name: string, endPoint: string) => {
    return api.post(`/${endPoint}`, { name });
}

export const createUsuario = async (data: FormData) => {
    return api.post(`/usuarios`, data);
}

// actualizar datos del perfil del usuario
export const updateUserDataEp = async (data: FormData, id: string) => {
    return api.put(`/usuario-datos-basicos/${id}`, data);
}

// actualizar datos de cups
export const updateCupsDataEp = async (data: FormData, id: number, ep: string) => {
    return api.put(`/${ep}/${id}`, data);
}

// crear CUPS
export const createCupsEp = async (data: FormData) => {
    return api.post(`/servicio-solicitado`, data);
}

// crear pacciente
export const createPacienteEp = async (data: FormData) => {
    return api.post(`/pacientes`, data);
}

export const updatePacienteEp = async (data: FormData, id: number) => {
    return api.put(`/pacientes-actualizar-tablet/${id}`, data);
}

// crear una programacion de cirugia

export const createProgramacionCirugia = async (data: FormData) => {
    return api.post(`/cirugias`, data);
}

// actualizar la contrasena del usuario=
export const updatePasswordUsuarioEp = async (data: FormData, id: number) => {
    return api.put(`/usuario-update-password/${id}`, data);
}

// actualizar la tabla usuarios
export const updateUsuariosTableEp = async (data: FormData, id: number) => {
    return api.put(`/usuario-update-table/${id}`, data);
}

// crear item sistema inventario
export const createItemEp = async (data: FormData, ep: string) => {
    return api.post(`/${ep}`, data);
}

// actualizar item sistema inventario
export const updateItemEp = async (data: FormData, id: number, ep: string) => {
    return api.put(`/${ep}/${id}`, data);
}

// crear seguimiento item
export const createSeguimientoItemEp = async (data: FormData, ep: string) => {
    return api.post(`/${ep}`, data);
}

// crear accesorio item
export const createAccesoryEquipmentEp = async (data: FormData, ep: string) => {
    return api.post(`/${ep}`, data);
}