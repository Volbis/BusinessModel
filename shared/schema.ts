import { z } from "zod";

export const canvasItemSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Item text is required"),
  blockType: z.enum([
    "key-partners",
    "key-activities", 
    "value-propositions",
    "customer-relationships",
    "customer-segments",
    "key-resources",
    "channels",
    "cost-structure",
    "revenue-streams"
  ])
});

export const canvasDataSchema = z.object({
  "key-partners": z.array(canvasItemSchema).default([]),
  "key-activities": z.array(canvasItemSchema).default([]),
  "value-propositions": z.array(canvasItemSchema).default([]),
  "customer-relationships": z.array(canvasItemSchema).default([]),
  "customer-segments": z.array(canvasItemSchema).default([]),
  "key-resources": z.array(canvasItemSchema).default([]),
  "channels": z.array(canvasItemSchema).default([]),
  "cost-structure": z.array(canvasItemSchema).default([]),
  "revenue-streams": z.array(canvasItemSchema).default([])
});

export type CanvasItem = z.infer<typeof canvasItemSchema>;
export type CanvasData = z.infer<typeof canvasDataSchema>;
export type BlockType = CanvasItem["blockType"];
