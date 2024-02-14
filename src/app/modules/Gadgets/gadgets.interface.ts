export type TFeatures = {
  resolution?: string;
  storagecapacity?: string;
  screenSize?: string;
  weight?: string;
  dimensions?: string;
};
export type TGadgets = {
  name: string;
  userId: string;
  imageUrl: string;
  price: number;
  quantity: number;
  releaseDate: string;
  Brand: string;
  modelNumber: string;
  Category: string;
  operatingSystem?: string;
  connectivity?: string;
  powerSource?: string;
  features?: TFeatures;
};
