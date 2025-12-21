import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getProjects } from "../lib/sanity";
import { socialLinks } from "@/lib/constants";

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [projects, setProjects] = useState<
    { _id: string; slug?: { current: string }; projectName?: string }[]
  >([]);

  useEffect(() => {
    if (!isOpen) return;
    let isCancelled = false;
    (async () => {
      try {
        const data = await getProjects();
        if (!isCancelled) setProjects(data);
      } catch {
        // noop
      }
    })();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      isCancelled = true;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm"
      />

      {/* Right panel (half screen) */}
      <div className="absolute right-0 top-0 h-full md:w-1/2 lg:w-1/2 w-full min-w-[320px] bg-white shadow-2xl border-l border-gray-200 overflow-y-auto">
        <div className="p-8 sm:p-12 h-full flex flex-col gap-12">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-800 text-2xl hover:text-gray-900 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col h-1/2 md:h-full lg:h-full justify-between">
            {/* <div className="flex flex-col gap-4"> */}
            {/* <div>
                <a
                  href="#about"
                  onClick={onClose}
                  className="text-2xl font-medium text-gray-900 hover:underline"
                >
                  About Me
                </a>
              </div> */}

            {/* <div>
              <a
                href="#blog"
                onClick={onClose}
                className="text-xl font-medium text-gray-900 hover:underline"
              >
                Blog
              </a>
            </div> */}

            {/* <div>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="text-2xl font-medium text-gray-900 hover:underline"
                >
                  Get in touch
                </a>
              </div> */}
            {/* </div> */}

            <div>
              <div className="text-lg font-semibold text-[#40764c]">
                My Work
              </div>
              {/* sub list */}
              <ul className="mt-3 flex flex-col gap-4">
                {projects.map((p) => (
                  <li key={p._id}>
                    <a
                      href={`/projects/${p.slug?.current ?? ""}`}
                      onClick={onClose}
                      className="text-2xl text-gray-900 font-medium hover:text-gray-900 hover:underline"
                    >
                      {p.projectName ?? p.slug?.current}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-lg font-semibold text-[#40764c]">Follow</div>
              {/* sub list */}
              <ul className="mt-3 flex items-center gap-4">
                {socialLinks.map((link) => (
                  <li key={link._id}>
                    <a
                      href={link.url}
                      onClick={onClose}
                      className="text-2xl text-gray-900 hover:text-gray-900 hover:underline"
                      title={link.name}
                    >
                      {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>,
    document.body
  );
}
