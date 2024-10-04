interface HeaderLinkProps {
  href: string;
  label: string;
}
export const HeaderLink = ({ href, label }: HeaderLinkProps) => {
  return (
    <a
      target="_blank"
      href={href}
      className="text-white font-lg font-medium font-dm"
    >
      {label}
    </a>
  );
};
