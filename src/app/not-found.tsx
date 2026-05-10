import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
      <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-300">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-neutral-500 max-w-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Go home
      </Link>
    </div>
  );
}