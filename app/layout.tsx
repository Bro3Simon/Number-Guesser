import { ThemeRegistry } from "app/ThemeRegistry";
import { Children } from "app/types/commonProps";

import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "An engaging number guesser game that showcases the rapid computational abilities of computers.",
  title: "Number Guesser",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
