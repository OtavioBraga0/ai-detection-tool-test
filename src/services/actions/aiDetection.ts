"use server";

import {
  AIDetectionDeleteSchema,
  AIDetectionSchema,
} from "@/domain/schemas/AIDetection.schema";
import { actionClient } from ".";
import { prismaClient } from "..";
import { cookies } from "next/headers";
import { udQuery } from "../ud/query";
import { udDetect } from "../ud/detect";

export const submitAiDetection = actionClient
  .schema(AIDetectionSchema)
  .action(async ({ parsedInput: { content } }) => {
    try {
      const response = await udDetect(content);

      const cookie = await cookies();

      const userId = cookie.get("userId")?.value;

      if (!userId) {
        throw new Error("User not found");
      }

      await prismaClient.aiDetection.create({
        data: {
          content,
          documentId: response.data.id,
          userId,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });

export const getListAiDetections = actionClient.action(async () => {
  try {
    const cookie = await cookies();

    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new Error("User not found");
    }

    const detections = await prismaClient.aiDetection.findMany({
      where: {
        userId,
      },
    });

    return detections;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export const getAiDetectionDetails = async (id: string) => {
  try {
    const cookie = await cookies();

    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new Error("User not found");
    }

    const detection = await prismaClient.aiDetection.findUniqueOrThrow({
      where: {
        uid: id,
        userId,
      },
    });

    const response = await udQuery(detection.documentId);

    return {
      ...detection,
      status: response.data.status,
      result: response.data.result,
      result_details: response.data.result_details,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteAiDetection = actionClient
  .schema(AIDetectionDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const cookie = await cookies();

      const userId = cookie.get("userId")?.value;

      if (!userId) {
        throw new Error("User not found");
      }

      await prismaClient.aiDetection.delete({
        where: {
          uid: id,
          userId,
        },
      });

      return { message: "Deleted successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });
