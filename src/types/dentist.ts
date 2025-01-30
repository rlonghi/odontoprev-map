export type Address = {
  addressNumber: number; // numeroLogradouro
  address: string; // logradouro
  reference?: string; // pontoReferencia
  zipCode: string; // cep
  complement?: string; // complemento
  district: string; // bairro
  fullAddress: string; // enderecoCompleto
  mobilePhone: string; // celular
  uf?: string; // siglaUf - cidade.siglaUF
  city: string; // cidade.nome
  mobilePhone2?: string; // celularApp
  location: google.maps.LatLngLiteral;
};

export type Dentist = {
  id: string; // dentista.codigoDentista
  name: string; // dentista.nomeDentista
  priority: number; // dentista.prioridade
  cro: number; // dentista.numeroCRO
  email: string; // dentista.email
  website?: string; // dentista.webSite
  phone: string; // dentista.numeroFone
  personType: string; // dentista.tipoPessoa
  providerType: string; // dentista.tipoPrestador
  cnpj: string; // dentista.cnpj
  address: Address; // dentista.endereco
  unit: Unit; // dentista.unidade
  masterDegree: boolean; // dentista.mestrado
  isSpecialist: boolean; // dentista.possuiTituloEspecialidade
  speciality: Speciality; // dentista.especialidade
  specialities: Speciality[]; // dentista.especialidades
  specializations: {
    label: string;
    description: string;
  }[]; // dentista.especializacao
};

export type Unit = {
  name: string; // unidade.nome
  code: string; // unidade.codigoUnidade
  attendanceHours?: string; // unidade.horarioAtendimento
};

export type Speciality = {
  code: number; // especialidade.codigoEspecialidade
  description: string; // especialidade.descricaoEspecialidade
};

export const parseDentists = (input: any): Dentist[] => {
  if (input.dentistas instanceof Array) {
    return input.dentistas.map(_parseDentist);
  }
  return [];
};

const _parseDentist = (input: any): Dentist => {
  return {
    id: input.codigoDentista,
    name: input.nomeDentista,
    priority: input.prioridade,
    cro: Number(input.numeroCRO),
    email: input.email,
    website: input.webSite,
    phone: input.numeroFone,
    personType: input.tipoPessoa,
    providerType: input.tipoPrestador,
    cnpj: input.cnpj,
    address: {
      address: input.endereco.logradouro,
      addressNumber: Number(input.endereco.numeroLogradouro),
      reference: input.endereco.pontoReferencia,
      zipCode: input.endereco.cep,
      complement: input.endereco.complemento,
      district: input.endereco.bairro,
      fullAddress: input.endereco.enderecoCompleto,
      mobilePhone: input.endereco.celular,
      uf: input.endereco.cidade.siglaUF,
      city: input.endereco.cidade.nome,
      mobilePhone2: input.endereco.celularApp,
      location: {
        lat: Number(input.endereco.cidade.latitude),
        lng: Number(input.endereco.cidade.longitude)
      }
    },
    unit: {
      name: input.unidade.nome,
      code: input.unidade.codigoUnidade,
      attendanceHours: input.unidade.horarioAtendimento
    },
    masterDegree: input.mestrado,
    isSpecialist: input.possuiTituloEspecialidade,
    speciality: {
      code: input.especialidade?.codigoEspecialidade,
      description: input.especialidade?.descricaoEspecialidade
    },
    specialities: (input.especialidades || []).map((spec: any) => ({
      code: spec.codigoEspecialidade,
      description: spec.descricaoEspecialidade
    })),
    specializations: (input.especializacao || []).map((spec: any) => ({
      label: spec.label,
      description: spec.description
    }))
  };
};
