import {
  SellMaterialsForm,
  SellMaterialsFormValues,
} from "@/components/@lib/form";

const SellMaterials = () => {
  const handleSubmit = (data: SellMaterialsFormValues) => {
    // handle form submission
    console.log(data);
  };

  const handleCancel = () => {
    // handle cancel action
    console.log("Form cancelled");
  };

  const handleBack = () => {
    // handle back action
    console.log("Back button clicked");
  };

  return (
    <SellMaterialsForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onBack={handleBack}
      title="Create Material Listing"
      submitButtonText="Create Listing"
      cancelButtonText="Cancel"
    />
  );
};

export default SellMaterials;
