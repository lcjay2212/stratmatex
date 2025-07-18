export interface SellMaterialsFormValues {
  materialName: string;
  description: string;
  technicalProperties: string;
  availableVolume: string;
  volumeType: string;
  multiplesOf: string;
  isMultiplesOnly: boolean;
  basePrice: string;
  priceUnit: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isHazmat: boolean;
  hazmatCategory: string;
  purchaseType: string;
  materialPhoto?: File | null;
  downloadableFiles: File[];
}
