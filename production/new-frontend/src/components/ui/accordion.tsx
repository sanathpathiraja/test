"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon";

type AccordionProps = {
	title: string;
	details: string;
};

export function Accordion({ title, details }: AccordionProps) {
	const titleFormatted = title.toUpperCase().substring(0, 1) + title.toLowerCase().substring(1);

	const [isOpen, setIsOpen] = React.useState(false);
	const accordionRef = React.useRef<HTMLDivElement>(null);

	function toggleAccordion() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [accordionRef]);

	return (
		<div className="w-full" ref={accordionRef}>
			<button
				className="w-full bg-[#F5F5F5] sm:px-8 px-4 py-4 rounded-sm flex justify-between items-center"
				onClick={toggleAccordion}
			>
				<h3 className="text-xl font-light w-full text-left">{titleFormatted}</h3>
				<span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-lg p-2 ml-4">
					<Icon.ChevronDown
						className="text-forth transition-transform duration-300 text-sm"
						style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
					/>
				</span>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="w-full py-4 pb-0">
							<div className="w-full p-4 bg-forth text-white rounded-sm">
								<p className="p-4">{details}</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
