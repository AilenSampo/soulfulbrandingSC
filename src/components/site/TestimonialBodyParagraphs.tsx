type Props = { text: string };

export function TestimonialBodyParagraphs({ text }: Props) {
  const parts = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="space-y-3 text-left text-sm leading-relaxed text-brand-navy/85 md:text-base">
      {parts.map((p, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {p}
        </p>
      ))}
    </div>
  );
}
