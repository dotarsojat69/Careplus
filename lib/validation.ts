import { z } from "zod"

export const FormValidation = z.object({
name: z.string()
    .min(6, "Name must be at least 6 characters.")
    .max(50, "Name must be at most 50 characters."),
email: z.string().email("Invalid email address."),
phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number')
});

export const PatientFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male", "Female"]),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address must be at most 500 characters"),
    occupation: z
      .string()
      .min(2, "Occupation must be at least 2 characters")
      .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
      .string()
      .min(2, "Contact name must be at least 2 characters")
      .max(50, "Contact name must be at most 50 characters"),
    emergencyContactNumber: z
      .string()
      .refine(
        (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
        "Invalid phone number"
      ),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    insuranceProvider: z
      .string()
      .min(2, "Insurance name must be at least 2 characters")
      .max(50, "Insurance name must be at most 50 characters"),
    insurancePolicyNumber: z
      .string()
      .min(2, "Policy number must be at least 2 characters")
      .max(50, "Policy number must be at most 50 characters"),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to treatment in order to proceed",
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to disclosure in order to proceed",
      }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to privacy in order to proceed",
      }),
  });