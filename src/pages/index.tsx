import { BlackCheck, WhiteCheck } from "@/assets/icons";
import { GraphImage } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const items = [
    "Real-time pricing based on actual availability,",
    "Trade in futures and options for commodities ",
    "No exposure of your supply chain needs",
    "Trade materials without taking physical possession",
    "Access materials with verified domestic sources",
    "Execute trades faster instead of months",
  ];

  return (
    <div>
      <div
        className={`bg-[url(./assets/images/home-image.jpg)] bg-cover bg-center h-screen`}
      >
        <div className="text-start flex justify-evenly items-center gap-24 h-screen">
          <p className="text-white text-[48px] font-bold">
            America's critical and rare
            <br /> materials, ready when you are.
          </p>
          <div>
            <p className="text-lg/8">
              The complete source for US-made
              <br /> rare earth elements and critical
              <br />
              materials that keeps your
              <br /> domestic supply chain moving.
            </p>

            <Button
              type="button"
              variant="outline"
              className="rounded-full my-4 text-white cursor-pointer h-auto text-xl p-1 bg-transparent hover:bg-transparent hover:text-primary"
              onClick={() => navigate("/contact")}
            >
              <span className="ml-4 mr-2"> Contact Us</span>
              <span>
                <img src={WhiteCheck} className="h-[40px]" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6 py-8 md:py-16">
        <div className="flex flex-col md:flex-row justify-between text-start gap-8 my-16 md:my-32">
          <div>
            <p className="text-2xl md:text-[32px]/8 font-bold">
              American-Sourced Critical Materials.{" "}
              <br className="hidden md:block" />{" "}
              <span className="text-primary">Available Now.</span>
            </p>

            <p className="my-6 text-sm md:text-lg/8">
              SMX™ eliminates critical material shortages with US-sourced
              inventory ready to ship today.
              <br className="hidden md:block" /> We stock the rare earth
              elements and strategic materials that others can't deliver.
            </p>

            <p className="text-2xl md:text-[32px]/8 font-bold my-8">
              Real Inventory, Immediate Availability,
              <br className="hidden md:block" /> Ready To Ship.
            </p>

            <p className="text-sm md:text-lg/8">
              Stop waiting months for basic supplies.
              <br className="hidden md:block" />
              We stock Hyper-fine 5μ Nano-copper, Nano-gold, Antimony, Yttrium,
              Scandium, Graphene
              <br className="hidden md:block" /> and dozens more critical
              materials that others put on backorder.
            </p>
          </div>
          <div className="border-l-1 border-white hidden md:block" />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2xl md:text-[32px]/8 font-bold">
                Certified <span className="text-primary">Authentic</span>
                <br className="hidden md:block" /> Materials
              </p>
              <p className="text-sm md:text-lg/6 my-8">
                Every batch and material undergoes KY4™
                <br className="hidden md:block" /> validation and certified
                assaying before listing.
              </p>
              <p className="text-lg/6">
                We eliminate quality uncertainty from your supply
                <br className="hidden md:block" /> chain. Materials meet or
                exceed published
                <br className="hidden md:block" /> specifications—
                <span className="font-semibold">guaranteed</span>.
              </p>
            </div>

            <Button
              type="button"
              className="rounded-full my-4 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer h-auto w-[180px] text-xl p-1"
              onClick={() => navigate("/contact")}
            >
              <span className="ml-4 mr-2"> Contact Us</span>
              <span>
                <img src={BlackCheck} className="h-[40px]" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white py-16 md:py-48 text-black">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12 text-start px-6">
          <div>
            <p className="text-4xl md:text-[67px]/20 font-bold">
              Buy <span className="text-primary">Directly</span>,<br />{" "}
              <span className="text-primary">Easy</span> Procurement,
              <br className="hidden md:block" />
              No
              <span className="text-primary"> Runaround</span>
            </p>
          </div>
          <div className="text-md md:text-[22px] max-w-[600px] font-light">
            <p>
              Our platform cuts through the traditional procurement maze.
              Purchase experimental and rare materials with transparent pricing,
              secure transactions, and delivery tracking.
            </p>
            <p className="my-4">
              Engineers and procurement teams: this is your critical materials
              solution.
            </p>
            <p>
              Secure your supply chain with domestic materials you can trust.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 md:py-32">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-16 text-start">
          <img src={GraphImage} className="h-auto  md:h-[450px] my-8" />
          <div>
            <p className="text-[32px]/8 font-bold">
              Trading on
              <br className="hidden md:block" />
              <span className="text-primary">
                Strategic Materials Exchange™
              </span>
            </p>
            <p className="my-8 text-lg">
              Access our private exchange for immediate trading of critical
              materials with complete confidentiality. No public ledgers, no
              blockchain—just secure, verified transactions between qualified
              parties on SMX™.
            </p>

            <p className="text-[32px]/8 font-bold">Trading Benefits</p>
            <ul className="space-y-4 mt-8">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className={`font-medium text-sm`}>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="rounded-full my-4 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer h-auto text-xl p-1 mt-8"
              onClick={() => navigate("/contact")}
            >
              <span className="ml-4 mr-2"> Contact Us</span>
              <span>
                <img src={BlackCheck} className="h-[40px]" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
