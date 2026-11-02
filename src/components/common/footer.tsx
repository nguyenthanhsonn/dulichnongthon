import Link from "next/link";
import { SITE_CONFIG } from "@/constants/config";
import { Container } from "./container";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg text-emerald-700 dark:text-emerald-400">
              <Compass className="h-6 w-6 text-emerald-600" />
              <span>{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Khám phá</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/destinations" className="hover:text-emerald-600">Làng nghề truyền thống</Link></li>
              <li><Link href="/destinations" className="hover:text-emerald-600">Nông trại sinh thái</Link></li>
              <li><Link href="/tours" className="hover:text-emerald-600">Tour mùa lúa chín</Link></li>
              <li><Link href="/experiences" className="hover:text-emerald-600">Trải nghiệm làm nông dân</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Thông tin</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/about" className="hover:text-emerald-600">Giới thiệu</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600">Liên hệ & Hợp tác</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-600">Điều khoản sử dụng</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-600">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
          © 2026 {SITE_CONFIG.name}. Tất cả các quyền được bảo lưu.
        </div>
      </Container>
    </footer>
  );
}
