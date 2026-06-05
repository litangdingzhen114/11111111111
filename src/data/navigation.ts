export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "作品", href: "/work" },
  { label: "关于", href: "/about" },
  { label: "流程", href: "/#process" },
  { label: "联系", href: "/contact" },
];
