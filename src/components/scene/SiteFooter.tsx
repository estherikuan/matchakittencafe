const LINKS = [
  { label: "Resume", href: "https://drive.google.com/file/d/1OG9Y6CoGDTTIwK93zT7_s70FkEHUqgJP/view?usp=sharing" },
  { label: "Email", href: "mailto:estherikuan@yahoo.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/esther-kuan/" },
];

export function SiteFooter() {
  return (
    <footer
      className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <ul className="flex items-center gap-4 rounded-full bg-parchment/80 px-5 py-1.5 text-wood-deep shadow-[0_6px_18px_rgba(30,20,10,0.18)] backdrop-blur-sm">
        {LINKS.map((l, i) => (
          <li key={l.label} className="flex items-center gap-4">
            {i > 0 && <span aria-hidden className="text-wood-deep/40">·</span>}
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[0.95rem] leading-none text-wood-deep/80 underline decoration-wood-deep/0 underline-offset-4 transition hover:text-wood-deep hover:decoration-wood-deep/60"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}