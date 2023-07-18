import { ZodAny } from 'zod';

export const zodValidate = (zodSchema: ZodAny) => {
  return (data: unknown) => {
    const _result = zodSchema.safeParse(data);

    if (_result.success) {
      return undefined;
    }

    return _result.error.issues[0].message;
  };
};
