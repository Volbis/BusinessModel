import { CanvasData, canvasDataSchema, BlockType, CanvasItem } from "@shared/schema";

const STORAGE_KEY = "businessModelCanvas";

export class CanvasStorage {
  static loadData(): CanvasData {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return canvasDataSchema.parse(parsed);
      }
    } catch (error) {
      console.error("Error loading canvas data:", error);
    }
    
    return this.getEmptyCanvas();
  }

  static saveData(data: CanvasData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving canvas data:", error);
    }
  }

  static getEmptyCanvas(): CanvasData {
    return {
      "key-partners": [],
      "key-activities": [],
      "value-propositions": [],
      "customer-relationships": [],
      "customer-segments": [],
      "key-resources": [],
      "channels": [],
      "cost-structure": [],
      "revenue-streams": []
    };
  }

  static exportData(data: CanvasData): void {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business_model_canvas.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static clearAllData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
