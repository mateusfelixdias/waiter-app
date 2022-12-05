import { Schema } from 'mongoose';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { IProduct } from '../../../interfaces/Product';

const schemaProduct = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome têm que ser em formato de string.',
  }),
  price: z.number({
    required_error: 'O preço é obrigatório',
    invalid_type_error: 'O preço têm que ser em formato de número',
  }),
  imagePath: z.string({
    required_error: 'O image path é obrigatório',
    invalid_type_error: 'O image path têm que ser em formato de string',
  }),
  decription: z.string({
    required_error: 'O decription é obrigatório',
    invalid_type_error: 'O decription têm que ser em formato de string',
  }),
  category: z.instanceof(Schema.Types.ObjectId),
  ingredients: z.array(
    z.object(
      { icon: z.string(), name: z.string() },
      {
        required_error: 'O ingredients é obrigatório',
        invalid_type_error:
          'O ingredients têm que ser em formato de objeto. Contendo esse formato: icon: string, name: string',
      }
    )
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
