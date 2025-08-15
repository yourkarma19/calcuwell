import { LucideProps, icons, Home } from "lucide-react";
import dynamic from 'next/dynamic';

interface IconProps extends LucideProps {
  name: string;
}

// All available icons from lucide-react
const LucideIcons = {
  ...icons,
  // Add any custom icons here if needed
}

export const Icon = ({ name, ...props }: IconProps) => {
  // @ts-ignore
  const LucideIcon = LucideIcons[name] ?? Home; // Fallback to a default icon
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found. Falling back to default.`);
    return <Home {...props} />; // Render a default icon if the name is invalid
  }
  
  return <LucideIcon {...props} />;
};
