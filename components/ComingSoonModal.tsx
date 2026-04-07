"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import FancyButton from "./FancyButton";
import { useEffect, useRef, useCallback } from "react";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

export default function ComingSoonModal({
    isOpen,
    onClose,
    title = "Coming Soon",
    description = "We're currently building something amazing for our partners. Check back soon for updates!",
}: ComingSoonModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus trap - get all focusable elements within modal
    const getFocusableElements = useCallback(() => {
        if (!modalRef.current) return [];
        return Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => !el.hasAttribute("disabled"));
    }, []);

    // Handle keyboard events for focus trap and escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key === "Tab") {
                const focusableElements = getFocusableElements();
                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        },
        [getFocusableElements, onClose]
    );

    // Manage focus and body scroll when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = "hidden";

            const timer = setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 50);

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                clearTimeout(timer);
                document.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            document.body.style.overflow = "unset";
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    role="presentation"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="coming-soon-title"
                        aria-describedby="coming-soon-description"
                        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-8 text-center"
                    >
                        {/* Close Button */}
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            aria-label="Close dialog"
                            type="button"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Icon */}
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500" aria-hidden="true">
                            <Clock className="h-8 w-8" />
                        </div>

                        {/* Content */}
                        <h2 id="coming-soon-title" className="mb-2 text-2xl font-bold text-slate-900">
                            {title}
                        </h2>
                        <p id="coming-soon-description" className="mb-8 text-slate-600 leading-relaxed">
                            {description}
                        </p>

                        {/* Action */}
                        <FancyButton
                            label="Got it"
                            color="orange"
                            as="button"
                            onClick={onClose}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
