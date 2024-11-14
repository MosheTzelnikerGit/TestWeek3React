export interface User {
    _id?: string;
    username: string;
    password: string;
    organization: string;
    IDOrganization: string;
    region?: string;
  }
  
  export interface Ammo {
    name: string;
    amount: number;
  }
  
  export interface AmmoDetails {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
  }
  