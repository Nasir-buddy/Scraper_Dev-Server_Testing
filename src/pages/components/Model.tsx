import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";

type Step = {
  id: number;
  name: string;
  completed?: boolean;
  current?: boolean;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  step: Step | null;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, step }) => {
  if (!step) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-8 rounded-lg w-full flex"
          style={{
            backgroundColor: "#101211",
            maxWidth: "800px",
            width: "90%",
          }}
        >
          <div className="flex-1">
            <div className="relative">
              <div className="flex items-center mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#254D41" }}
                >
                  <span className="text-white font-bold">{step.id}</span>
                </div>
                <h2 className="text-xl font-bold">{step.name}</h2>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <div className="flex gap-4 mt-6">
                <button
                  className="text-black py-2 px-4 rounded-full font-bold min-w-[150px] focus:outline-none focus:ring-0"
                  style={{ backgroundColor: "#3EB489" }}
                >
                  Next
                </button>
                <button
                  className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-colors min-w-[150px]"
                  onClick={onClose}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="relative flex-shrink-0 w-24 h-24 ml-6 mt-14">
            <svg viewBox="0 0 100 100" className="w-full h-full"></svg>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
