import { HTMLAttributes } from "react";

type TitleProps = HTMLAttributes<HTMLHeadingElement>;

export function Title({ children, className, ...rest }: TitleProps) {
    return <h1 {...rest} className={`text-3xl font-bold ${className ? className : ''}`}>{children}</h1>;
}