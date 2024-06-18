

import * as React from "react"

import { cn } from "../../@/lib/utils"
import { useController, useFormContext } from "react-hook-form"
import clsx from "clsx"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    name: string
    helperText?:React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {


        const formMethods = useFormContext()


        if (!formMethods) {
            throw new Error('useFormContext must be used within a FormProvider')
        }
        const id = React.useId()


        const controller = useController({
            control: formMethods.control,
            name: props.name,
        })

        const fieldState = controller.fieldState

        return (
            <div>
                <label htmlFor={id} className="dark:text-slate-300" ><span
                    className={clsx('mb-1 text-xs', {
                        'text-red-400': !!fieldState.error?.message,
                        'text-zinc-400': !fieldState.error?.message,
                    })}
                >
                    <span className="uppercase font-bold ">{props.label}</span>
                    {fieldState.error?.message ? (
                        <span className="italic"> - {fieldState.error.message}</span>
                    ) : (
                        <span className="ml-1 text-red-600 text-base text-center">
                            {props.required ? '*' : null}
                        </span>
                    )}
                </span></label>
                <input
                
                    type={type}
                    id={id}
                    className={cn(
                        "flex h-10 w-full rounded-[3px] border dark:text-slate-200 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-stone-900 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                        className
                    )}
                    
                    {...props}
                    {...controller.field}
                />
                {props.helperText}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
