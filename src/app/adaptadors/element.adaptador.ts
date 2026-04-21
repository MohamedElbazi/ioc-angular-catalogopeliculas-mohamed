import { ElementApiResponse, ElementCataleg } from '../models/element.model';

// 🔹 UNO
export function adaptarElementApi(api: ElementApiResponse): ElementCataleg {
  return {
    id: api.id,
    titol: api.nom,
    descripcio: api.descripcio,
    categoria: api.categoria,
    preu: api.preu,
    imatgeUrl: api.imatge,
    esPopular: api.popular,
    unitats: api.stock
  };
}

// 🔹 ARRAY
export function adaptarElementsApi(data: ElementApiResponse[]): ElementCataleg[] {
  return data.map(adaptarElementApi);
}