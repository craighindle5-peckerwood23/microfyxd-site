import "../styles/globals.css";
import { SiteNav } from "../components/SiteNav";

export const metadata = {
  title: "Microfyxd",
  description: "Quiet Intelligence for your workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-coreVoid text-slate-100 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Global Floating Navigation */}
          <SiteNav />

          {/* Main Content Frame */}
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-6xl px-4 py-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}