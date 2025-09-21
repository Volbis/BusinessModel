import { useState, useEffect } from "react";
import { BlockType } from "@shared/schema";
import { X } from "lucide-react";

interface AddItemModalProps {
  isOpen: boolean;
  blockType: BlockType | null;
  onClose: () => void;
  onAddItem: (text: string) => void;
}

export function AddItemModal({ isOpen, blockType, onClose, onAddItem }: AddItemModalProps) {
  const [itemText, setItemText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setItemText("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemText.trim()) {
      onAddItem(itemText.trim());
      setItemText("");
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      data-testid="add-item-modal"
    >
      <div className="modal-content">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Ajouter un élément</h3>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground"
            data-testid="close-modal-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemText" className="block text-sm font-medium text-foreground mb-2">
              Texte de l'élément
            </label>
            <input
              type="text"
              id="itemText"
              value={itemText}
              onChange={(e) => setItemText(e.target.value)}
              required
              autoFocus
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              placeholder="Entrez votre élément..."
              data-testid="item-text-input"
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-muted transition-colors"
              data-testid="cancel-button"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              data-testid="submit-button"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
