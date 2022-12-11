import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { IProduct } from '../../../interfaces/Product';

const schemaProduct = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome têm que ser em formato de string.',
  }),
  price: z
    .string({
      required_error: 'O preço é obrigatório',
      invalid_type_error: 'O preço têm que ser em formato de string',
    })
    .transform((price) => ~~price),
  imagePath: z.string({
    required_error: 'O image path é obrigatório',
    invalid_type_error: 'O image path têm que ser em formato de string',
  }),
  description: z.string({
    required_error: 'O description é obrigatório',
    invalid_type_error: 'O description têm que ser em formato de string',
  }),
  category: z.string({
    required_error: 'O category é obrigatório',
    invalid_type_error: 'O category têm que ser em formato de string',
  }),
  ingredients: z.array(
    z.object(
      {
        name: z.string({
          required_error: 'O nome do ingrediente é obrigatório',
          invalid_type_error:
            'O nome do ingrediente têm que ser em formato de string.',
        }),
        icon: z.string({
          required_error: 'O icon é obrigatório',
          invalid_type_error: 'O icon têm que ser em formato de string.',
        }),
      },
      {
        required_error: 'O nome e icon são obrigatórios.',
        invalid_type_error: 'O nome e icon têm que ser em formato de string.',
      }
    ),
    {
      required_error: 'Os ingredientes são obrigatório.',
      invalid_type_error:
        'Os ingredientes têm que em formato de objeto, contendo nome e icon.',
    }
  ),
});

export const handleValidationProduct = (product: IProduct) => {
  try {
    schemaProduct.parse({ ...product });

    return true;
  } catch (err: any) {
    const { details } = fromZodError(err);
    const { message } = details[0];

    return message;
  }
};
