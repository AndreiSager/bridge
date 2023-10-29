"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

import useConversation from "@/app/hooks/useConversation";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";

interface DeleteModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function DeleteModal({ isOpen, onClose }: DeleteModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex w-12 aspect-square flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:w-10">
          <FiAlertTriangle className="w-6 aspect-square text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2 ">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be reverted!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 flex sm:flex-row-reverse gap-2">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
