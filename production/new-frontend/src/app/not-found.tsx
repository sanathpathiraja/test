import React from "react";

function notfound() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col items-center">
				<span className="text-8xl text-primary">404</span>
				<h2 className="text-2xl">Page Not Found</h2>
			</div>
		</div>
	);
}

export default notfound;
