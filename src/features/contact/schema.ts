import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres.')
    .max(80, 'Nome muito longo.'),
  email: z.string().trim().email('Digite um e-mail válido.').max(160, 'E-mail muito longo.'),
  subject: z
    .string()
    .trim()
    .min(3, 'O assunto precisa ter no mínimo 3 caracteres.')
    .max(120, 'Assunto muito longo.'),
  message: z
    .string()
    .trim()
    .min(20, 'A mensagem precisa ter no mínimo 20 caracteres.')
    .max(3000, 'A mensagem não pode ultrapassar 3.000 caracteres.'),
  website: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
