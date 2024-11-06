import { helveticaNeue } from "../../_font/fonts";
import { cn } from "@/libs/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface TitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement
  > {
  text: string;
  caption?: string;
}

export function Title({ text, caption, ...rest }: TitleProps) {
  return (
    <h1
      className={cn(
        "rounded-md bg-[#471978] px-4 py-2 text-xl leading-10 text-white",
        helveticaNeue.className,
      )}
    >
      {text}
      {caption && <small className="block text-xs">{caption}</small>}
    </h1>
  );
}
