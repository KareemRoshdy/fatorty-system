import { AlertTriangle, CheckCircleIcon } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full mb-5",
  {
    variants: {
      variant: {
        warning: "bg-destructive/10 border-destructive/20 text-destructive",
        success: "bg-emerald-700 border-emerald-800 text-white",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 me-2" />
      {label}
    </div>
  );
};

export default Banner;
