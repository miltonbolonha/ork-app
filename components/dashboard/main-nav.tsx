import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link> */}
      <Link
        href="/indicadores"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Indicadores-Chave
      </Link>
      <Link
        href="/equipes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Equipes
      </Link>
      {/* <Link
        href="/membros"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Membros
      </Link> */}
      <Link
        href="/relatorios"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Relatórios
      </Link>
      <Link
        href="/faqs"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        FAQs
      </Link>
    </nav>
  );
}
