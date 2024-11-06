import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Container } from "./common/container";

import Link from "next/link";
import Api from "@/services/index";
import { cn, slug } from "@/libs/utils";
import { Nav } from "./nav-client";
import { helveticaNeue } from "../_font/fonts";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function Root({ ...rest }: Props) {
  return <div className="bg-[#471978]" {...rest} />;
}

async function Links() {
  const data = await Api.fetchCategory();

  return data.map((item) => (
    <Link
      href={`${slug(item.category)}`}
      key={item.id}
      className={cn(
        "flex h-12 items-center px-4 text-white hover:bg-[#330861] hover:text-[#e4e439]",
        helveticaNeue.className,
      )}
    >
      <span>{item.category}</span>
    </Link>
  ));
}

function NavRoot() {
  return (
    <Container>
      <Nav>
        <Links />
      </Nav>
    </Container>
  );
}

function Loading() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <span key={item} className="h-12 min-w-44 bg-[#330861] px-4" />
      ))}
    </>
  );
}

export const NavHeader = {
  root: Root,
  loading: Loading,
  nav: NavRoot,
};
