'use client';

import { CaretLeft } from '@phosphor-icons/react';
import { useId } from 'react';
import { TextField } from '../textField';
import { FormProvider, useForm } from 'react-hook-form';
type DialogProps = {
  open: boolean;
  onClose(): void;
};

export function Dialog() {
  const _form = useForm();
  return (
    <FormProvider
      {..._form}
      // onSubmit={_form.handleSubmit((v) => {
      // console.log(v);
      // })}
    >
      <form
        onSubmit={_form.handleSubmit((v) => {
          console.log({ v });
        })}
      >
        <div className="fixed bg-black bg-opacity-20 min-h-screen w-screen flex flex-1 justify-center items-center">
          <div className="rounded bg-zinc-710 p-8">
            <div className="flex items-center text-slate-300 hover:underline font-medium mb-4">
              <CaretLeft weight="bold" className="mr-1" />
              <>Voltar</>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-zinc-300 flex justify-center">
                Boas vindas de volta!
              </div>
              <div className="text-zinc-400 leading-5  flex justify-center">
                Estamos muito animados em te ver novamente!
              </div>
            </div>
            <TextField
              name="teste"
              label="E-mail ou número de telefone"
              required
            />
          </div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </FormProvider>
  );
}
