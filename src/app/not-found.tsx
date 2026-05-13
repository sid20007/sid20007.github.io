import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
      <p className="text-[11px] font-medium uppercase tracking-widest text-[#a1a1aa]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-[#71717a] max-w-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a0b] transition-colors hover:bg-[#e4e4e7]"
      >
        Go home
      </Link>
    </div>
  );
}