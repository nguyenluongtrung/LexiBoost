import { z } from "zod";

import { UserSchema } from "src/shared/models/shared-user.model";

// Schema declarations
export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phoneNumber: true,
})
  .extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().length(6),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterResSchema = UserSchema.omit({
  password: true,
});
export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();
export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export const RefreshTokenBodySchema = z
  .object({
    refreshToken: z.string(),
  })
  .strict();
export const RefreshTokenResSchema = LoginResSchema;
export const RefreshTokenSchema = z.object({
    token: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
})
export const LogoutBodySchema = RefreshTokenBodySchema

// Type declarations
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;

