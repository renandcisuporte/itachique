import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const helveticaNeue = localFont({
  src: "./HelveticaNeue-MediumCond.woff2",
  display: "swap",
});

export { inter, helveticaNeue };
