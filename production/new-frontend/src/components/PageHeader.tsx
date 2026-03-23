import { cn } from "@/lib/utils";
import React from "react";

type PageHeaderProps = {
  details: {
    name: string;
  };
  img?: string;
  description?: string | null;
  tags?: string[];
};

function PageHeader({ details, description, tags }: PageHeaderProps) {
  return (
    <div className="w-full relative h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 h-screen bg-gradient-to-b -z-30 from-[#0b4525d3] to-[#66666600]" />
      <div className="text-white z-10 pb-32 sticky top-[10vh] flex flex-col justify-center items-center bg-no-repeat w-full">
        <h1 className="md:text-7xl sm:text-6xl text-5xl font-bold font-dm-serif-display mb-4 w-full text-center z-20">
          {details.name}
        </h1>
        <h2
          className={cn(
            "sm:text-3xl text-xl text-center font-thin pb-6 border-gray-200 px-2 z-20",
            description && description.length ? "" : "border-b pb-4",
          )}
        >
          Explorer Our {details.name} Trips
        </h2>
        {description && description.length ? (
          <div
            className="mt-4 text-base text-gray-50 max-w-4xl flex flex-col justify-center text-center pt-6 border-t border-gray-200 px-2"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        ) : null}
        {tags && (
          <ul className="flex gap-2 mt-4">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="text-lg bg-black/70 border border-primary rounded-xl text-white overflow-hidden"
              >
                <div className="bg-primary-30 w-full h-full px-4 py-0.5">
                  {tag}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
