import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto py-6 text-center text-sm">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-primary transition-colors">
            Sitemap
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms of Use
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p>&copy; 2024 - {currentYear} CalcuWell.net. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
