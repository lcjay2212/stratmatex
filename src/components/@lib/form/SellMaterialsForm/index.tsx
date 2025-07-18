"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUtilities } from "@/hooks/queries/useUtilities";
import { ArrowLeft, ChevronDown, Info, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SellMaterialsFormValues } from "../types";
import { PurchaseTypeField } from "./PurchaseTypeField";

const defaultValues: SellMaterialsFormValues = {
  material_name: "",
  purchase_type: "bid",
  description: "",
  technical_properties: "",
  quantity: "",
  volume_type: "",
  multiple_only: false,
  multiplies_volume: "5",
  price: "",
  is_hazmat: false,
  hazmat_category: "",
  address: "",
  address_2: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  phone_number: "",
  files: [],
  resources: [],
};

interface SellMaterialsFormProps {
  onSubmit?: (data: SellMaterialsFormValues) => void;
  onCancel?: () => void;
  onBack?: () => void;
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const SellMaterialsForm = ({
  onSubmit,
  onCancel,
  onBack,
  title = "Create Material Listing",
  submitButtonText = "Create Listing",
  cancelButtonText = "Cancel",
}: SellMaterialsFormProps) => {
  const form = useForm<SellMaterialsFormValues>({ defaultValues });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [downloadedFiles, setDownloadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadableInputRef = useRef<HTMLInputElement>(null);
  const { data: utilities } = useUtilities();

  console.log(utilities?.volume_types);

  const handleSubmit = (data: SellMaterialsFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-start ">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-100 px-8 py-6">
            <div className="flex items-center justify-between">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="p-8 space-y-8"
            >
              {/* Upload Material Photos Section */}
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Upload Material Photos (Optional)
                      </FormLabel>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <FormControl>
                      <div className="space-y-4">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.type.startsWith("image/")) {
                              field.onChange([file]);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />

                        <div
                          className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-orange-300 transition-colors bg-gray-50"
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith("image/")) {
                              field.onChange([file]);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {imagePreview ? (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-48 rounded-lg shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  field.onChange([]);
                                  setImagePreview(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-12 w-12 mb-4 text-gray-400" />
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Drag and drop or upload a file
                              </p>
                              <p className="text-xs text-gray-400">
                                Supports: JPG, PNG, GIF up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Purchase Type Section */}
              <PurchaseTypeField control={form.control} />

              {/* Material Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Material Details
                </h3>

                <FormField
                  control={form.control}
                  name="material_name"
                  rules={{ required: "Material Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Material Name
                        </FormLabel>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          variant="light"
                          placeholder="Nano-Copper (Hyper-Fine 5µ)"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Description (Optional)
                        </FormLabel>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Textarea
                          variant="light"
                          placeholder="Type here.."
                          className="min-h-[120px] text-base resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="technical_properties"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Technical Properties
                        </FormLabel>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Textarea
                          variant="light"
                          placeholder="Type here.."
                          className="min-h-[120px] text-base resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Downloadable Resources Section */}
              <FormField
                control={form.control}
                name="resources"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Downloadable Resources
                      </FormLabel>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <FormControl>
                      <div className="space-y-4">
                        <input
                          type="file"
                          multiple
                          ref={downloadableInputRef}
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const currentFiles = field.value || [];
                            const newFiles = [...currentFiles, ...files];
                            field.onChange(newFiles);
                            setDownloadedFiles(newFiles);
                          }}
                        />

                        <Button
                          type="button"
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => downloadableInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload a file
                        </Button>

                        {downloadedFiles.length > 0 && (
                          <div className="space-y-2">
                            {downloadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <Upload className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-700">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFiles = downloadedFiles.filter(
                                      (_, i) => i !== index
                                    );
                                    field.onChange(newFiles);
                                    setDownloadedFiles(newFiles);
                                  }}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quantity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    rules={{ required: "Quantity is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Quantity
                          </FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="Enter quantity"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="volume_type"
                    rules={{ required: "Volume Type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Volume Type
                          </FormLabel>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <select
                              className="w-full h-12 bg-orange-500 text-white rounded-lg px-4 py-2 appearance-none cursor-pointer text-base focus:outline-none focus:ring-2 focus:ring-orange-600"
                              {...field}
                            >
                              <option
                                value=""
                                className="bg-orange-500 text-white"
                              >
                                Please select a volume type
                              </option>
                              {utilities?.volume_types.map((type) => (
                                <option
                                  key={type.abbreviation}
                                  value={type.abbreviation}
                                  className="bg-orange-500 text-white"
                                >
                                  {type.unit}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="multiple_only"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Only available in multiples of
                          </span>
                          <Input
                            variant="light"
                            className="h-10 text-center w-25 uppercase"
                            value={[
                              form.watch("quantity"),
                              form.watch("volume_type"),
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            disabled
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Material Pricing Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Material Pricing
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Base Price
                    </label>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      rules={{ required: "Price is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                                $
                              </span>
                              <Input
                                variant="light"
                                placeholder="0.00"
                                className="h-12 pl-8 text-base"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="text-md text-gray-600 font-bold">Per</span>
                    {form.watch("multiple_only") ? (
                      <div className="text-md text-gray-600 font-bold uppercase">
                        {[form.watch("quantity"), form.watch("volume_type")]
                          .filter(Boolean)
                          .join(" ")}
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="multiplies_volume"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  variant="light"
                                  className="h-12 text-center text-base w-20"
                                  {...field}
                                />
                                <span className="text-md text-gray-600 font-bold uppercase">
                                  {form.watch("volume_type")}
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Address (Shipping from)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="Street address"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Address 2
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="Apartment, suite, etc."
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="City"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="State"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip_code"
                    rules={{ required: "Zip Code is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="ZIP code"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="Country"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    rules={{ required: "Phone Number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            variant="light"
                            placeholder="Phone number"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Hazmat Section */}
              <div className="space-y-6">
                <h3 className="text-md font-semibold text-gray-900">
                  Is this a Hazmat Material?
                </h3>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <FormField
                      control={form.control}
                      name="is_hazmat"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Yes
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("is_hazmat") && (
                    <div className="flex-1 max-w-xs">
                      <FormField
                        control={form.control}
                        name="hazmat_category"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <select
                                  className="w-full h-12 bg-orange-500 text-white rounded-lg px-4 py-2 appearance-none cursor-pointer text-base focus:outline-none focus:ring-2 focus:ring-orange-600"
                                  {...field}
                                >
                                  <option
                                    value=""
                                    className="bg-orange-500 text-white"
                                  >
                                    Please select category
                                  </option>
                                  <option
                                    value="Category 1"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 1 - Explosives
                                  </option>
                                  <option
                                    value="Category 2"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 2 - Gases
                                  </option>
                                  <option
                                    value="Category 3"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 3 - Flammable Liquids
                                  </option>
                                  <option
                                    value="Category 4"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 4 - Flammable Solids
                                  </option>
                                  <option
                                    value="Category 5"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 5 - Oxidizing Substances
                                  </option>
                                  <option
                                    value="Category 6"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 6 - Toxic Substances
                                  </option>
                                  <option
                                    value="Category 7"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 7 - Radioactive Materials
                                  </option>
                                  <option
                                    value="Category 8"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 8 - Corrosive Substances
                                  </option>
                                  <option
                                    value="Category 9"
                                    className="bg-orange-500 text-white"
                                  >
                                    Category 9 - Miscellaneous
                                  </option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-8 border-t border-gray-100">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4 text-base font-semibold rounded-xl shadow-sm"
                >
                  {submitButtonText}
                </Button>
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="w-full py-4 text-base font-medium rounded-xl border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {cancelButtonText}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
