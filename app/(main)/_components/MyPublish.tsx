"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Check, Copy, Globe, MoveUpRight, X } from "lucide-react";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

interface PublishProps {
  initialData: Doc<"documents">;
}

const MyPublish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed to publish note.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  //--

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="popped">
          {initialData.isPublished ? (
            <div className="flex items-center">
              Meow Note is live
              <Globe className=" w-4 h-4 ml-2" />
            </div>
          ) : (
            <div>Publish</div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 rounded-lg "
        align="end"
        alignOffset={8}
        forceMount
      >
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-[#627254]  animate-pulse h-4 w-4" />
              <p className="text-xs  text-[#627254] font-bold">
                Everyone can view your MeowNote
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 uppercase"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your Meow Note with everyone else.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              variant="popped"
              className="w-full  flex items-center justify-center gap-2"
              size="sm"
            >
              Publish
              <MoveUpRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MyPublish;
