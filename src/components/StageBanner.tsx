import Link from "next/link";
import React, { useRef } from "react";
import Xmark from "@/icons/Xmark";

const StageBanner = () => {
  const banner = useRef<HTMLDivElement | null>(null);
  const close = () => {
    banner.current!.style.display = "none";
  };
  return (
    <div
      ref={banner}
      className="fixed z-[100] flex w-screen bg-red-300 py-2 backdrop-blur"
    >
      <button onClick={close} className="my-auto flex justify-end">
        <Xmark className={"w-8"} color="white" />
      </button>
      <div className="my-auto pl-12 text-white">
        This website is being completely rebuilt (when time allows - not a
        priority) as such it is broken. Github{" "}
        <Link
          href={"https://github.com/MikeFreno/notekeeper-t3"}
          className="text-blue-400 underline underline-offset-4"
        >
          link
        </Link>
      </div>
    </div>
  );
};

export default StageBanner;
