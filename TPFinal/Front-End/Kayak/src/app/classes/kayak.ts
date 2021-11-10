import { KayakType } from "./kayaktype";

export interface  Kayak{
    id: number;
    userId: number; 
    hangerId: number;
    KayaktypeId: number;
    nroKayak: number;
    img: string; 
    shovelQuantity: number;
    crewmember: number;
    creationDate: Date;
    state: number;

    KayakType: KayakType;
  }