"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteAiDetection,
  getListAiDetections,
} from "@/services/actions/aiDetection";
import { Button } from "../ui/button";
import { useAIDetection } from "@/domain/store/useAIDetection";
import { useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";
import { Eye, RefreshCcw, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AiDetection } from "../molecules/AiDetection";

export function AITable() {
  const { detections } = useAIDetection((state) => state);

  const { executeAsync: executeGetAiDetections } = useAction(
    getListAiDetections,
    {
      onSuccess: ({ data }) => {
        useAIDetection.setState({ detections: data });
      },
      onError: () => {
        toast.error("Something went worng");
      },
    }
  );

  const { executeAsync: executeDelete } = useAction(deleteAiDetection, {
    onSuccess: () => {
      toast.success("Deleted successfully");
      executeGetAiDetections();
    },
    onError: () => {
      toast.error("Something went worng");
    },
  });

  useEffect(() => {
    executeGetAiDetections();

    const intervalTime = 20 * 1000; // 20 seconds

    const interval = setInterval(() => {
      executeGetAiDetections();
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [executeGetAiDetections]);

  return (
    <section className="flex flex-col gap-4">
      <div className="w-full flex gap-4 justify-end">
        <Button onClick={() => executeGetAiDetections()} variant={"outline"}>
          <RefreshCcw />
        </Button>
        <Dialog>
          <DialogTrigger className="w-fit self-end" asChild>
            <Button>+ Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter a new text</DialogTitle>
            </DialogHeader>
            <AiDetection />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of AI Detections</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-50 md:max-w-100 hidden sm:block">
              Content
            </TableHead>
            <TableHead>Document ID</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detections?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-gray-400">
                No results.
              </TableCell>
            </TableRow>
          )}
          {detections?.map((item) => (
            <TableRow key={item.uid}>
              <TableCell className="max-w-50  md:max-w-100 hidden sm:block text-ellipsis overflow-hidden">
                {item.content}
              </TableCell>
              <TableCell className="text-ellipsis overflow-hidden">
                {item.documentId}
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  variant={"outline"}
                  onClick={() =>
                    useAIDetection.setState({ detectionId: item.uid })
                  }
                >
                  <Eye />
                </Button>
                <Button
                  onClick={() => executeDelete({ id: item.uid })}
                  variant={"destructive"}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
