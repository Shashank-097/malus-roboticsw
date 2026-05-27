"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const pathSegments = pathname.split("/");

    // Replace current locale (en/de)
    pathSegments[1] = locale;

    router.push(pathSegments.join("/"));
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage("en")}
        className="px-3 py-1 border rounded"
      >
        EN
      </button>

      <button
        onClick={() => switchLanguage("de")}
        className="px-3 py-1 border rounded"
      >
        DE
      </button>
    </div>
  );
}