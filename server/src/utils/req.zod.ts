import z from 'zod'
import { removeExtraWhiteSpaces } from './validations';

export const SignUpReq = z.object({
  name: z.string().transform(removeExtraWhiteSpaces),
  mobile: z
    .string()
    .min(10)
    .max(10)
        .transform(removeExtraWhiteSpaces),
  locality: z.string().transform(removeExtraWhiteSpaces),
  username: z.string().transform(removeExtraWhiteSpaces)
});