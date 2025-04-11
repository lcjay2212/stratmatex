import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto mt-[5rem] p-4 md:p-0">
        <div className="text-start">
          <p className="text-primary text-[18px]">Need Help?</p>
          <div className="my-6">
            <p className="text-[32px] font-bold mb-4">Contact Us</p>
            <p>You can send us real mail here:</p>
          </div>
          <div>
            <p className="text-[32px] font-bold mb-2">
              Strategic Material Exchange™
            </p>
            <p>9107 Yale Rd.</p>
            <p>Diamond, OH 44412</p>
            <p>info@quxnow.com</p>
            <p>(877)-700-0789</p>
          </div>
          <div className="my-8 flex flex-col gap-2">
            <p>Or email us directly at: Info@quxnow.com</p>
            <p>Or call us at 1 (877)-700-0789</p>
            <p>Or simply fill out the form:</p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

      <div className="bg-primary text-start py-[3rem] px-4 md:px-0">
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto justify-evenly gap-12 md:gap-0">
          <div className="text-lg/8 font-semibold">
            <p className="text-[32px] font-bold mb-8">
              Strategic Material Exchange™
            </p>
            <p>9107 Yale Rd.</p>
            <p>Diamond, OH 44412</p>
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
    </div>
  );
};

export default AboutPage;
