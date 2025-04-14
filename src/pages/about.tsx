import {
  AboutUsImageOne,
  AboutUsImageTwo,
  Five,
  Four,
  One,
  Three,
  Two,
} from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const STATIC_DATA = [
    {
      title: "Register and Verify",
      image: One,
      content:
        "Complete our streamlined verification process that protects marketplace integrity",
    },
    {
      title: "Browse Available Inventory",
      image: Two,
      content:
        "Access real-time listings of materials actually in stock, not theoretical availability",
    },
    {
      title: "Start Trading",
      image: Three,
      content:
        "Begin transacting with verified partners in a secure, confidential environment—no delays, no exposure.",
    },
    {
      title: "Place Secure Orders",
      image: Four,
      content: "Execute transactions through our QUX®-protected platform",
    },
    {
      title: "Receive Materials",
      image: Five,
      content:
        "Get verified, quality-assured materials delivered to your facility, typically within days, not months",
    },
  ];

  const items = [
    "Nano-copper (hyper-fine 5µ and ultra-fine 35µ)",
    "Nano-gold",
    "Antimony",
    "Yttrium",
    "Scandium",
    "Graphene",
    "And More...",
  ];

  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-[5rem] p-4 md:p-0">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12 mx-12">
          <div className="text-start ">
            <p className="text-lg text-primary mb-6">About Company</p>
            <p className="text-[24px]/6 md:text-[32px] font-bold ">
              About Strategic Materials Exchange™
            </p>
            <p className="text-md md:text-lg mt-4">
              Strategic Materials Exchange provides American manufacturers with
              direct access to our inventory of critical and rare earth
              materials—available immediately when you need them. As both owners
              and suppliers of these essential resources, we've eliminated
              foreign dependencies, extended delays, and unreliable third-party
              suppliers from your procurement process.
            </p>
            <p className="text-[24px]/6 md:text-[32px] font-bold mt-8">
              Our Story
            </p>
            <p className="text-md md:text-lg mt-4">
              While watching American manufacturers struggle with backlogs and
              uncertain foreign supply chains, we identified a critical gap in
              the market. Strategic materials shouldn't take months to procure,
              and companies shouldn't have to compromise on quality or security
              to meet their production timelines.
            </p>
            <p className="text-md md:text-lg mt-6">
              That's why we built SMX™—to provide immediate access to
              high-quality domestic materials through a private, secure exchange
              that protects your supply chain information.
            </p>
          </div>
          <div>
            <img src={AboutUsImageOne} className="w-600" />
          </div>
        </div>

        <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

        <div>
          <p className="text-[32px] font-bold mb-6">
            What <span className="text-primary">Sets Us Apart</span>
          </p>
          <p className="text-md md:text-lg/8">
            Our marketplace offers something unique: actual inventory of
            ultra-fine and hyper-fine nano-copper,
            <br className="hidden md:block" /> nano-gold, antimony, yttrium,
            scandium, graphene, and other materials that typically{" "}
            <br className="hidden md:block" />
            come with months-long wait times from other suppliers.
          </p>
          <p className="text-md md:text-lg/8 mt-8">
            Every material listed on our exchange undergoes KY4™ validation and
            certified assaying, ensuring
            <br className="hidden md:block" /> you receive exactly what you
            ordered. We've eliminated the quality uncertainties that{" "}
            <br className="hidden md:block" />
            often plague critical material procurement.
          </p>
          <Button
            type="button"
            className="rounded-full mt-8 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </div>

        <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

        <div className="text-start">
          <p className="mx-12 text-[32px] font-bold">How the Exchange Works</p>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch text-center my-8">
            {STATIC_DATA?.map((item) => (
              <div
                key={item.title}
                className="border-2 border-gray-500 w-[250px] border-solid rounded-3xl flex flex-col items-center px-8 pt-4 pb-8"
              >
                <img src={item.image} className={`h-[150px]`} />
                <p className="mb-4 text-[16px] font-bold">{item.title}</p>
                <p className="text-[14px]">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 mx-12 my-12 md:my-32">
          <div>
            <img src={AboutUsImageTwo} className="h-auto md:h-[650px]" />
          </div>
          <div className="max-w-[500px] text-start">
            <p className="text-[24px]/6 md:text-[32px] font-bold">
              Domestic <span className="text-primary">Innovation</span>
            </p>
            <p className="my-4 md:my-8">
              Unlike traditional suppliers or marketplaces, trade in American-
              <br className="hidden md:block" />
              owned inventory of ultra-fine and hyper-fine nano-copper, nano-
              <br className="hidden md:block" />
              gold, antimony, yttrium, scandium, graphene, and other materials
              <br className="hidden md:block" /> that typically come with
              months-long wait times elsewhere.
            </p>
            <p className="mb-8 md:mb-16">
              Every material in our possession undergoes KY4™ validation and
              <br className="hidden md:block" />
              certified assaying, making sure you receive exactly what you
              <br className="hidden md:block" />
              ordered. We've eliminated the quality uncertainties that often
              <br className="hidden md:block" />
              plague critical material procurement.
            </p>
            <p className="text-[24px]/6 md:text-[32px] font-bold">
              Secure <span className="text-primary">Trading Environment</span>
            </p>
            <p className="my-4 md:my-8">
              We are not in any public exchanges or blockchain markets,
              <br className="hidden md:block" /> which means SMX™ offers
              complete transaction privacy. Your
              <br className="hidden md:block" /> procurement data stays
              confidential, with no public ledger
              <br className="hidden md:block" /> revealing your supply chain
              details or material needs.
            </p>
            <p>
              Our platform uses QUX® post-quantum encryption technology
              <br className="hidden md:block" /> to protect all transactions and
              communications.
            </p>
          </div>
        </div>
        <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

        <div className="flex flex-col md:flex-row justify-between text-start items-center gap-12 mx-4 md:mx-12 my-12 md:my-28">
          <div>
            <p className="text-[32px] md:text-[50px]/16 font-bold">
              The <span className="text-primary">KY4™ Validation System</span>
            </p>
            <p className="text-sm md:text-lg my-8">
              Our proprietary KY4™ system establishes a new standard in
              materials exchange verification:
            </p>
            <p className="text-sm md:text-lg">
              This approach gives confidence at every stage of the
              <br /> materials exchange process.
            </p>
          </div>
          <div className="grid grid-flow-col grid-rows-2 w-auto md:w-[700px] text-start">
            <div className="border-b-2 border-gray-500 mr-8 py-6 pl-8">
              <p className="text-primary font-bold text-md md:text-lg mb-4">
                Know Your Customer
              </p>
              <p className="text-[14px] md:text-[16px]">
                We verify all suppliers bringing materials to the exchange,
                ensuring they meet our stringent quality and reliability
                standards before they can list products.
              </p>
            </div>

            <div className="border-r-2 border-gray-500 mt-8  py-6 px-8">
              <p className="text-primary font-bold text-md md:text-lg mb-4">
                Know Your Buyer
              </p>
              <p className="text-[14px] md:text-[16px]">
                We validate organizations purchasing materials directly,
                creating a trusted ecosystem of verified manufacturers and
                end-users.
              </p>
            </div>
            <div className="border-l-2 border-gray-500 mb-8  py-6 px-8">
              <p className="text-primary font-bold text-md md:text-lg mb-4">
                Know Your Materials
              </p>
              <p className="text-[14px] md:text-[16px]">
                Every material undergoes certified assaying and origin
                verification, documenting exact specifications and domestic
                sourcing before becoming available.
              </p>
            </div>
            <div className="border-t-2 border-gray-500 ml-8 pt-12  py-6 pr-4">
              <p className="text-primary font-bold text-md md:text-lg mb-4">
                Know Your Trader
              </p>
              <p className="text-[14px] md:text-[16px]">
                Participants trading on the exchange without taking physical
                possession undergo separate verification, maintaining
                marketplace integrity while facilitating efficient transactions.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

        <section className="bg-black text-white px-6 pt-0 pb-8 md:pb-16 md:pt-4 text-start">
          <div className="flex flex-col md:flex-row justify-evenly item-start md:items-center gap-8 md:gap-0">
            <div>
              <h2 className="text-2xl font-semibold">
                <span className="text-orange-500">Materials</span> Available Now
              </h2>
              <p className="mt-6 text-sm leading-relaxed">
                While competitors quote delivery times in months, we maintain
                <br className="hidden md:block" />
                actual inventory ready to ship. Our current stock includes
                <br className="hidden md:block" />
                critical materials essential for semiconductor manufacturing,
                <br className="hidden md:block" />
                defense applications, and advanced research.
              </p>
              <p className="mt-6 text-sm leading-relaxed">
                Additional specialized materials are available to qualified
                <br className="hidden md:block" />
                buyers through our Level 2 verification process.
              </p>
            </div>

            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span
                    className={`${
                      item === "And More..."
                        ? "text-orange-500 font-semibold"
                        : "font-medium"
                    } text-sm`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="bg-primary text-white py-8 md:py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-evenly text-start mx-6 md:mx-0">
            <div className="px-0 py-4 md:p-8">
              <p className="font-bold text-2xl md:text-[32px]/8">
                For Defense and Advanced
                <br className="hidden md:block" /> Manufacturing
              </p>
              <p className="my-4 md:my-8 text-md md:text-lg">
                For companies working in sensitive industries, we offer Level 2
                <br className="hidden md:block" />
                verification for accessing controlled materials like uranium,
                <br className="hidden md:block" />
                thorium, plutonium, and lithium.
              </p>
              <p className="text-md md:text-lg">
                Our platform integrates with DUNS and CAGE code systems,
                <br className="hidden md:block" /> making it seamless for
                defense contractors and government
                <br className="hidden md:block" /> suppliers to maintain
                compliance while accessing critical
                <br className="hidden md:block" /> resources.
              </p>
            </div>
            <div className="border-l-1 border-white hidden md:block" />
            <div className="px-0 py-4 md:p-8">
              <p className="font-bold text-2xl md:text-[32px]/8">
                Environmental Impact
              </p>
              <p className="my-4 md:my-8 text-md md:text-lg">
                By sourcing materials from reclamation projects and waste stream
                recovery,
                <br className="hidden md:block" /> SMX™ helps reduce the
                environmental footprint of critical materials
                <br className="hidden md:block" /> procurement.
              </p>
              <p className="text-md md:text-lg">
                Our approach transforms environmental liabilities into valuable
                assets while
                <br className="hidden md:block" /> reducing the need for new
                extraction activities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-16 md:my-32 px-6">
        <p className="text-2xl md:text-[40px] font-bold">
          Partner With Strategic Materials Exchange
        </p>
        <p className="text-sm md:text-lg my-8">
          Access critical materials when you need them, not when foreign
          suppliers can deliver. <br className="hidden md:block" />
          Our domestic inventory and verification system give American
          manufacturers the reliability they deserve.
        </p>
        <p className="text-sm md:text-lg">
          Join us in strengthening America's supply chain resilience and
          material independence. <br className="hidden md:block" />
          Your success is our mission.
        </p>
        <Button
          type="button"
          className="rounded-full mt-8 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
