import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ children, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={`p-4 border rounded h-40 outline-none resize-none ${
        className ? className : ""
      }`}
      {...rest}
    >
      {children}
    </textarea>
  );
}
