import { z } from "zod";

import { PermissionSchema } from "./shared-permission.model";

// Schema declarations
export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  description: z.string(),
  isActive: z.boolean().default(true),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const RolePermissionSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema)
});

// Type declarations
export type RoleType = z.infer<typeof RoleSchema>;
export type RolePermissionType = z.infer<typeof RolePermissionSchema>;
