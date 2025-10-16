import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <PageTransition>
          <div className="p-8">
            {children}
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
