export interface VolumeType {
  unit: string;
  abbreviation: string;
}

export interface PurchaseType {
  label: string;
  key: string;
}

export interface Utilities {
  materials: string[];
  volume_types: VolumeType[];
  purchase_types: PurchaseType[];
  marketplace_materials: string[];
}
