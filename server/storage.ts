import { type CanvasData } from "@shared/schema";

// Storage interface for Business Model Canvas data
export interface IStorage {
  // Canvas data storage methods can be added here if needed for backend persistence
  // For now, the app uses localStorage on the frontend
}

class MemStorage implements IStorage {
  // Placeholder storage class for Business Model Canvas
  // The app currently uses localStorage on the frontend
}

export const storage = new MemStorage();
