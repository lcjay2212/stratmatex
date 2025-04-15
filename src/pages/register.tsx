import {
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddBankIcon from "../assets/icons/add-bank-icon.webp";
import BankIcon from "../assets/icons/bank-icon.png";
import CheckIcon from "../assets/icons/check-icon.png";
import LockIcon from "../assets/icons/lock-icon.png";
import LockKeyholeIcon from "../assets/icons/lock-keyhole-icon.png";
import logo from "../assets/stratmatex-logo.png";

const RegisterPage = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const errorMessage = (res: Record<string, string>): void => {
    Object.keys(res).forEach((errorKey) => {
      toast.warning(`${res[errorKey]}`, {
        duration: 5000, // duration in ms
        position: "top-center", // or "bottom-left", etc.
        icon: "⚠️",
      });
    });
  };

  const { mutate: validateMutation, isPending: isValidating } = useMutation({
    mutationFn: (variable) =>
      axios.post(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/validate`,
        variable,
        {
          headers: {
            Version: 2,
          },
        }
      ),
    onSuccess: () => {
      setStep((e) => e + 1);
    },
    onError: (error) => {
      const response = (
        error as unknown as {
          response?: { data?: { errors?: Record<string, string> } };
        }
      )?.response;
      if (response?.data?.errors) {
        errorMessage(response.data.errors);
      }
    },
  });

  const { mutate, isPending: isAdding } = useMutation({
    mutationFn: (variable) =>
      axios.post(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/add/duns-cage-code`,
        variable,
        {
          headers: {
            Version: 2,
          },
        }
      ),
    onSuccess: () => {
      toast.success("Corporation registration success!", {
        duration: 5000,
        position: "top-center",
      });
      navigate("/");
    },
    onError: (error) => {
      const response = (
        error as unknown as {
          response?: { data?: { errors?: Record<string, string> } };
        }
      )?.response;
      if (response?.data?.errors) {
        errorMessage(response.data.errors);
      }
    },
  });

  const { mutate: corporationMutate, isPending } = useMutation({
    mutationFn: (variable) =>
      axios.post(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/purchaser-register`,
        variable,
        {
          headers: {
            Version: 2,
          },
        }
      ),
    onSuccess: () => {
      // toast.success(`Corporation registration success!`);
      setStep(() => step + 1);
    },
    onError: (error) => {
      const response = (
        error as unknown as {
          response?: { data?: { errors?: Record<string, string> } };
        }
      )?.response;
      if (response?.data?.errors) {
        errorMessage(response.data.errors);
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (val: any) => {
    const formData = new FormData();
    console.log(step);
    if (step === 1) {
      validateMutation({ ...val, step, is_corporate: true });
      return;
    }
    if (step === 2) {
      validateMutation({ ...val, step, is_corporate: true });
    }

    if (step === 3) {
      const commonFields = [
        "email",
        "password",
        "password_confirmation",
        "username",
        "address_2",
        "city",
        "state",
        "zip",
        "account_name",
        "account_number",
        "routing_number",
        "bank_name",
        "ssn",
        "mailing_address",
        "el_number",
        "corporation_name",
        "business_license",
        "contact_person_firstname",
        "contact_person_lastname",
        "contact_person_phone",
        "contact_person_email",
      ];

      formData.append("passport", val?.passport);
      formData.append("driver_license", val?.driver_license);
      formData.append("dob", format(val?.dob, "yyyy-MM-dd"));
      formData.append("role", "corporate");
      commonFields.forEach((field) => formData.append(field, val[field]));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      corporationMutate(formData as any);
      return;
    }

    if (step === 4) {
      mutate({
        email: val.email || "cjay04@gmail.com",
        duns: val.duns,
        cage_code: val.cage_code,
        materials: JSON.stringify(val.materials),
        additional_materials: val.additional_materials,
        specifications: val.specifications,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
  };

  return (
    <div className="text-white text-start mx-auto w-full md:w-[400px] my-12 px-4 md:px-0">
      <div className="flex flex-col items-center">
        <img src={logo} alt="logo" className="w-[200px]" />
      </div>
      <div className="flex justify-between items-center  my-8">
        <div className="flex justify-between items-center gap-2">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => {
              if (step === 1) {
                navigate("/");
              } else {
                setStep((e) => e - 1);
              }
            }}
          />
          <p className="font-bold text-[32px]/8">
            {step === 1 && (
              <>
                <span className="text-primary">R</span>egister
              </>
            )}

            {(step === 2 || step === 3) && (
              <>
                <span className="text-primary">C</span>ontinue Your Registration
              </>
            )}

            {step === 4 && (
              <>
                <span className="text-primary">M</span>aterials of
                <br /> Interest
              </>
            )}
          </p>
        </div>
        {(step === 1 || step === 2) && (
          <img src={LockKeyholeIcon} alt="lock keyhole" />
        )}
      </div>
      {step === 2 && (
        <div className="flex items-center gap-2">
          <img src={LockIcon} alt="lock" />
          <img src={CheckIcon} alt="check" className="w-[50px] h-[40px]" />
          <p className="text-[18px] font-semibold">
            Confirm Your Identity to
            <br /> Protect Your Account
          </p>
        </div>
      )}
      {step === 3 && (
        <>
          <div className="flex items-center gap-4">
            <img src={BankIcon} alt="bank" className="w-[50px] h-[75px]" />
            <p className="text-[1.20rem] font-semibold">
              Securely enter your bank
              <br /> account information into our
              <br /> encrypted system
            </p>
          </div>

          <div className="flex gap-2 items-center my-4">
            <img src={AddBankIcon} alt="bank" className="w-[60px] h-[60px]" />
            <p className="text-[24px]">Add New Bank Account</p>
          </div>
        </>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}

          <Button
            type="submit"
            size="lg"
            variant="default"
            className="my-8 p-6 text-md md:text-lg w-full rounded-xl cursor-pointer"
            loading={isValidating || isPending || isAdding}
          >
            {step !== 4 ? "Continue Registration" : "Finish Registration"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
