import { ContactUsForm } from "@/components/@lib/form/ContactUsForm";
import { MaterialCard } from "@/components/MaterialCard";
import { Separator } from "@/components/ui/separator";
import Gold from "../assets/images/gold.jpg";

interface Material {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
}

const MaterialsPage = () => {
  const materials: Material[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      title: "Nano-copper",
      subtitle: "(Hyper-fine 5μ)",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      title: "Nano-copper",
      subtitle: "(Ultra-fine 35μ)",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=400&fit=crop&crop=center",
      title: "Nano-gold",
      subtitle: "",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
      title: "Antimony",
      subtitle: "",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=400&fit=crop&crop=center",
      title: "Yttrium",
      subtitle: "",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=400&fit=crop&crop=center",
      title: "Scandium",
      subtitle: "",
    },
  ];

  const handleShowClick = (material: Material): void => {
    console.log(`Show clicked for: ${material.title}`);
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
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        {materials.map((material: Material) => (
          <MaterialCard
            key={material.id}
            image={material.image}
            title={material.title}
            subtitle={material.subtitle}
            onShowClick={() => handleShowClick(material)}
            className="hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />
      <ContactUsForm />
      <img src={Gold} />
    </div>
  );
};

export default MaterialsPage;
