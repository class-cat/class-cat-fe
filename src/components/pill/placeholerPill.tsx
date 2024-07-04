import React from "react";
import { Icons } from "../icons";

export default function PlaceholderPill(){
  return (
    <div className="relative flex items-center gap-4 rounded-2xl border-2 border-secondary p-2 mt-2">
      <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-secondary opacity-50 animate-pulse-slow"></div>
      </div>
      <div className="flex-1">
        <div className="h-4 w-1/3 bg-secondary opacity-50 rounded animate-pulse mb-2"></div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-1/2 bg-secondary opacity-50 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1 pt-1">
        <div className="h-3 w-1/2 bg-secondary opacity-50 rounded animate-pulse"></div>
        </div>
      </div>
      <Icons.badge
          className="absolute right-[10px] top-[-15px] h-8 w-8"
          color={"#FFFEFB"}
        />{" "}    </div>
  );
};

