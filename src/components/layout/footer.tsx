
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 text-muted-foreground">
      <div className="container mx-auto py-8 text-center">
        <div className="flex justify-center gap-4 sm:gap-6 mb-4">
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/sitemap" className="text-sm hover:text-primary transition-colors">
            Sitemap
          </Link>
          <Link href="/terms-of-use" className="text-sm hover:text-primary transition-colors">
            Terms of Use
          </Link>
          <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
        <div className="mb-4 text-sm">
            Contact us: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>
        </div>
        <p className="text-xs">&copy; {currentYear} calcpro.online. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
