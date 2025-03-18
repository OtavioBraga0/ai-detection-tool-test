import { HTMLAttributes } from "react";

type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ children, className, ...rest}: ParagraphProps) {
    return <p {...rest} className={`text-lg ${className ? className : ''}`}>{children}</p>;
}