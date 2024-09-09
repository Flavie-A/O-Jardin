export interface Product {
  id: number;
  name: string;
  description: string;
  picture?: string;
  latin_name: string;
  category_id: number;
  position?: string;
  plantation_date: string;
  harvest_date: string;
  watering_frequency: string;
  isFav: boolean;
  plantation_date: string;
  harvest_date: string;
  watering_frequency: string;
  isFav: boolean;
}

export interface ProductsState {
  products: Product[];
  fruits: Product[];
  legumes: Product[];
  loading: boolean;
  error: string | null | undefined;
}

export interface ProductInVirtualGarden {
  product_id: number;
  position: string;
  quantity: number;
}

export const ItemTypes = {
  PRODUCT: 'product',
};
export interface Tutorial {
  id: number;
  picture: string;
  title: string;
  article: string;
}

export interface TutorialsState {
  tuto: Tutorial[];
  loading: boolean;
  error: string | null | undefined;
}

// Météo

export interface Meteo {
  name: string;
  temp: string;
  icon: string;
}

export interface MeteoState {
  meteo: Meteo[];
  loading: boolean;
  error: string | null | undefined;
  name: string;
  zip_code: string;
}

// Users

export interface User {
  address: string;
  city: string;
  created_at: string;
  email: string;
  firstname: string;
  forecastAlert: boolean;
  id: number;
  is_admin: boolean;
  lastname: string;
  updated_at: null;
  wateringAlert: boolean;
  zip_code: string;
  password: string;
}
