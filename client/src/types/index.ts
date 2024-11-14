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
  
  // טיפוס Resource לתיאור המשאבים
export interface Resource  {
  _id: string;
  name: string;
  amount: number;
};

// טיפוס MissileDetails עבור המידע על הטילים
export interface AmmoDetails  {
  _id: string;
  name: string;
  description: string;
  speed: number;
  price: number;
  intercepts: string[];
};