import Link from "next/link";

interface HeaderLinkProps {
  href: string;
  label: string;
}
export const HeaderLink = ({ href, label }: HeaderLinkProps) => {
  return (
    <Link href={href} className="text-white font-lg font-medium font-dm">
      {label}
    </Link>
  );
};
