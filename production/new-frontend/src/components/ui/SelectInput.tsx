"use client";
import React, { useEffect } from "react";
import IconList from "@/components/Icon";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type SelectOptionType = {
  value: string;
  label: string;
};

type SelectInputProps = {
  className?: string;
  placeholder: string;
  list: SelectOptionType[];
  onChange?: (value: SelectOptionType | null) => void;
  value: SelectOptionType | null;
  notFoundText?: string;
  Icon?: React.ReactNode;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  error?: string;
  searchable?: boolean;
};

function SelectInput({
  className,
  Icon,
  list,
  placeholder,
  onChange,
  notFoundText,
  value,
  variant,
  error,
  searchable = true,
}: SelectInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectOptionType | null>(
    value,
  );
  const [searchText, setSearchText] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    setOpen(false);
    if (onChange) {
      onChange(null);
    }
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    } else {
      setSelected(null);
    }
  }, [value]);

  // return (
  // 	<>
  // 		<div className="relative flex items-center justify-center">
  // 			<Dialog open={open} onOpenChange={setOpen}>
  // 				<DialogTrigger asChild>
  // 					<Button
  // 						variant={variant}
  // 						role="combobox"
  // 						className={cn(
  // 							"w-full justify-between text-black h-13 pr-10 text-base bg-white hover:bg-neutral-300",
  // 							!selected && "text-muted-foreground",
  // 							className,
  // 							error ? "border-red-500 hover:bg-red-50 border" : "hover:bg-neutral-200"
  // 						)}
  // 					>
  // 						<span className="flex items-center">
  // 							{Icon ? Icon : null}
  // 							{selected ? selected.label : `Select ${placeholder}`}
  // 						</span>
  // 						{open ? (
  // 							<IconList.ChevronUp className="ml-1 h-4 w-4 opacity-50" />
  // 						) : (
  // 							<IconList.ChevronDown className="ml-1 h-4 w-4 opacity-50" />
  // 						)}
  // 					</Button>
  // 				</DialogTrigger>
  // 				<DialogOverlay className="z-[999999998]" />
  // 				<DialogContent
  // 					className="max-h-[75vh] !sm:max-w-sm !w-[99vw] z-[999999999] sm:px-6 px-2"
  // 					aria-describedby={undefined}
  // 					onOpenAutoFocus={(e) => {
  // 						e.preventDefault();
  // 					}}
  // 				>
  // 					<DialogHeader>
  // 						<DialogTitle>Select {placeholder}</DialogTitle>
  // 					</DialogHeader>
  // 					<div>
  // 						{searchable && (
  // 							<input
  // 								type="text"
  // 								data-autofocus="false"
  // 								placeholder={`Search${placeholder ? " " + placeholder : ""}...`}
  // 								className="w-full h-13 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  // 								autoFocus={false}
  // 								onChange={(e) => {
  // 									setSearchText(e.target.value);
  // 								}}
  // 								name="SearchInput"
  // 							/>
  // 						)}
  // 					</div>
  // 					<div className="max-h-[55vh] overflow-y-auto">
  // 						<ul className="flex flex-col flex-grow gap-0.5 sm:px-0.5 px-2">
  // 							{list
  // 								.filter((itm) => itm.label.toLowerCase().includes(searchText))
  // 								.sort((a, b) => a.label.localeCompare(b.label))
  // 								.map((item, index) => (
  // 									<React.Fragment key={index}>
  // 										<li
  // 											key={item.value}
  // 											onClick={() => {
  // 												setSelected(item);
  // 												setOpen(false);
  // 												if (onChange) {
  // 													onChange(item);
  // 												}
  // 											}}
  // 											className={`text-base py-1.5 w-full flex items-center justify-start gap-2 z-50 hover:bg-neutral-200 cursor-pointer px-6 relative rounded-sm`}
  // 										>
  // 											<p className="w-full flex items-center">
  // 												{item.label}
  // 												{selected?.value === item.value && (
  // 													<IconList.Check className="mr-2 text-xl text-green-500 absolute left-0" />
  // 												)}
  // 											</p>
  // 										</li>
  // 										<div
  // 											className={`w-full ${
  // 												index <
  // 												list.filter((itm) => itm.label.toLowerCase().includes(searchText))
  // 													.length -
  // 													1
  // 													? "border-b border-gray-200"
  // 													: ""
  // 											}`}
  // 										/>
  // 									</React.Fragment>
  // 								))}
  // 						</ul>
  // 					</div>
  // 				</DialogContent>
  // 			</Dialog>

  // 			{/* Close icon overlaid absolutely on top right */}
  // 			{selected && (
  // 				<IconList.Close
  // 					className="absolute right-3 top-4 text-lg text-muted-foreground hover:text-red-500 cursor-pointer z-10 bg-white"
  // 					onClick={handleClear}
  // 				/>
  // 			)}
  // 		</div>
  // 		{error && <p className="text-red-500 text-xs mt-1 px-2">{error}</p>}
  // 	</>
  // );

  //

  useEffect(() => {
    // close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        scrollRef.current &&
        !scrollRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={scrollRef}>
      <Button
        variant={variant}
        role="combobox"
        className={cn(
          "w-full justify-between text-black h-13 pr-10 text-base bg-white hover:bg-neutral-300",
          !selected && "text-muted-foreground",
          className,
          error
            ? "border-red-500 hover:bg-red-50 border"
            : "hover:bg-neutral-200",
        )}
        onClick={() => {
          // if (scrollRef.current) {
          // 	scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          // }
          // setTimeout(() => {
          // 	// screll to middle of the screen
          // }, 100);
          setOpen(!open);
        }}
      >
        <span className="flex items-center">
          {Icon ? Icon : null}
          {selected ? selected.label : `Select ${placeholder}`}
        </span>
        {open ? (
          <IconList.ChevronUp className="ml-1 h-4 w-4 opacity-50" />
        ) : (
          <IconList.ChevronDown className="ml-1 h-4 w-4 opacity-50" />
        )}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg outline-primary overflow-hidden z-[999999998]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {searchable && (
              <input
                onFocus={(e) => {
                  // scroll to middle of the screen
                  // if (scrollRef.current) {
                  // scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                  // }
                }}
                autoFocus={false}
                type="text"
                placeholder={`Search${placeholder ? " " + placeholder : ""}...`}
                className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary mb-2 z-[999999998]"
                onChange={(e) => setSearchText(e.target.value)}
              />
            )}
            <motion.div className="max-h-[250px] overflow-y-auto z-[999999998]">
              <ul className="flex flex-col gap-1 px-2">
                {list
                  .filter((itm) =>
                    itm.label.toLowerCase().includes(searchText.toLowerCase()),
                  )
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((item, index) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                        if (onChange) {
                          onChange(item);
                        }
                      }}
                      className={`text-base py-2 px-6 cursor-pointer hover:bg-neutral-200 relative ${
                        selected?.value === item.value ? "bg-neutral-300" : ""
                      }`}
                    >
                      {selected?.value === item.value && (
                        <IconList.Check className="absolute left-1 top-1/2 -translate-y-1/2 text-green-500" />
                      )}
                      {item.label}
                    </li>
                  ))}
                {list.filter((itm) =>
                  itm.label.toLowerCase().includes(searchText.toLowerCase()),
                ).length === 0 && (
                  <li className="text-base py-2 px-4 text-muted-foreground">
                    {notFoundText || "No options found"}
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {selected && (
        <IconList.Close
          className="absolute right-3 top-4  text-lg bg-white text-muted-foreground hover:text-red-500 cursor-pointer z-10"
          onClick={handleClear}
        />
      )}
    </div>
  );
}

export default SelectInput;
