import Loading from "@/components/Loading";
import React from "react";

function loading() {
	return (
		<div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white z-[9999999999]">
			<div className="flex flex-col items-center justify-center">
				<Loading />
				<div className="text-gray-900 text-lg font-thin pt-4 pl-4">
					<span className="scale-x-110 inline-block">LOADING</span>
					<span className="animate-caret-blink delay-0 ml-1.5">.</span>
					<span className="animate-caret-blink delay-100">.</span>
					<span className="animate-caret-blink delay-200">.</span>
				</div>
			</div>
		</div>
	);
}

export default loading;
