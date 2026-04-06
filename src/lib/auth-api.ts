import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/session";

export async function isAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  return await verifyAdminToken(jar.get(ADMIN_COOKIE_NAME)?.value);
}
