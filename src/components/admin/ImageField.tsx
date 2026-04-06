"use client";

import { useState } from "react";

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.set("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "include" });
  const j = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) throw new Error(j.error || "Error al subir");
  return j.url ?? "";
}

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export function ImageField({ label, value, onChange }: Props) {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://… o sube un archivo"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="text-sm"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setErr(null);
            setLoading(true);
            try {
              const url = await uploadFile(f);
              onChange(url);
            } catch (x) {
              setErr(x instanceof Error ? x.message : "Error");
            } finally {
              setLoading(false);
            }
          }}
        />
        {loading && <span className="text-xs text-neutral-500">Subiendo…</span>}
      </div>
      {err && <p className="text-xs text-red-600">{err}</p>}
    </div>
  );
}
