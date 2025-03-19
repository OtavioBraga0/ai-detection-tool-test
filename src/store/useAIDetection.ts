import { IAIDetection } from "@/entities/AIDetection.type";
import { create } from "zustand";

type AIDetectionType = {
  detections: IAIDetection[];
  detectionId: string | null;
};

export const useAIDetection = create<AIDetectionType>(() => ({
  detections: [],
  detectionId: null,
}));
