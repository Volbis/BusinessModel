import { CanvasItem, BlockType } from "@shared/schema";
import { Plus, X } from "lucide-react";

interface CanvasBlockProps {
  blockType: BlockType;
  title: string;
  icon: string;
  items: CanvasItem[];
  onAddItem: (blockType: BlockType) => void;
  onRemoveItem: (blockType: BlockType, itemId: string) => void;
  className?: string;
}

const blockIcons: Record<string, string> = {
  "handshake": "🤝",
  "cogs": "⚙️", 
  "gem": "💎",
  "heart": "❤️",
  "users": "👥",
  "box": "📦",
  "share-alt": "🔗",
  "calculator": "🧮",
  "money-bill-wave": "💰"
};

export function CanvasBlock({ 
  blockType, 
  title, 
  icon, 
  items, 
  onAddItem, 
  onRemoveItem, 
  className 
}: CanvasBlockProps) {
  return (
    <div 
      className={`canvas-block ${className}`}
      data-testid={`block-${blockType}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          <span className="text-primary mr-2">{blockIcons[icon] || "📋"}</span>
          {title}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="items-container" data-testid={`container-${blockType}`}>
          {items.map((item) => (
            <div 
              key={item.id} 
              className="item-tag"
              data-testid={`item-${blockType}-${item.id}`}
            >
              <span>{item.text}</span>
              <button
                onClick={() => onRemoveItem(blockType, item.id)}
                className="text-muted-foreground hover:text-destructive ml-1"
                data-testid={`remove-item-${item.id}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="add-button"
        onClick={() => onAddItem(blockType)}
        data-testid={`add-button-${blockType}`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
