import { DialogDescription } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CheckedIcon from "../../assets/icons/checked.png";
import SmxLogo from "../../assets/stratmatex-logo.png";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const SuccessDialog: FC<{
  visible: boolean;
  setVisible: (item: boolean) => void;
  type: "register" | "contact";
}> = ({ visible, setVisible, type }) => {
  const navigate = useNavigate();
  return (
    <Dialog onOpenChange={setVisible} open={visible}>
      <VisuallyHidden>
        <DialogTitle>Success Dialog</DialogTitle>
        <DialogDescription>Success Dialog</DialogDescription>
      </VisuallyHidden>
      <DialogContent className="border border-primary rounded-3xl h-[95vh]">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex justify-center">
            <img src={SmxLogo} className="h-[60px] w-auto" />
          </div>
          <div className="my-8">
            <img src={CheckedIcon} className="h-[50px] w-auto" />
          </div>
          {type === "register" && (
            <div className="text-white">
              <p className="text-primary font-bold text-[22px]">
                Registration Successfully Completed
              </p>
              <p className="my-4 text-sm">
                Thank you for registering with Strategic Materials Exchange™!
                <br className="hidden md:block" />
                Your account has been created and is now active
                <br className="hidden md:block" /> on both SMX™ and QUX Pay® as
                a corporate user.
              </p>
              <p className="font-bold">What happens next?</p>

              <ul className="space-y-2 mt-6">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className={`font-medium text-sm`}>
                    Our team will contact you shortly to complete your corporate
                    verification
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className={`font-medium text-sm`}>
                    You'll receive access credentials to begin exploring
                    available materials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className={`font-medium text-sm`}>
                    Your registration means you also now have a QUX Pay®
                    account.{" "}
                    <a
                      href="https://quxpay.com/"
                      target="_blank"
                      className="text-primary underline"
                    >
                      You can access it here.
                    </a>
                  </span>
                </li>
              </ul>

              <p className="my-6 text-sm">
                We look forward to welcoming you to the market and helping{" "}
                <br className="hidden md:block" />
                you secure the strategic materials your business needs.
              </p>

              <Button
                className="py-6 px-8 rounded-2xl"
                onClick={() => navigate("/")}
              >
                RETURN TO HOMEPAGE
              </Button>
            </div>
          )}

          {type === "contact" && (
            <div className="text-white">
              <p className="text-primary font-bold text-[22px]">
                <span className="text-white">Thank You for Contacting </span>
                Strategic Materials Exchange™
              </p>
              <p className="my-4 text-sm">
                Your message has been successfully submitted to our team.{" "}
                <br className="hidden md:block" />
                We appreciate your interest in SMX™ and will review your inquiry
                promptly.
              </p>
              <p className="font-bold">What happens next?</p>

              <p className="my-6 text-sm">
                A member of our team will contact you within 1-2 business days
                to <br className="hidden md:block" />
                discuss your needs and answer any questions you may have.
              </p>

              <p className="my-6 text-sm">
                In the meantime, you can explore our available materials{" "}
                <br className="hidden md:block" />
                or learn more about our verification process.
              </p>

              <Button
                className="py-6 px-8 rounded-2xl mt-4"
                onClick={() => {
                  navigate("/");
                  setVisible(false);
                }}
              >
                RETURN TO HOMEPAGE
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
