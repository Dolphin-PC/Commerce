import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/shared/lib/shadcn-util";
import { cva } from "class-variance-authority";
const Drawer = ({ shouldScaleBackground = true, ...props }) => _jsx(DrawerPrimitive.Root, { shouldScaleBackground: shouldScaleBackground, ...props });
Drawer.displayName = "Drawer";
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Overlay, { ref: ref, className: cn("fixed inset-0 z-50 bg-black/80", className), ...props })));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const drawerContentVariants = cva("", {
    variants: {
        direction: {
            left: "h-screen top-0 left-0 rounded-r-[10px]",
            right: "h-screen top-0 right-0 rounded-l-[10px]",
            top: "w-screen top-0 rounded-b-[10px]",
            bottom: "w-screen bottom-0 rounded-t-[10px]",
        },
    },
    defaultVariants: {
        direction: "right",
    },
});
const DrawerContent = React.forwardRef(({ className, children, direction, ...props }, ref) => (_jsxs(DrawerPortal, { children: [_jsx(DrawerOverlay, {}), _jsx(DrawerPrimitive.Content, { ref: ref, className: cn("fixed z-50 border bg-background", drawerContentVariants({ direction }), className), ...props, children: _jsx("div", { className: "h-full flex items-center", children: _jsx("div", { className: "h-full w-full flex flex-col justify-between", children: children }) }) })] })));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({ className, ...props }) => _jsx("div", { className: cn("grid gap-1.5 p-4 text-center sm:text-left", className), ...props });
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = ({ className, ...props }) => _jsx("div", { className: cn("mt-auto flex flex-col gap-2 p-4", className), ...props });
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Title, { ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight", className), ...props })));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Description, { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props })));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
