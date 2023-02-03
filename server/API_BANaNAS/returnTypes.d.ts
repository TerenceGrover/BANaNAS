export interface AssassinationResponse {
  [key: string]: {
    victim: string;
    position: string;
    country: string;
  };
}

export interface DataResponse {
  [key: string]: number | string;
}

export interface DisasterResponse {
  [key: string]: {
    place: string;
    deathtoll?: number;
  };
}
