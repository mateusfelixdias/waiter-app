import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ICategory } from '../../../interfaces/Category';

const schemaCategories = z.object({
  icon: z.string({
    required_error: 'O icon é obrigatório',
    invalid_type_error: 'O icon têm que ser em formato de string.',
  }),
  name: z.string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome têm que ser em formato de string.',
  }),
});

export const handleValidationCategory = ({ icon, name }: ICategory) => {
  try {
    schemaCategories.parse({
      icon,
      name,
    });

    return true;
  } catch (err: any) {
    const { details } = fromZodError(err);
    const { message } = details[0];

    return message;
  }
};
