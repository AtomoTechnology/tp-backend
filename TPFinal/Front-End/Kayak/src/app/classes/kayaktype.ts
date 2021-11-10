import { Kayak } from "./kayak";

export interface  KayakType {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    state: number;

    kayaks: Array<Kayak>;
  }