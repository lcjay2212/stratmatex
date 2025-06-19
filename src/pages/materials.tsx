import { ContactUsForm } from "@/components/@lib/form/ContactUsForm";
import { MaterialCard } from "@/components/MaterialCard";
import { Separator } from "@/components/ui/separator";
import { Material, useMaterials } from "@/hooks/queries/useMaterials";
import Gold from "../assets/images/gold.jpg";

const MaterialsPage = () => {
  const { data: materials, isLoading } = useMaterials();

  const handleShowClick = (material: Material): void => {
    console.log(`Show clicked for: ${material.material_name}`);
    // Add your custom logic here
  };

  return (
    <div className="mt-32 md:mt-48 ">
      <div className="text-center mb-32">
        <h1 className="text-6xl font-bold">Materials</h1>
        <h1 className="text-6xl text-orange-500 font-bold">Catalog</h1>
        <p className="my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor <br />
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />
      <div className="max-w-screen-xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading materials...</p>
        ) : materials?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                image={material.image ?? Gold}
                title={material.material_name}
                subtitle={material.origin}
                onShowClick={() => handleShowClick(material)}
                className="hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No materials available.</p>
        )}
      </div>

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />
      <ContactUsForm />
      <img src={Gold} />
    </div>
  );
};

export default MaterialsPage;
