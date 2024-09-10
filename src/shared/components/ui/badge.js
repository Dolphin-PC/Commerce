import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/shadcn-util";
const badgeVariants = cva("inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground",
        },
        size: {
            small: "px-1.5 py-0.5 text-sm",
            medium: "px-2.5 py-1 text-md",
            large: "px-4 py-1.5 text-lg",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "small",
    },
});
function Badge({ className, variant, size, ...props }) {
    return _jsx("div", { className: cn(badgeVariants({ variant, size }), className), ...props });
}
export { Badge, badgeVariants };
