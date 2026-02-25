import type React from "react";
import { LeafIcon } from "lucide-react";

export const LogoIcon = (props: React.ComponentProps<"svg">) => (
	<LeafIcon {...props} />
);

export const Logo = ({ className, ...props }: React.ComponentProps<"div">) => (
	<div className={`flex items-center gap-1.5 ${className || ""}`} {...props}>
		<LeafIcon className="h-[1em] w-[1em] text-amber-500" />
		<span className="font-bold tracking-tight whitespace-nowrap" style={{ fontSize: "inherit" }}>
			CropGuard<span className="text-amber-500"> AI</span>
		</span>
	</div>
);
