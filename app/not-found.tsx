import Link from "next/link";
import { profile } from "@/content/site";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center px-6 sm:px-10 lg:px-16">
      <div className="max-w-[40ch]">
        <p className="label">404</p>
        <h1 className="display text-[clamp(2.4rem,7vw,5rem)] mt-3">Nothing here.</h1>
        <p className="mt-6 text-fg-2">One page. Everything else is imaginary.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <a href={`mailto:${profile.email}`} className="btn">
            Email Lohith
          </a>
        </div>
      </div>
    </main>
  );
}
