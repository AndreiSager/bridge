"use client";

import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "@/app/components/Input";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(true);

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const OnSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant == "REGISTER") {
      // Axios Register
    }
    if (variant == "LOGIN") {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social SignIn
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-sm rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(OnSubmit)}>
          <Input />
        </form>
      </div>
    </div>
  );
}
