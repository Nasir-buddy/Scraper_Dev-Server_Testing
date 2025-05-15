import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {  ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Text, Box } from "@radix-ui/themes";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { useRouter } from "next/router";
import { QuizFormDataType } from "../../schemas/quiz.schema";

const generateChartData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    name: i,
    value: Math.floor(Math.random() * 100),
  }));
};

const steps = [
  { id: 1, name: "Retrieve Products", completed: true, current: true },
  { id: 2, name: "Start Creating Experience", link: "/dashboard" },
  { id: 3, name: "Fill Basic Info" },
  { id: 4, name: "Select Scope" },
];

const accountRoiData = generateChartData(12);

interface Step {
  id: number;
  name: string;
  completed?: boolean;
  current?: boolean;
  link?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: Step | null;
}

function Modal({ isOpen, onClose, step }: ModalProps) {
  const router = useRouter();
  if (!isOpen || !step) return null;
  const handleClick = (id: number) => {
    if (step.link) {
      router.push(step.link);
    }
  };
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
          <Dialog.Title className="sr-only">Step Details</Dialog.Title>
          <Dialog.Description className="sr-only">
            Detailed information about the current step in the onboarding process.
          </Dialog.Description>
          <div className="flex-1">
            <div className="relative">
              <div className="flex items-center mb-4">
                <div
                  className="w-8 h-8  rounded-full flex items-center justify-center mr-3"
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
                  onClick={() => handleClick(step.id)}
                  className="text-black py-2 px-4 rounded-full font-bold min-w-[150px] focus:outline-none focus:ring-0"
                  style={{ backgroundColor: "#3EB489" }}
                >
                  Next
                </button>
                <button className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-colors min-w-[150px]">
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="relative flex-shrink-0 w-24 h-24 ml-6 mt-14">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="70" r="20" fill="#4B5563" />
              <circle cx="50" cy="40" r="15" fill="#4B5563" />
              <rect x="40" y="85" width="20" height="15" fill="#4B5563" />
              <path
                d="M20,100 Q50,70 80,100"
                fill="none"
                stroke="#4B5563"
                strokeWidth="5"
              />
              <path
                d="M30,0 L50,20 L70,0"
                fill="none"
                stroke="#4B5563"
                strokeWidth="5"
              />
              <rect x="30" y="20" width="40" height="60" fill="#4B5563" />
              <path d="M30,80 L50,100 L70,80" fill="#4B5563" />
            </svg>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface PlatFormStartProps {
  quiz: QuizFormDataType | null;
}

export default function PlatFormStart({ quiz }: PlatFormStartProps) {
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const handleStepClick = (step: Step) => {
    setSelectedStep(step);
    setModalOpen(true);
  };

  const filteredSteps = quiz
    ? steps.filter((step) => step.id !== 2)
    : steps;

  return (
    <Box className="bg-black text-gray-100 pt-6 pb-6 mt-10">
      <Box className="flex flex-row gap-6">
        <Box className="lg:w-1/4 w-full rounded-lg" style={{ backgroundColor: "#101211" }}>
          <Box className="rounded-lg p-6 mb-6 flex flex-col h-full">
            <div>
              <Text className="text-2xl text-light mb-4">
                Overall Account ROI
              </Text>
              <p className="text-3xl text-white mb-2 pt-6">
                O% <ArrowTopRightIcon className="inline" />
              </p>
            </div>
            <Box className="mt-auto">
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={accountRoiData as any}>
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>

        <Box
          className="lg:w-3/4 w-full px-5 rounded-lg"
          style={{ backgroundColor: "#101211" }}
        >
          <Box className="p-2 py-6 rounded-lg">
            <Text className="text-2xl text-white ml-4 mb-28">Onboarding</Text>
            <ul className="space-y-1.5">
              {filteredSteps.map((step,index) => (
                <li
                  key={index}
                  className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700"
                  onClick={() => handleStepClick(step)}
                >
                  <Box
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full mr-2 font-bold"
                    style={{
                      backgroundColor: step.completed
                        ? "#254D41"
                        : step.current
                        ? "#254D41"
                        : "#000000",
                      color: step.current ? "#10B981" : "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      className="text-xs font-medium hover:text-yellow-400 transition-colors"
                      style={{ color: step.current ? "#10B981" : "#FFFFFF" }}
                    >
                      {index+1}
                    </span>
                  </Box>
                  <Box className="flex-grow flex items-center justify-between bg-black p-2 px-3 rounded-full">
                    <Box
                      className={`text-1xl ${
                        step.completed || step.current
                          ? "text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {step.name}
                    </Box>
                    <Box
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#101211" }}
                    >
                      {step.current && (
                        <ArrowTopRightIcon className="w-4 h-4 text-white" />
                      )}
                    </Box>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>

      {/* Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        step={selectedStep}
      />
    </Box>
  );
}