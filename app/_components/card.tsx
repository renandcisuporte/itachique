import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Container } from "./common/container";

interface RootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function Root({ ...rest }: RootProps) {
  return (
    <Container>
      <div className="my-72 flex-col" {...rest} />
    </Container>
  );
}
export const Card = {
  root: Root,
};
