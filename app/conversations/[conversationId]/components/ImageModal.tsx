"use client";

import Image from "next/image";

import Modal from "@/app/components/Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export default function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 aspect-square">
        <Image alt="Open Image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
}
