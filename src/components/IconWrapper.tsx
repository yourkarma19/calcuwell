"use client";

import { type LucideProps } from "lucide-react";
import * as allIcons from "lucide-react";

interface IconWrapperProps extends LucideProps {
  iconName: string;
}

const IconWrapper = ({ iconName, ...props }: IconWrapperProps) => {
  const LucideIcon =
    (allIcons as { [key: string]: React.ComponentType<LucideProps> })[
      iconName
    ] ?? allIcons.HelpCircle;

  return <LucideIcon {...props} />;
};

export { IconWrapper };
