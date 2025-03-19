"use client";

import { getAiDetectionDetails } from "@/services/actions/aiDetection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

import { Badge } from "../ui/badge";
import { useAIDetection } from "@/store/useAIDetection";
import { useCallback, useEffect, useState } from "react";
import {
  IAIDetectionDetails,
  ResultDetails,
} from "@/entities/AIDetection.type";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

const BadgeStatus: { [key: string]: string } = {
  done: "bg-green-400 text-white",
  pending: "bg-yellow-400 text-white",
  error: "bg-red-400 text-white",
};

const BadgeResult: { [key: string]: string } = {
  safe: "bg-green-400 text-white",
  unsafe: "bg-red-400 text-white",
};

export function AIDetectionModal() {
  const { detectionId } = useAIDetection((state) => state);

  const [details, setDetails] = useState<IAIDetectionDetails | null>(null);

  useEffect(() => {
    if (detectionId) {
      getAiDetectionDetails(detectionId).then((res) => {
        setDetails(res as IAIDetectionDetails);
      });
    }
  }, [detectionId]);

  const handleClose = useCallback(() => {
    setDetails(null);
    useAIDetection.setState({ detectionId: null });
  }, []);

  return (
    <Dialog open={!!detectionId} onOpenChange={handleClose}>
      <DialogContent>
        {!details && <DialogTitle>Loading...</DialogTitle>}
        {details && (
          <>
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2">
              <div className="flex gap-4">
                <Label>Result</Label>
                <Badge
                  className={
                    BadgeResult[details.result < 70 ? "safe" : "unsafe"]
                  }
                >
                  {details.result}
                </Badge>
              </div>

              <div className="flex gap-4">
                <Label>Status</Label>
                <Badge
                  className={`capitalize ${
                    BadgeStatus[details?.status as string]
                  }`}
                >
                  {details?.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <p className="border rounded p-3 max-h-100 overflow-auto text-gray-500">
                {details?.content}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(details?.result_details || {}).map(
                  ([key, result]) => (
                    <div key={key} className="flex justify-between">
                      <Label>
                        {ResultDetails[key as keyof typeof ResultDetails]}
                      </Label>
                      {result < 70 ? (
                        <CircleCheck className="text-green-400" />
                      ) : (
                        <CircleCheck className="text-red-400" />
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
