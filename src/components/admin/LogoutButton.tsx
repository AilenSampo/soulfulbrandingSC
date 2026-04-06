"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm text-red-700 hover:underline"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Cerrar sesión
    </button>
  );
}
