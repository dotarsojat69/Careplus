"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { FormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormValidation>>({
    resolver: zodResolver(FormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
 
  async function onSubmit ({ name, email, phone }: z.infer<typeof FormValidation>) {
    setIsLoading(true);

    try {
        const user = {
            name,
            email,
            phone,
        };

        const newUser = await createUser(user);

        if(newUser) router.push(`/patients/${newUser.$id}/register`)
    } catch (error) {
        console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hello there 👋🏻</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Fullname"
        placeholder="Your name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="name@email.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />

        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="(+62) 8123456789"
        
        />
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
