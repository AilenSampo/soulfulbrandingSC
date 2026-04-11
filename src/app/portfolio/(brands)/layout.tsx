export default function PortfolioBrandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:h-dvh md:min-h-0 md:overflow-hidden">
      {children}
    </div>
  );
}
