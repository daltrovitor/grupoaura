import Image from "next/image";
import type { AnchorHTMLAttributes } from "react";

type FaviconLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

function getFaviconUrl(href: string) {
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    const faviconUrl = new URL("https://www.google.com/s2/favicons");
    faviconUrl.searchParams.set("domain_url", url.origin);
    faviconUrl.searchParams.set("sz", "64");
    return faviconUrl.toString();
  } catch {
    return null;
  }
}

export function FaviconLink({ href, style, children, ...props }: FaviconLinkProps) {
  const faviconUrl = getFaviconUrl(href);

  return (
    <a
      {...props}
      href={href}
      style={{ ...style, position: style?.position ?? "relative" }}
    >
      {children}
      {faviconUrl && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-sm border border-slate-200 bg-white shadow-xs"
        >
          <Image
            src={faviconUrl}
            alt=""
            width={16}
            height={16}
            unoptimized
            className="h-3.5 w-3.5 object-contain"
          />
        </span>
      )}
    </a>
  );
}