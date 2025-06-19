import { ContactUsForm } from "@/components/@lib/form/ContactUsForm";
import { Separator } from "@/components/ui/separator";
import Gold from "../assets/images/gold.jpg";

const ContactPage = () => {
  return (
    <div className="mt-32 md:mt-48">
      <ContactUsForm />

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

      <div className="bg-primary text-start py-[3rem] px-4 md:px-0">
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto justify-evenly gap-12 md:gap-0">
          <div className="text-lg/8 font-semibold">
            <p className="text-[32px] font-bold mb-8">
              Strategic Material Exchange™
            </p>
            <p>8350 N. Central Expressway</p>
            <p>Suite 1900, Dallas, TX 75206</p>
            <p>info@quxnow.com</p>
            <p>(877)-700-0789</p>
          </div>
          <div className="text-lg/8 font-semibold">
            <p className="text-[32px] font-bold mb-8">Business Hours</p>
            <p>9am - 7pm</p>
            <p>Monday to Friday</p>
          </div>
        </div>
      </div>

      <img src={Gold} />
    </div>
  );
};

export default ContactPage;
