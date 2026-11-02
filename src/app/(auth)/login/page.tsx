import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-sm text-zinc-500">
            Truy cập tài khoản của bạn tại Du Lịch Nông Thôn
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-emerald-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </Container>
  );
}
