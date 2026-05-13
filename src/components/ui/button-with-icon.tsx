"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ButtonWithIconProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

const ButtonWithIcon = ({ label = "Let's Collaborate", onClick, href, target, rel }: ButtonWithIconProps) => {
  const isLink = !!href;

  const className = "relative z-50 pointer-events-auto inline-flex items-center justify-center text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-white text-black hover:bg-white/90";

  const content = (
    <>
      <span className="relative z-10 transition-all duration-500">
        {label}
      </span>
      <div className="absolute right-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </>
  );

  if (isLink) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Button onClick={onClick} className={className}>
      {content}
    </Button>
  );
};

export default ButtonWithIcon;