import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import Animation from "../../../public/lottie/Animation.json";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}

const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    background: "#101211",
    borderRadius: "8px",
    padding: "10px",
    maxWidth: "500px",
    height: "330px",
    width: "350px",
    margin: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    fontFamily: "Mulish, sans-serif",
  },
  description: {
    marginBottom: "10px",
    color: "var(--mauve-11)",
    fontSize: "13px",
  },
  animationContainer: {
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    height: "200px",
  },
};

const keyframes = `
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
`;

// Dynamically import the Player component to ensure it only loads on the client side
const Player = dynamic(() => import("lottie-react"), { ssr: false });

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <style>{keyframes}</style>
        <Dialog.Overlay style={modalStyles.overlay} />
        <Dialog.Content style={modalStyles.content}>
          <Dialog.Title style={modalStyles.title}>
            Creating Experience...
          </Dialog.Title>
          <Dialog.Description style={modalStyles.description}>
            Please wait, I am creating Experience for you.
          </Dialog.Description>
          <div style={modalStyles.animationContainer}>
            <Player
              autoplay
              loop
              animationData={Animation}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;
