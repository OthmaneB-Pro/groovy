import z from "zod";

export const loginFormValidator = z
  .string()
  .max(20, "Le prénom ne peut pas dépasser 20 caractères")
  .nonempty("Veuillez entrer un prénom")
  .min(2, "Le prénom doit contenir au moins 2 caractères")
  .regex(/^[a-zA-Z-]+$/, "Le prénom ne doit contenir que des lettres ou -");
