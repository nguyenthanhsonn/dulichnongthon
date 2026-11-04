import type { AuthErrorCode } from "@/types/auth";

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode, message: string) { super(message); this.name = "AuthError"; }
}
