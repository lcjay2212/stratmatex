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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface SellMaterialsFormValues {
  materialName: string;
  description: string;
  technicalProperties: string;
  availableVolume: string;
  volumeType: string;
  multiplesOf: string;
  multiplesUnit: string;
  basePrice: string;
  priceUnit: string;
  startTime: string;
  endTime: string;
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
}

const defaultValues: SellMaterialsFormValues = {
  materialName: "",
  description: "",
  technicalProperties: "",
  availableVolume: "",
  volumeType: "",
  multiplesOf: "",
  multiplesUnit: "",
  basePrice: "",
  priceUnit: "",
  startTime: "",
  endTime: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  isHazmat: false,
  hazmatCategory: "",
  purchaseType: "open",
  materialPhoto: null,
};

const SellMaterials = () => {
  const form = useForm<SellMaterialsFormValues>({ defaultValues });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: SellMaterialsFormValues) => {
    // handle form submission
    console.log(data);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      form.setValue("materialPhoto", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      form.setValue("materialPhoto", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-3xl space-y-6"
        >
          {/* Upload Material Photos */}
          <FormField
            control={form.control}
            name="materialPhoto"
            render={() => (
              <FormItem>
                <FormLabel>Upload Material Photos (Optional)</FormLabel>
                <FormControl>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      className="bg-orange-500 text-white mb-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload
                    </Button>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-40 mb-2 rounded"
                        />
                      ) : (
                        <>
                          <span className="text-2xl mb-2">⬆️</span>
                          <span>Drag and drop or upload a file</span>
                        </>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Purchase Type */}
          <FormField
            control={form.control}
            name="purchaseType"
            render={({ field }) => (
              <FormItem className="flex gap-6 items-center">
                <FormLabel>Purchase Type</FormLabel>
                <FormControl>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="open"
                        checked={field.value === "open"}
                        onChange={() => field.onChange("open")}
                      />
                      Open for bids
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="fixed"
                        checked={field.value === "fixed"}
                        onChange={() => field.onChange("fixed")}
                      />
                      Fixed Price
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Material Details */}
          <FormField
            control={form.control}
            name="materialName"
            rules={{ required: "Material Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Name</FormLabel>
                <FormControl>
                  <Input
                    variant="light"
                    placeholder="Material Name"
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
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    variant="light"
                    placeholder="Description (Optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technicalProperties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Properties</FormLabel>
                <FormControl>
                  <Textarea
                    variant="light"
                    placeholder="Technical Properties"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Downloadable Resources */}
          <div>
            <label className="block font-semibold mb-2">
              Downloadable Resources
            </label>
            <Button type="button" className="bg-orange-500 text-white mb-2">
              Upload a file
            </Button>
          </div>
          {/* Quantity */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <FormField
              control={form.control}
              name="availableVolume"
              rules={{ required: "Available Volume is required" }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Available Volume</FormLabel>
                  <FormControl>
                    <Input
                      variant="light"
                      placeholder="Available Volume"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumeType"
              rules={{ required: "Volume Type is required" }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Volume Type</FormLabel>
                  <FormControl>
                    <select
                      className="w-full border rounded-md px-3 py-2"
                      {...field}
                    >
                      <option value="">Please select a volume type</option>
                      <option value="MT">MT</option>
                      <option value="KG">KG</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1 flex items-end gap-2">
              <FormField
                control={form.control}
                name="multiplesOf"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Only available in multiples of</FormLabel>
                    <FormControl>
                      <Input
                        variant="light"
                        placeholder="Only available in multiples of"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multiplesUnit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Unit</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="5 MT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Material Pricing */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <FormField
              control={form.control}
              name="basePrice"
              rules={{ required: "Base Price is required" }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input variant="light" placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1 flex items-end gap-2">
              <span>Per</span>
              <FormField
                control={form.control}
                name="priceUnit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Unit</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="5 MT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Timer */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input variant="light" type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input variant="light" type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Address */}
          <div>
            <label className="block font-semibold mb-2">
              Address (Shipping from)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Address 1</FormLabel>
                    <FormControl>
                      <Input
                        variant="light"
                        placeholder="Address 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Address 2</FormLabel>
                    <FormControl>
                      <Input
                        variant="light"
                        placeholder="Address 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">City</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">State</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Zip</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="Zip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Country</FormLabel>
                    <FormControl>
                      <Input variant="light" placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Hazmat */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <FormField
              control={form.control}
              name="isHazmat"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 font-semibold">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormLabel>Is this a Hazmat Material?</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hazmatCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Hazmat Category</FormLabel>
                  <FormControl>
                    <select
                      className="w-full border rounded-md px-3 py-2"
                      {...field}
                    >
                      <option value="">Please select category</option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button type="submit" className="bg-orange-500 text-white w-full">
              Create Listing
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SellMaterials;
