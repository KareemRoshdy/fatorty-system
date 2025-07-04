import { ChevronsRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BackLinkProps {
  name: string;
  link: string;
}

const BackLink = ({ link, name }: BackLinkProps) => {
  return (
    <Link
      href={link}
      className="flex items-center gap-1 text-xs hover:underline hover:text-primary transition-all w-fit"
    >
      <ChevronsRightIcon className="size-4" />
      {name}
    </Link>
  );
};

export default BackLink;
