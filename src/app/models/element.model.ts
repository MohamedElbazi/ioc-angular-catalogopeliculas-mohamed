// 📦 API (tal cual viene del backend)
export interface ElementApiResponse {
  id: string;
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}

// 🎬 MODELO INTERNO (IMPORTANTE: nombres cambiados)
export interface ElementCataleg {
  id: string;
  titol: string;        // 👈 antes nom
  descripcio: string;
  categoria: string;
  preu: number;
  imatgeUrl: string;    // 👈 antes imatge
  esPopular: boolean;   // 👈 antes popular
  unitats: number;      // 👈 antes stock
}