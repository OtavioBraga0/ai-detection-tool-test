import * as zod from "zod";

export const AuthSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
