import Link from "next/link";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function AdminContentPage() {
  return (
    <>
      <div className="border-b border-neutral-200 bg-white px-4 py-3">
        <Link href="/admin" className="text-sm font-medium text-brand-blue hover:underline">
          ← Volver al panel
        </Link>
      </div>
      <ContentEditor />
    </>
  );
}
