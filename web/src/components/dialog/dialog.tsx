'use client';

import { CaretLeft } from '@phosphor-icons/react';
import { useId } from 'react';
type DialogProps = {
  open: boolean;
  onClose(): void;
};

export function Dialog() {
  return (
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
        <div>
          <label className="uppercase flex flex-col">
            <span className="font-bold mb-1 text-xs text-zinc-400">
              E-mail lou número de telefone
            </span>
            <input type="text" className="p-2.5 rounded-sm bg-stone-900" />
          </label>
        </div>
      </div>
    </div>
  );
}
