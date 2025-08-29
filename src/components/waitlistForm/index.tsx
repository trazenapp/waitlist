"use client";
import React, { useState } from "react";
import supabase from "../../../lib/subabaseClient";
import { useForm, Controller, useWatch } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormRadio from "@/components/formRadio";
import Select from "react-select";
import { FaCheck } from "react-icons/fa6";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface WaitlistDataType {
  user_type: string;
  name: string;
  email: string;
  interest: string[];
  project_name?: string;
  x_url?: string;
  comments: string;
}

interface OptionType {
  value: string;
  label: string;
}

const userTypeOptions = [
  { label: "User", value: "user" },
  { label: "Project Owner", value: "project owner" },
];

const options = [
  { label: "Newsfeed", value: "newsfeed" },
  { label: "Event", value: "event" },
  { label: "Gigs", value: "gigs" },
  { label: "Community", value: "community" },
];

const WaitlistForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const waitlistData: WaitlistDataType = {
    user_type: "",
    name: "",
    email: "",
    interest: [],
    project_name: "",
    x_url: "",
    comments: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistDataType>({
    mode: "all",
    defaultValues: waitlistData,
  });

  const userType = useWatch({ control, name: "user_type" });

  const onSubmit = async (formData: WaitlistDataType) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log(formData);
    const { error } = await supabase
      .from("waitlist")
      .insert([formData]);

    setLoading(false);

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      setSuccess(
        "Thank you for joining our Alpha’s list. We will share development updates and launch details asap!"
      );
      reset({
        user_type: "",
        name: "",
        email: "",
        interest: [],
        project_name: "",
        x_url: "",
        comments: "",
      });
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8 w-full">
        {error && (
          <Alert
            variant="destructive"
            className="bg-transparent border-red-400/40 mb-4"
          >
            <AlertCircleIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert
            variant="default"
            className="bg-transparent border-green-400/40 mb-4 text-green-400"
          >
            <AlertCircleIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              <p className="text-green-400">{success}</p>
            </AlertDescription>
          </Alert>
        )}
        <FormHeading title="Waitlist" subtitle="Access Alphas 🚀 " />
        <form
          className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="user_type" className="font-medium text-sm">
              User Type
            </Label>
            <Controller
              name="user_type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormRadio
                  options={userTypeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  selectedIcon={<FaCheck />}
                />
              )}
            />
            {errors.user_type && (
              <p className="text-red-500 text-sm">
                {errors.user_type?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="name" className="font-medium text-sm">
              Name
            </Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  id="name"
                  placeholder="how would you like to be addressed"
                  className="border-[#434343] rounded-[8px] py-[19px] px-4"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="email" className="font-medium text-sm">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="border-[#434343] rounded-[8px] py-[19px] px-4"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="interest" className="font-medium text-sm">
              Interests{" "}
              <span className="opacity-30">
                (select features you really want to use)
              </span>
            </Label>
            <Controller
              name="interest"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select<OptionType, true>
                  isMulti
                  options={options as OptionType[]}
                  className="basic-multi-select font-sans !bg-[#171717] !border-[#434343]"
                  classNamePrefix="select"
                  isOptionDisabled={() => field.value?.length >= 4}
                  {...field}
                />
              )}
            />
            {errors.interest && (
              <p className="text-red-500 text-sm">
                {errors.interest.message || "Please select your interests"}
              </p>
            )}
          </div>
          {userType === "project owner" && (
            <>
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="project_name" className="font-medium text-sm">
                  Project Name
                </Label>
                <Controller
                  name="project_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      type="project_name"
                      id="project_name"
                      placeholder="enter your project title"
                      className="border-[#434343] rounded-[8px] py-[19px] px-4"
                      {...field}
                    />
                  )}
                />
                {errors.project_name && (
                  <p className="text-red-500 text-sm">
                    {errors.project_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="x_url" className="font-medium text-sm">
                  X Url
                </Label>
                <Controller
                  name="x_url"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      type="x_url"
                      id="x_url"
                      placeholder="www.x.com/username"
                      className="border-[#434343] rounded-[8px] py-[19px] px-4"
                      {...field}
                    />
                  )}
                />
                {errors.x_url && (
                  <p className="text-red-500 text-sm">{errors.x_url.message}</p>
                )}
              </div>
            </>
          )}
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="comments" className="font-medium text-sm">
              Comments
            </Label>
            <Controller
              name="comments"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  id="comments"
                  placeholder="You can give us your suggestions here"
                  className="border-[#434343] rounded-[8px] py-[19px] px-4"
                  {...field}
                />
              )}
            />
            {errors.comments && (
              <p className="text-red-500 text-sm">{errors.comments.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
          >
            {loading ? (
              <ClipLoader color="#F4F4F4F4" size={20} />
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default WaitlistForm;
