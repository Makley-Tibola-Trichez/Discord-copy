import { PropsWithChildren, ReactNode, use, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { zodResolver, Resolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
type TextFieldProps = {
  required?: boolean;
  label?: ReactNode;
  name: string;
};
export const TextField = ({ label, required, name }: TextFieldProps) => {
  const { control } = useFormContext();

  const afterLabel = () => {};

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: {
            teste: (b) => {
              const _result = z.string().min(2, 'Errinho').safeParse(b);

              if (_result.success) return undefined;

              return _result.error.issues[0].message;
            },
          },
        }}
        render={({ field, fieldState }) => (
          <>
            <label className="flex flex-col">
              {/* <span className="font-bold mb-1 text-xs text-zinc-400"> */}
              <span
                className={clsx('mb-1 text-xs', {
                  'text-red-400': !!fieldState.error?.message,
                  'text-zinc-400': !fieldState.error?.message,
                })}
              >
                <span className="uppercase font-bold ">{label}</span>
                {fieldState.error?.message ? (
                  <span className="italic"> - {fieldState.error.message}</span>
                ) : (
                  <span className="ml-1 text-red-600 text-base text-center">
                    {required ? '*' : null}
                  </span>
                )}
              </span>

              <input
                {...field}
                className="p-2.5 rounded-sm bg-stone-900 text-zinc-300"
              />
            </label>
          </>
        )}
      />
    </div>
  );
};
