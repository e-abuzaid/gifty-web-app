import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const inputVariants = cva(
  "flex h-10 border-b bg-transparent px-3  py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[#22004b] text-white custom-input placeholder:text-gray-300 ring-purple-600 focus:ring-purple-600",
        light: "border-[#875fb6] text-white",
        outline:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300",
        subtle: "hover:bg-zinc-200 bg-zinc-100 text-zinc-900",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${inputVariants({
          variant,
        })} flex h-10 border-b bg-transparent px-3 py-2 text-md font-semibold placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
