"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

interface FaqItemProps {
    question: string;
    answer: string | React.ReactNode;
}

function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueId = useId();
    const buttonId = `faq-button-${uniqueId}`;
    const panelId = `faq-panel-${uniqueId}`;

    return (
        <div className="mb-4 overflow-hidden rounded-2xl bg-[#f8f9fa] transition-all hover:shadow-sm">
            <h2>
                <button
                    id={buttonId}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                    <span className="text-lg font-bold text-slate-900 leading-tight pr-4">
                        {question}
                    </span>
                    <span className="flex-shrink-0" aria-hidden="true">
                        {isOpen ? (
                            <X className="h-5 w-5 text-slate-500" />
                        ) : (
                            <Plus className="h-5 w-5 text-slate-500" />
                        )}
                    </span>
                </button>
            </h2>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 pt-2">
                            <div className="text-base leading-relaxed text-slate-600">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const faqs = [
    {
        question: "What exactly is Enabled Talent?",
        answer: "Enabled Talent is a comprehensive platform that connects forward-thinking employers with exceptional professionals with disabilities through AI-powered matching, institutional partnerships, and guided support throughout the hiring process.",
    },
    {
        question: "How is this different from posting on LinkedIn or Indeed?",
        answer: "Unlike traditional job boards, Enabled Talent provides pre-vetted candidates through institutional partnerships, offers guided support throughout the process, and focuses specifically on inclusive hiring with accessibility-ready job matching and workplace optimization support.",
    },
    {
        question: "What does it cost?",
        answer: (
            <div className="space-y-1">
                <p><span className="font-semibold">For professionals:</span> Always free.</p>
                <p><span className="font-semibold">For institutions:</span> Tiered subscriptions based on size and needs.</p>
                <p><span className="font-semibold">For employers:</span> Subscription or performance-based models available.</p>
                <p>Contact us for specific pricing.</p>
            </div>
        ),
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope and requirements. Initial setup and onboarding typically takes 2-4 weeks, while ongoing matching and placement processes are continuous. We work with your timeline to ensure successful outcomes.",
    },
    {
        question: "How do you ensure quality matches?",
        answer: "We use AI-powered matching combined with human expertise, institutional partnerships for pre-vetting, and continuous feedback loops to ensure high-quality matches that benefit both employers and professionals.",
    },
];

export default function FaqAccordion() {
    return (
        <section
            aria-labelledby="faq-heading"
            className={`${plusJakartaSans.className} mx-auto w-full max-w-4xl px-4 py-8`}
        >
            <div className="space-y-4 pb-12 text-center">
                <h1 id="faq-heading" className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    FAQ
                </h1>
                <p className="text-lg text-slate-600 sm:text-xl">
                    Frequently Asked Questions
                </p>
            </div>
            <div className="space-y-2" role="list">
                {faqs.map((faq, index) => (
                    <div key={index} role="listitem">
                        <FaqItem question={faq.question} answer={faq.answer} />
                    </div>
                ))}
            </div>
        </section>
    );
}
