'use client';

import { CaretLeft } from '@phosphor-icons/react';
import { useId } from 'react';
import { TextField } from '../textField';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../@/form/textField';
import { Button } from '../../@/components/ui/button';

type DialogProps = {
  open: boolean;
  onClose(): void;
};

export function Dialog() {
  const _form = useForm();
  return (
    <div className='flex items-center justify-center'>

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
          <div className="bg-black bg-opacity-20 min-h-screen w-screen flex flex-1 justify-center items-center">
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
              <div className='flex flex-col gap-2'>

              <Input
                autoComplete='off'
                name="email"
                label="E-mail"
                required
                />
              <Input
                autoComplete='off' className='dark' type='password' required label='Senha' name='password' />

            <Button className='w-full dark:text-zinc-200'  type="submit">Entrar</Button>
                </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>

  );
}
