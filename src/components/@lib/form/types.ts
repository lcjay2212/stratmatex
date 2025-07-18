export interface SellMaterialsFormValues {
  material_name: string;
  purchase_type: "bid" | "fixed_price";
  description: string;
  technical_properties: string;
  quantity: string;
  volume_type: string;
  multiple_only: boolean;
  multiplies_volume: string;
  price: string;
  is_hazmat: boolean;
  hazmat_category: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone_number: string;
  files: File[];
  resources: File[];
}
