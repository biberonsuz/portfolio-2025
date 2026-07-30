import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-(--background) text-(--foreground) flex flex-col">
        <ConditionalLayout>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ConditionalLayout>
      </body>
    </html>
  );
}
