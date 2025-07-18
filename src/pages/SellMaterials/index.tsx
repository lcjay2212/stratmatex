import {
  SellMaterialsForm,
  SellMaterialsFormValues,
} from "@/components/@lib/form";
import { useSellMaterials } from "@/hooks/mutations";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SellMaterials = () => {
  const navigate = useNavigate();
  const { sellMaterials, isPending } = useSellMaterials();

  const handleSubmit = async (data: SellMaterialsFormValues) => {
    try {
      await sellMaterials(data);
      // Redirect to materials page or dashboard after successful submission
      toast.success("Material listing created successfully!");
      navigate("/materials");
    } catch (error) {
      // Error is already handled by the mutation hook
      console.error("Failed to create material listing:", error);
    }
  };

  const handleCancel = () => {
    // Navigate back to materials page
    navigate("/materials");
  };

  const handleBack = () => {
    // Navigate back to previous page
    navigate(-1);
  };

  return (
    <SellMaterialsForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onBack={handleBack}
      submitButtonText={isPending ? "Creating..." : "Create Listing"}
      cancelButtonText="Cancel"
    />
  );
};

export default SellMaterials;
