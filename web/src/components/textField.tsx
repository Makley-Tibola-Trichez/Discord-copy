import { PropsWithChildren, ReactNode } from 'react';

type TextFieldProps = {
  required?: boolean;
  label?: ReactNode;
};
export const TextField = ({ label, required }: TextFieldProps) => {
  return (
    <div>
      <label className="uppercase flex flex-col">
        <span className="font-bold mb-1 text-xs text-zinc-400">
          <span>{label}</span>
          <span className="ml-1 text-red-600 text-base text-center">
            {required ? '*' : null}
          </span>
        </span>
        <input
          type="text"
          className="p-2.5 rounded-sm bg-stone-900 text-zinc-300"
        />
      </label>
    </div>
  );
};
