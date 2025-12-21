import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { urlFor } from "../lib/sanity";

interface ImageGalleryProps {
  images: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  altText?: string;
}

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const hasMultipleImages = images && images.length > 1;

  const goToPrevious = () => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousModal = () => {
    if (!images || images.length === 0) return;
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextModal = () => {
    if (!images || images.length === 0) return;
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft" && images && images.length > 0) {
        setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && images && images.length > 0) {
        setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="rounded-2xl overflow-hidden relative group">
        <img
          src={urlFor(images[currentIndex]).quality(90).fit("max").url()}
          alt={images[currentIndex]?.alt || altText || "Gallery image"}
          className="w-full h-auto cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => openModal(currentIndex)}
        />

        {hasMultipleImages && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ArrowRight size={20} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <div className="relative w-full flex items-center justify-center">
              {hasMultipleImages && (
                <button
                  onClick={goToPreviousModal}
                  className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <img
                src={urlFor(images[modalIndex]).quality(95).fit("max").url()}
                alt={images[modalIndex]?.alt || altText || "Enlarged image"}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              {hasMultipleImages && (
                <button
                  onClick={goToNextModal}
                  className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight size={24} />
                </button>
              )}
            </div>

            {/* Caption */}
            {images[modalIndex]?.alt && (
              <div className="mt-4 text-white text-center max-w-2xl">
                <p className="text-lg">{images[modalIndex].alt}</p>
                {hasMultipleImages && (
                  <p className="text-sm text-gray-400 mt-2">
                    {modalIndex + 1} of {images.length}
                  </p>
                )}
              </div>
            )}
            {!images[modalIndex]?.alt && hasMultipleImages && (
              <div className="mt-4 text-white text-center">
                <p className="text-sm text-gray-400">
                  {modalIndex + 1} of {images.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

