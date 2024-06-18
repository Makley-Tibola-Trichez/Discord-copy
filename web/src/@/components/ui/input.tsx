import * as React from "react"

import { cn } from "../../../@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
   }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const id = React.useId()

    return (
      <>
      <label htmlFor={id} className="dark:text-slate-300" >{props.label}</label>
        <input
          type={type}
           id={id}
          className={cn(
            "flex h-10 w-full rounded-[3px] border dark:text-slate-200 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-stone-900 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }