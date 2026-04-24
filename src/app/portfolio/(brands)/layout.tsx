export default function PortfolioBrandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:min-h-dvh md:overflow-y-auto md:overflow-x-hidden">
      {children}
    </div>
  );
}
