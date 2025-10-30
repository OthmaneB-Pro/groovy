import z from "zod";

export const UserSchema = z.object({
  username: z
    .string("Veuillez entrer un prénom")
    .max(20, "Le prénom ne peut pas dépasser 20 caractères")
    .min(1, "Veuillez entrer un prénom")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .regex(/^[a-zA-Z-]+$/, "Le prénom ne doit contenir que des lettres ou -"),
});
