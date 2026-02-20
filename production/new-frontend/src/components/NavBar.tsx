// "use client";
// import React, { useEffect } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
// import Container from "./Container";
// import { endpoints } from "@/lib/consts";
// import AdvanceSearch from "./AdvanceSearch";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Icon from "./Icon";
// import { RegionResponseType, RegionType } from "@/lib/types";
// import { createSlug } from "@/lib/funcs";

// type ActiveDropdownType = "destination" | "way-to-travel" | "experiences";

// type DropdownProps = {
// 	id: ActiveDropdownType;
// 	label: string;
// 	activeDropdown: ActiveDropdownType | null;
// 	setActiveDropdown: React.Dispatch<React.SetStateAction<ActiveDropdownType | null>>;
// 	list: RegionType[];
// 	setOpenNav: (state: boolean) => void;
// };

// function Dropdown({ label, id, activeDropdown, list, setActiveDropdown, setOpenNav }: DropdownProps) {
// 	const [activeRegion, setActiveRegion] = React.useState<number>(0);
// 	const dropdownRef = React.useRef<HTMLDivElement>(null);

// 	function handleTitleClick() {
// 		if (activeDropdown === id) {
// 			setActiveDropdown(null);
// 		} else {
// 			setActiveDropdown(id);
// 		}
// 	}

// 	function handleRegionClick(index: number) {
// 		if (activeRegion === index) {
// 			setActiveRegion(-1); // Collapse if already active
// 			return;
// 		}
// 		setActiveRegion(index);
// 	}

// 	function createLink(link: string, name: string) {
// 		let startWithSlash = link.startsWith("/");
// 		let url = `${startWithSlash ? "" : "/"}${link}`.replace("trips", "trip");
// 		let linkId = url.split("/")[3];
// 		let slug = createSlug(name, linkId);
// 		url = url.replace(linkId, slug);

// 		return url;
// 	}

// 	useEffect(() => {
// 		if (window.innerWidth < 1024) {
// 			setActiveRegion(-1);
// 		}
// 	}, [activeDropdown]);

// 	useEffect(() => {
// 		// close dropdown when clicking outside
// 		function handleClickOutside(event: MouseEvent) {
// 			if (dropdownRef.current && activeDropdown === id && !dropdownRef.current.contains(event.target as Node)) {
// 				setActiveDropdown(null);
// 			}
// 		}
// 		document.addEventListener("click", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("click", handleClickOutside);
// 		};
// 	}, [activeDropdown, setActiveDropdown, dropdownRef]);

// 	return (
// 		<>
// 			<button
// 				onClick={handleTitleClick}
// 				className={`transition-all duration-700 ease-in-out hover:text-secondary font-medium lg:text-base text-xl w-full justify-between flex gap-2 items-center ${
// 					activeDropdown === id ? "text-secondary" : ""
// 				}`}
// 			>
// 				<span>{label}</span>
// 				<Icon.Right
// 					className={`lg:hidden inline-block text-base transition-all ${
// 						activeDropdown === id ? "rotate-90" : "rotate-0"
// 					}`}
// 				/>
// 			</button>
// 			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
// 				{activeDropdown === id ? (
// 					<motion.div
// 						ref={dropdownRef}
// 						key={`Dropdown-menu-${id}`}
// 						exit={{ opacity: 0, height: 0 }}
// 						initial={{ opacity: 0, height: 0 }}
// 						animate={{ opacity: 1, height: "auto" }}
// 						transition={{ duration: 0.3, ease: "easeInOut" }}
// 						className="lg:absolute relative left-0 right-0 lg:top-[8vh] lg:border lg:bg-[#00755d] border-none border-white/30 top-2 z-50 flex rounded-b lg:shadow-lg"
// 					>
// 						<div className="lg:w-1/3 w-full overflow-hidden py-4">
// 							<ul className="lg:px-4 px-2 lg:max-h-[35vh] overflow-y-auto theme-scrollbar text-white">
// 								{list.map((region, index) => (
// 									<React.Fragment key={index}>
// 										<li
// 											className={`mb-1 w-full rounded-sm ${
// 												activeRegion === index
// 													? "lg:border-none border-b border-white/30 lg:pb-0 pb-4"
// 													: ""
// 											}`}
// 										>
// 											<button
// 												className={`px-3 py-2 w-full flex justify-between items-center rounded hover:text-[var(--secondary-color)] hover:bg-[#ffffff3f] ${
// 													activeRegion === index ? "text-secondary" : ""
// 												}`}
// 												onClick={() => handleRegionClick(index)}
// 											>
// 												<span className="w-full text-left lg:text-base text-lg">
// 													{region.name}
// 												</span>
// 												<Icon.Right
// 													className={`inline-block ml-2 text-base transition-all duration-300 ease-in-out ${
// 														activeRegion === index ? "lg:rotate-0 rotate-90" : "rotate-0"
// 													}`}
// 												/>
// 											</button>
// 											<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
// 												{activeRegion === index ? (
// 													<motion.ul
// 														key={`subItems-${index}`}
// 														className={`pl-4 mt-2 max-h lg:hidden block max-h-[30vh] overflow-y-auto theme-scrollbar`}
// 														initial={{ opacity: 0, height: 0 }}
// 														animate={{ opacity: 1, height: "auto" }}
// 														exit={{ opacity: 0, height: 0 }}
// 														transition={{ duration: 0.35, ease: "easeInOut" }}
// 													>
// 														{region.subItems.map((item, subIndex) => (
// 															<li key={subIndex} className="my-1 w-full">
// 																<Link
// 																	href={createLink(item.link, item.name)}
// 																	onClick={() => {
// 																		setOpenNav(false);
// 																		setActiveDropdown(null);
// 																	}}
// 																	className={`block px-4 py-1 text-left rounded hover:text-secondary transition-all`}
// 																>
// 																	{item.name}
// 																</Link>
// 															</li>
// 														))}
// 													</motion.ul>
// 												) : null}
// 											</AnimatePresence>
// 										</li>
// 									</React.Fragment>
// 								))}
// 							</ul>
// 						</div>
// 						<div className="lg:w-2/3 w-1/2 overflow-hidden py-4 lg:block hidden">
// 							<ul className="px-2 max-h-[35vh] overflow-y-auto flex flex-wrap theme-scrollbar">
// 								{list[activeRegion]?.subItems.map((item, index) => (
// 									<li key={index} className="md:w-1/2 w-full my-2 px-3 text-left">
// 										<Link
// 											href={createLink(item.link, item.name)}
// 											onClick={() => {
// 												setActiveDropdown(null);
// 											}}
// 											className="w-full hover:underline hover:text-secondary transition-all"
// 										>
// 											{item.name}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 					</motion.div>
// 				) : null}
// 			</AnimatePresence>
// 		</>
// 	);
// }

// function NavBar() {
// 	const { scrollYProgress } = useScroll();
// 	const pathname = usePathname();
// 	const bgAlpha = useTransform(scrollYProgress, [0, 0.02], ["rgba(0, 117, 93,0)", "rgba(0, 117, 93,1)"]);
// 	// const bgAlpha = useTransform(scrollYProgress, [0, 0.02], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
// 	// const textAlpha = useTransform(scrollYProgress, [0, 0.02], ["rgba(255, 255, 255, 1)", "rgba(0, 117, 93, 1)"]);
// 	// const shadowAlpha = useTransform(
// 	// 	scrollYProgress,
// 	// 	[0, 0.02],
// 	// 	[
// 	// 		"2px 2px 16px 4px rgba(0, 0, 0, 0)",
// 	// 		"var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
// 	// 	]
// 	// );

// 	const [activeDropdown, setActiveDropdown] = React.useState<ActiveDropdownType | null>(null);

// 	const [destinations, setDestinations] = React.useState<RegionType[]>([]);
// 	const [waysToTravel, setWaysToTravel] = React.useState<RegionType[]>([]);
// 	const [experiences, setExperiences] = React.useState<RegionType[]>([]);
// 	const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

// 	const [openNav, setOpenNav] = React.useState<boolean>(false);

// 	const navItemsRef = React.useRef<HTMLUListElement>(null);

// 	async function getDestinations() {
// 		try {
// 			const response = await fetch(endpoints.nav.destinations);
// 			if (!response.ok) {
// 				throw new Error("Failed to fetch destinations");
// 			}
// 			const data = (await response.json()) as RegionResponseType;
// 			setDestinations(data.data.items);
// 		} catch (error) {
// 			console.error("Error fetching destinations:", error);
// 		}
// 	}

// 	async function getWaysToTravel() {
// 		try {
// 			const response = await fetch(endpoints.nav.waysToTravel);
// 			if (!response.ok) {
// 				throw new Error("Failed to fetch ways to travel");
// 			}
// 			const data = (await response.json()) as RegionResponseType;
// 			setWaysToTravel(data.data.items);
// 		} catch (error) {
// 			console.error("Error fetching ways to travel:", error);
// 		}
// 	}

// 	async function getExperiences() {
// 		try {
// 			const response = await fetch(endpoints.nav.experiences);
// 			if (!response.ok) {
// 				throw new Error("Failed to fetch experiences");
// 			}
// 			const data = (await response.json()) as RegionResponseType;
// 			setExperiences(data.data.items);
// 		} catch (error) {
// 			console.error("Error fetching experiences:", error);
// 		}
// 	}

// 	useEffect(() => {
// 		getDestinations();
// 		getWaysToTravel();
// 		getExperiences();
// 	}, []);

// 	useEffect(() => {
// 		// close nav when clicking outside
// 		function handleClickOutside(event: MouseEvent) {
// 			if (navItemsRef.current && openNav && !navItemsRef.current.contains(event.target as Node)) {
// 				setOpenNav(false);
// 			}
// 		}
// 		document.addEventListener("click", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("click", handleClickOutside);
// 		};
// 	}, [openNav, setOpenNav, navItemsRef]);

// 	return (
// 		<>
// 			<motion.nav
// 				className={`fixed top-0 left-0 right-0 z-[999] h-[8vh] text-white w-full flex items-center transition-colors`}
// 				style={{
// 					backgroundColor: openNav ? "#00755d" : pathname !== "/" ? "#00755d" : bgAlpha,
// 					// boxShadow: shadowAlpha,
// 				}}
// 			>
// 				<Container className="w-full h-[8vh] flex justify-between items-center">
// 					<div className="">
// 						<Link href="/">
// 							<motion.img
// 								src="/logo.png"
// 								// grayscale brightness-200 contrast-200
// 								className="sm:h-[5vh] h-[4vh] w-auto grayscale brightness-200 contrast-200"
// 							/>
// 						</Link>
// 					</div>
// 					<div className="flex w-fit h-full">
// 						<motion.ul
// 							ref={navItemsRef}
// 							className={`flex lg:items-center lg:justify-center
// 								lg:px-0 sm:px-20 px-[10vw]
// 								lg:py-0 py-12
// 								lg:gap-5 gap-6
// 								lg:relative absolute
// 								lg:flex-row flex-col
// 								lg:top-0 top-[8vh]
// 								lg:right-0 right-0
// 								lg:h-full h-[calc(100vh-8vh)]
// 								lg:bg-transparent text-white
// 								lg:w-fit w-full
// 								lg:max-w-fit max-w-[600px]
// 								lg:overflow-y-visible overflow-y-auto theme-scrollbar
// 								transition-all duration-300 ease-in-out
// 								${openNav ? "translate-x-0 bg-[#00755def]" : "lg:translate-x-0 translate-x-full"}
// 							`}
// 							// style={{ color: openNav ? "#fff" : textAlpha }}
// 						>
// 							<li
// 								className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
// 									transition-all duration-300 ease-in-out
// 									${activeDropdown === "destination" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
// 							>
// 								<Dropdown
// 									label="Destination"
// 									id="destination"
// 									activeDropdown={activeDropdown}
// 									setActiveDropdown={setActiveDropdown}
// 									list={destinations}
// 									setOpenNav={setOpenNav}
// 								/>
// 							</li>
// 							<li
// 								className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
// 									transition-all duration-300 ease-in-out
// 									${activeDropdown === "way-to-travel" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
// 							>
// 								<Dropdown
// 									label="Way to Travel"
// 									id="way-to-travel"
// 									activeDropdown={activeDropdown}
// 									setActiveDropdown={setActiveDropdown}
// 									list={waysToTravel}
// 									setOpenNav={setOpenNav}
// 								/>
// 							</li>
// 							<li
// 								className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
// 									transition-all duration-300 ease-in-out
// 									${activeDropdown === "experiences" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
// 							>
// 								<Dropdown
// 									label="Experiences"
// 									id="experiences"
// 									activeDropdown={activeDropdown}
// 									setActiveDropdown={setActiveDropdown}
// 									list={experiences}
// 									setOpenNav={setOpenNav}
// 								/>
// 							</li>
// 							<li>
// 								<a
// 									href="/about-us"
// 									className="transition-all hover:text-secondary font-medium lg:text-base text-xl"
// 								>
// 									About Us
// 								</a>
// 							</li>
// 							<li>
// 								<a
// 									href="/faq"
// 									className="transition-all hover:text-secondary font-medium lg:text-base text-xl"
// 								>
// 									FAQ
// 								</a>
// 							</li>
// 							<li>
// 								<a
// 									href="/contact-us"
// 									className="transition-all hover:text-secondary font-medium lg:text-base text-xl"
// 								>
// 									Contact Us
// 								</a>
// 							</li>
// 							<li className="hidden lg:block">
// 								<button
// 									onClick={() => setSearchOpen(true)}
// 									className={`hover:text-secondary ${searchOpen ? "text-theme" : ""}`}
// 								>
// 									<Icon.Search className="text-2xl" />
// 								</button>
// 							</li>
// 						</motion.ul>
// 					</div>
// 					<div className="lg:hidden flex md:gap-6 gap-4 items-center justify-center">
// 						<a href="/contact-us" className={`${searchOpen ? "text-theme" : ""}`}>
// 							<Icon.Phone className="md:text-2xl text-xl text-white hover:text-secondary" />
// 						</a>
// 						<button onClick={() => setSearchOpen(true)} className={`${searchOpen ? "text-secondary" : ""}`}>
// 							<Icon.Search className="md:text-2xl text-xl text-white hover:text-secondary" />
// 						</button>
// 						<button
// 							className="flex flex-col justify-center items-center gap-1.5"
// 							onClick={() => setOpenNav(!openNav)}
// 						>
// 							{/* when openNav is true this bar need to rotate 45 degrees */}
// 							<div
// 								className={`sm:w-8 w-7 h-[2px] rounded-md bg-white transition-all origin-left duration-500
// 								${openNav ? "rotate-45 sm:translate-y-[-3px] translate-y-[-2px]" : ""}
// 								`}
// 							></div>
// 							{/* when openNav is true this bar need to rotate -45 degrees */}
// 							<div
// 								className={`sm:w-8 w-7 h-[2px] rounded-md bg-white transition-all duration-500
// 								${openNav ? "scale-x-0" : "scale-x-100"}
// 								`}
// 							></div>
// 							{/* when openNav is true this bar need to rotate -45 degrees */}
// 							<div
// 								className={`sm:w-8 w-7 h-[2px] rounded-md bg-white transition-all origin-left duration-500
// 								${openNav ? "-rotate-45 sm:translate-y-[3px] translate-y-[2px]" : ""}
// 								`}
// 							></div>
// 						</button>
// 					</div>
// 				</Container>
// 			</motion.nav>
// 			<AdvanceSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
// 		</>
// 	);
// }

// export default NavBar;

"use client";
import React, { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Container from "./Container";
import { endpoints } from "@/lib/consts";
import AdvanceSearch from "./AdvanceSearch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "./Icon";
import {
  ImageType,
  RegionResponseType,
  RegionType,
  ResponseType,
} from "@/lib/types";
import { createSlug, extractIdFromSlug } from "@/lib/funcs";

type ActiveDropdownType =
  | "destination"
  | "way-to-travel"
  | "experiences"
  | "why-us";

type DropdownProps = {
  id: ActiveDropdownType;
  label: string;
  activeDropdown: ActiveDropdownType | null;
  setActiveDropdown: React.Dispatch<
    React.SetStateAction<ActiveDropdownType | null>
  >;
  list: RegionType[];
  setOpenNav: (state: boolean) => void;
};

function Dropdown({
  label,
  id,
  activeDropdown,
  list,
  setActiveDropdown,
  setOpenNav,
}: DropdownProps) {
  const [activeRegion, setActiveRegion] = React.useState<number>(0);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  function handleTitleClick() {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  }

  function handleRegionClick(index: number) {
    if (activeRegion === index) {
      setActiveRegion(-1); // Collapse if already active
      return;
    }
    setActiveRegion(index);
  }

  function createLink(link: string, name: string) {
    let startWithSlash = link.startsWith("/");
    let url = `${startWithSlash ? "" : "/"}${link}`.replace("trips", "trip");
    let linkId = "";

    if (typeof url === "string") {
      const parts = url.split("/");
      linkId = parts[3] || "";
    }

    let slug = createSlug(name, linkId);
    url = url.replace(linkId, slug);

    return url;
  }

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setActiveRegion(-1);
    }
  }, [activeDropdown]);

  useEffect(() => {
    // close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        activeDropdown === id &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown, setActiveDropdown, dropdownRef]);

  return (
    <>
      <button
        onClick={handleTitleClick}
        className={`hover:text-secondary font-medium lg:text-base text-xl w-full justify-between flex gap-2 items-center ${
          activeDropdown === id ? "text-secondary" : ""
        }`}
      >
        <span>{label}</span>
        <Icon.Right
          className={`lg:hidden inline-block text-base transition-all ${
            activeDropdown === id ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {activeDropdown === id ? (
          <motion.div
            ref={dropdownRef}
            key={`Dropdown-menu-${id}`}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:absolute relative left-0 right-0 lg:top-[8vh] lg:border lg:bg-[#fff] border-none border-white/30 top-2 z-50 flex rounded-b-sm lg:shadow-lg"
          >
            <div className="lg:w-1/3 w-full overflow-hidden py-4">
              <ul className="lg:px-4 px-2 lg:max-h-[35vh] overflow-y-auto theme-scrollbar text-primary">
                {list.map((region, index) => (
                  <React.Fragment key={index}>
                    <li
                      className={`mb-1 w-full rounded-sm ${
                        activeRegion === index
                          ? "lg:border-none border-b border-white/30 lg:pb-0 pb-4"
                          : ""
                      }`}
                    >
                      <button
                        className={`px-3 py-2 w-full flex justify-between items-center rounded hover:text-[var(--secondary-color)] hover:bg-[#00000008] ${
                          activeRegion === index ? "text-secondary" : ""
                        }`}
                        onClick={() => handleRegionClick(index)}
                      >
                        <span className="w-full text-left lg:text-base text-lg">
                          {region.name}
                        </span>
                        <Icon.Right
                          className={`inline-block ml-2 text-base transition-all duration-300 ease-in-out ${
                            activeRegion === index
                              ? "lg:rotate-0 rotate-90"
                              : "rotate-0"
                          }`}
                        />
                      </button>
                      <AnimatePresence
                        initial={false}
                        mode="wait"
                        onExitComplete={() => null}
                      >
                        {activeRegion === index ? (
                          <motion.ul
                            key={`subItems-${index}`}
                            className={`pl-4 mt-2 lg:hidden block max-h-[30vh] overflow-y-auto theme-scrollbar`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            {region.subItems.map((item, subIndex) => (
                              <li key={subIndex} className="my-1 w-full">
                                <Link
                                  href={createLink(item.link, item.name)}
                                  onClick={() => {
                                    setOpenNav(false);
                                    setActiveDropdown(null);
                                  }}
                                  className={`block px-4 py-1 text-left rounded hover:text-secondary transition-all`}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/3 w-1/2 overflow-hidden py-4 lg:block hidden text-primary">
              <ul className="px-2 max-h-[35vh] overflow-y-auto flex flex-wrap theme-scrollbar">
                {list[activeRegion]?.subItems.map((item, index) => (
                  <li
                    key={index}
                    className="md:w-1/2 w-full my-2 px-3 text-left"
                  >
                    <Link
                      href={createLink(item.link, item.name)}
                      onClick={() => {
                        setActiveDropdown(null);
                      }}
                      className="w-full hover:underline hover:text-secondary transition-all"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavBar() {
  const whyUsDropdownRef = React.useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  // const bgAlpha = useTransform(scrollYProgress, [0, 0.02], ["rgba(0, 117, 93,0)", "rgba(0, 117, 93,1)"]);
  const bgAlpha = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"],
  );
  const textAlpha = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["rgba(255, 255, 255, 1)", "rgba(0, 117, 93, 1)"],
  );
  const shadowAlpha = useTransform(
    scrollYProgress,
    [0, 0.02],
    [
      "2px 2px 16px 4px rgba(0, 0, 0, 0)",
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    ],
  );
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.02],
    [
      "grayscale(1) brightness(2) contrast(2)", // At top
      "grayscale(0) brightness(1) contrast(1)", // After scrolling
    ],
  );

  const [activeDropdown, setActiveDropdown] =
    React.useState<ActiveDropdownType | null>(null);

  const [destinations, setDestinations] = React.useState<RegionType[]>([]);
  const [waysToTravel, setWaysToTravel] = React.useState<RegionType[]>([]);
  const [experiences, setExperiences] = React.useState<RegionType[]>([]);
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const navItemsRef = React.useRef<HTMLUListElement>(null);

  const [expierienceHasCoverImage, setExperienceHasCoverImage] =
    React.useState<boolean>(false);
  const [countryHasCoverImage, setCountryHasCoverImage] =
    React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function getDestinations() {
    try {
      const response = await fetch(endpoints.nav.destinations);
      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }
      const data = (await response.json()) as RegionResponseType;
      setDestinations(data.data.items);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  }

  async function getWaysToTravel() {
    try {
      const response = await fetch(endpoints.nav.waysToTravel);
      if (!response.ok) {
        throw new Error("Failed to fetch ways to travel");
      }
      const data = (await response.json()) as RegionResponseType;
      setWaysToTravel(data.data.items);
    } catch (error) {
      console.error("Error fetching ways to travel:", error);
    }
  }

  async function getExperiences() {
    try {
      const response = await fetch(endpoints.nav.experiences);
      if (!response.ok) {
        throw new Error("Failed to fetch experiences");
      }
      const data = (await response.json()) as RegionResponseType;
      setExperiences(data.data.items);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  async function checkExperienceHasCoverImage() {
    const expierienceId = pathname.split("--")[1];
    try {
      const imgResponse = await fetch(
        `${endpoints.experiences(expierienceId)}/images`,
      );
      if (!imgResponse.ok) {
        console.error("Failed to fetch experience images");
        setExperienceHasCoverImage(false);
      } else {
        const imgData = (
          (await imgResponse.json()) as ResponseType<ImageType[]>
        ).data[0];
        setExperienceHasCoverImage(Boolean(imgData ? imgData.imageUrl : null));
      }
    } catch (error) {
      console.error("Error fetching experience images:", error);
      setExperienceHasCoverImage(false);
    }
  }

  async function checkCountryHasCoverImage() {
    const countryId = pathname.split("--")[1];
    try {
      const imgResponse = await fetch(endpoints.countryDetails(countryId));
      if (!imgResponse.ok) {
        console.error("Failed to fetch country images");
        setCountryHasCoverImage(false);
      } else {
        const imgData = (await imgResponse.json()) as ResponseType<any>;
        setCountryHasCoverImage(Boolean(imgData.data.imageUrl));
      }
    } catch (error) {
      console.error("Error fetching country images:", error);
      setCountryHasCoverImage(false);
    }
  }

  function getNavBackgroundColor() {
    if (openNav || activeDropdown) return "#fff";

    const isLightPath =
      pathname.includes("/themes/") ||
      pathname.includes("/styles/") ||
      pathname.includes("/about-us") ||
      pathname.includes("/faq") ||
      pathname.includes("/contact-us") ||
      expierienceHasCoverImage ||
      countryHasCoverImage;

    if (pathname !== "/") {
      return isLightPath ? bgAlpha : "#fff";
    }
    return bgAlpha;
  }

  useEffect(() => {
    getDestinations();
    getWaysToTravel();
    getExperiences();
  }, []);

  useEffect(() => {
    // close nav when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        navItemsRef.current &&
        openNav &&
        !navItemsRef.current.contains(event.target as Node)
      ) {
        setOpenNav(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openNav, setOpenNav, navItemsRef]);

  useEffect(() => {
    // close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        whyUsDropdownRef.current &&
        activeDropdown === "why-us" &&
        !whyUsDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown, setActiveDropdown, whyUsDropdownRef]);

  useEffect(() => {
    if (pathname.includes("/experiences/")) {
      checkExperienceHasCoverImage();
    } else {
      setExperienceHasCoverImage(false);
    }
    if (pathname.includes("/countries/")) {
      checkCountryHasCoverImage();
    } else {
      setCountryHasCoverImage(false);
    }
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[999] h-[8vh] text-primary w-full flex items-center transition-colors shadow-2xl`}
        style={{
          backgroundColor: getNavBackgroundColor(),
          boxShadow:
            pathname !== "/"
              ? pathname.includes("/themes/") ||
                pathname.includes("/styles/") ||
                pathname.includes("/about-us") ||
                pathname.includes("/faq") ||
                pathname.includes("/contact-us") ||
                expierienceHasCoverImage ||
                countryHasCoverImage
                ? activeDropdown
                  ? "0px 2px 12px 4px rgba(0, 0, 0, 0.1)"
                  : shadowAlpha
                : "0px 2px 12px 4px rgba(0, 0, 0, 0.1)"
              : shadowAlpha,
        }}
      >
        <Container className="w-full h-[8vh] flex justify-between items-center px-4">
          <div className="h-full">
            <Link href="/">
              <motion.img
                src="/logo.png"
                alt="Logo"
                // grayscale brightness-200 contrast-200
                className={`h-1/2 w-auto mt-4`}
                style={{
                  filter: openNav
                    ? "none"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? activeDropdown
                          ? "none"
                          : imageFilter
                        : "none"
                      : activeDropdown
                        ? "none"
                        : imageFilter,
                }}
              />
            </Link>
          </div>
          <div className="flex w-fit h-full">
            <motion.ul
              ref={navItemsRef}
              className={`flex lg:items-center lg:justify-end 
								lg:px-0 sm:px-20 px-[10vw]
								lg:py-0 py-12
								lg:gap-5 gap-6
								lg:relative absolute 
								lg:flex-row flex-col
								lg:top-0 top-[8vh]
								lg:right-0 right-0
								lg:h-full h-[calc(100vh-8vh)]
								lg:bg-transparent 
								lg:text-white text-[var(--primary-color)]
								lg:w-150 w-full 
								lg:max-w-150 max-w-[600px]
								lg:overflow-y-visible overflow-y-auto theme-scrollbar
									
								${openNav ? "translate-x-0 bg-[#ffffffef]" : "lg:translate-x-0 translate-x-full"}						
							`}
              style={{
                color: openNav
                  ? "#00755d"
                  : activeDropdown
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
              }}
            >
              <li
                className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
									
									${activeDropdown === "destination" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
              >
                <Dropdown
                  label="Destination"
                  id="destination"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  list={destinations}
                  setOpenNav={setOpenNav}
                />
              </li>
              <li
                className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
									
									${activeDropdown === "way-to-travel" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
              >
                <Dropdown
                  label="Way to Travel"
                  id="way-to-travel"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  list={waysToTravel}
                  setOpenNav={setOpenNav}
                />
              </li>
              <li
                className={`relative lg:static w-full lg:w-auto text-center lg:px-0 lg:border-none
									
									${activeDropdown === "experiences" ? "lg:pb-0 pb-4 border-b border-white/70" : ""}`}
              >
                <Dropdown
                  label="Experiences"
                  id="experiences"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  list={experiences}
                  setOpenNav={setOpenNav}
                />
              </li>
              <li className="relative">
                <button
                  className="transition-all hover:text-secondary font-medium lg:text-base text-xl w-full flex justify-between"
                  onClick={() => {
                    if (activeDropdown === "why-us") {
                      setActiveDropdown(null);
                    } else {
                      setActiveDropdown("why-us");
                    }
                  }}
                >
                  <span>Why Us</span>
                  <Icon.Right
                    className={`lg:hidden inline-block text-base transition-all ${
                      activeDropdown === "why-us" ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </button>
                <AnimatePresence
                  initial={false}
                  mode="wait"
                  onExitComplete={() => null}
                >
                  {activeDropdown === "why-us" ? (
                    <motion.ul
                      ref={whyUsDropdownRef}
                      className="lg:absolute top-[5.3vh] left-1/2 right-0 lg:w-52 w-full lg:-translate-x-1/2 lg:bg-white lg:shadow-lg rounded-b-sm overflow-hidden lg:py-0 py-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <li>
                        <Link
                          href="/about-us"
                          className="transition-all hover:text-secondary font-medium lg:text-base text-lg"
                          onClick={() => {
                            setActiveDropdown(null);
                            setOpenNav(false);
                          }}
                        >
                          <div className="w-full px-4 py-2 hover:bg-[#00000008] rounded">
                            About Us
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/faq"
                          className="transition-all hover:text-secondary font-medium lg:text-base text-lg"
                          onClick={() => {
                            setActiveDropdown(null);
                            setOpenNav(false);
                          }}
                        >
                          <div className="w-full px-4 py-2 hover:bg-[#00000008] rounded">
                            FAQ
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact-us"
                          className="transition-all hover:text-secondary font-medium lg:text-base text-lg"
                          onClick={() => {
                            setActiveDropdown(null);
                            setOpenNav(false);
                          }}
                        >
                          <div className="w-full px-4 py-2 hover:bg-[#00000008] rounded">
                            Contact Us
                          </div>
                        </Link>
                      </li>
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </li>

              <li className="hidden lg:block">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`hover:text-secondary ${searchOpen ? "text-theme" : ""}`}
                >
                  <Icon.Search className="text-2xl" />
                </button>
              </li>
            </motion.ul>
          </div>
          <div className="lg:hidden flex md:gap-6 gap-4 items-center justify-center">
            <Link
              href="/contact-us"
              className={`${searchOpen ? "text-theme" : ""}`}
            >
              <motion.span
                style={{
                  color: openNav
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
                }}
              >
                <Icon.Phone className="md:text-2xl text-xl hover:text-secondary" />
              </motion.span>
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className={`${searchOpen ? "text-secondary" : ""}`}
            >
              <motion.span
                style={{
                  color: openNav
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
                }}
              >
                <Icon.Search className="md:text-2xl text-xl hover:text-secondary" />
              </motion.span>
            </button>
            <button
              className="flex flex-col justify-center items-center gap-1.5"
              onClick={() => setOpenNav(!openNav)}
            >
              {/* when openNav is true this bar need to rotate 45 degrees */}
              <motion.div
                className={`sm:w-8 w-7 h-[2px] rounded-md transition-all origin-left duration-500 
								${openNav ? "rotate-45 sm:translate-y-[-3px] translate-y-[-2px]" : ""}
								`}
                style={{
                  backgroundColor: openNav
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
                }}
              ></motion.div>
              {/* when openNav is true this bar need to rotate -45 degrees */}
              <motion.div
                className={`sm:w-8 w-7 h-[2px] rounded-md transition-all duration-500
								${openNav ? "scale-x-0" : "scale-x-100"}
								`}
                style={{
                  backgroundColor: openNav
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
                }}
              ></motion.div>
              {/* when openNav is true this bar need to rotate -45 degrees */}
              <motion.div
                className={`sm:w-8 w-7 h-[2px] rounded-md transition-all origin-left duration-500
								${openNav ? "-rotate-45 sm:translate-y-[3px] translate-y-[2px]" : ""}
								`}
                style={{
                  backgroundColor: openNav
                    ? "#00755d"
                    : pathname !== "/"
                      ? pathname.includes("/themes/") ||
                        pathname.includes("/styles/") ||
                        pathname.includes("/about-us") ||
                        pathname.includes("/faq") ||
                        pathname.includes("/contact-us") ||
                        expierienceHasCoverImage ||
                        countryHasCoverImage
                        ? textAlpha
                        : "#00755d"
                      : textAlpha,
                }}
              ></motion.div>
            </button>
          </div>
        </Container>
      </motion.nav>
      <AdvanceSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  );
}

export default NavBar;
