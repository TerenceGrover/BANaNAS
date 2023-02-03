export interface IBananaFact {
  fact : string
}

export interface IBanana {
  alex : number,
  seth : number,
  terence : number,
  alessio : number
}

export interface IFilterCategory {
  year : {
    victim : string,
    position : string,
    country : string
  }
}

export interface ISubCategory {
  name : {
    description : string,
    parameters_needed : string[],
    available_countries : string[]
  }
}

export interface IMetric {
  year : number,
  value : number
}

export interface IDescription {
  description : string
}