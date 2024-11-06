import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";
import { Container } from "./common/container";
import type { Metadata } from "../_services/fetch-metadata";
import Link from "next/link";
import Image from "next/image";
import { Advertisements } from "./advertisement";

interface CommonProps {
  info: Metadata;
}

interface RootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement> {}

function Root({ ...rest }: RootProps) {
  return <header {...rest} />;
}

function Info({ info }: CommonProps) {
  const { phones, emails } = info;
  return (
    <div className="bg-[#e7f13d] py-1 text-[7px] md:text-xs">
      <Container className="text-center font-semibold uppercase">
        contato equipe itachique {phones[0].phone} | email: {emails[0]}
      </Container>
    </div>
  );
}

function Logo({ info }: CommonProps) {
  const { logo, title } = info;
  return (
    <Link
      href="/"
      className="relative h-[85px] w-full max-w-[300px] md:h-[105px]"
    >
      <Image src={`${logo}`} alt={title} fill className="object-contain" />
    </Link>
  );
}

function Content({ info }: CommonProps) {
  return (
    <Container className="flex flex-nowrap items-center justify-center py-4 text-white md:justify-between">
      <Logo info={info} />
      <Advertisements.root className="hidden flex-1 pl-4 md:block">
        <Suspense fallback={<Advertisements.loading />}>
          <Advertisements.inLogo />
        </Suspense>
      </Advertisements.root>
    </Container>
  );
}

const Header = {
  root: Root,
  info: Info,
  logo: Logo,
  content: Content,
};

export default Header;
