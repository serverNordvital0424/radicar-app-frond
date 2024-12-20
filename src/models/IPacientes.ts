export interface IPacientes {
    id:                  number;
    documentType:        number;
    documentNumber:      number;
    name:                string;
    phoneNumber:         string;
    phoneNumber2:        string | null;
    landline:            string;
    email:               string;
    address:             string;
    convenio:            number;
    ipsPrimaria:         number;
    status:              boolean;
    updatedAt:           Date;
    createdAt:           Date;
    convenioRelation:    Relation;
    ipsPrimariaRelation: Relation;
    documentRelation:    Relation;
}

export interface Relation {
    id:        number;
    name:      string;
    status:    boolean;
    updatedAt: Date;
    createdAt: Date;
}
