import { z } from 'zod';
import { IOrder } from '../../../interfaces/Order';
import { fromZodError } from 'zod-validation-error';

const statusOptions = [
  { value: 'WAITING' },
  { value: 'IN_PRODUCTION' },
  { value: 'DONE' },
] as const;

type StatusOptions = typeof statusOptions[number]['value'];

const VALUES: [StatusOptions, ...StatusOptions[]] = [
  statusOptions[0].value,
  ...statusOptions.slice(1).map((status) => status.value),
];

const schemaOrder = z.object({
  status: z.enum(VALUES).default('WAITING'),
  table: z.string({
    required_error: 'O table é obrigatório',
    invalid_type_error: 'O table têm que ser em formato de string.',
  }),
  products: z.array(
    z.object(
      {
        product: z.string({
          required_error: 'O produto é obrigatório',
          invalid_type_error: 'O produto têm que ser em formato de string.',
        }),
        quantity: z.number({
          required_error: 'O quantidade é obrigatório',
          invalid_type_error: 'O quantidade têm que ser em formato de string.',
        }),
      },
      {
        required_error: 'O produto e quantidade são obrigatórios.',
        invalid_type_error:
          'O produto têm que ser em formato de string e quantidade em formato de número..',
      }
    ),
    {
      required_error: 'Os Produtos são obrigatótios são obrigatórios.',
      invalid_type_error:
        'Os produtos têm que ser em formato de objeto, contendo produto e quantidade.',
    }
  ),
});

export function handleValidationOrder(order: IOrder) {
  try {
    schemaOrder.parse({ ...order });

    return true;
  } catch (err: any) {
    const { details } = fromZodError(err);
    const { message } = details[0];

    return message;
  }
}
