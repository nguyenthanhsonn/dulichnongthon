import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/config";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { Compass, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-lg text-emerald-700 dark:text-emerald-400">
          <Compass className="h-6 w-6 text-emerald-600" />
          <span>{SITE_CONFIG.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href={ROUTES.HOME} className="hover:text-emerald-600 transition-colors">
            Trang chủ
          </Link>
          <Link href={ROUTES.DESTINATIONS} className="hover:text-emerald-600 transition-colors">
            Điểm đến
          </Link>
          <Link href={ROUTES.TOURS} className="hover:text-emerald-600 transition-colors">
            Tour trải nghiệm
          </Link>
          <Link href={ROUTES.ABOUT} className="hover:text-emerald-600 transition-colors">
            Về chúng tôi
          </Link>
          <Link href={ROUTES.CONTACT} className="hover:text-emerald-600 transition-colors">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={ROUTES.AUTH.LOGIN}>
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href={ROUTES.DESTINATIONS}>
            <Button size="sm">
              Khám phá ngay
            </Button>
          </Link>
          <button className="md:hidden p-2 text-zinc-600 dark:text-zinc-300" aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </header>
  );
}
