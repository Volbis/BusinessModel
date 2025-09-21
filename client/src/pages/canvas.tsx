import { useState, useEffect } from "react";
import { CanvasData, BlockType, CanvasItem } from "@shared/schema";
import { CanvasStorage } from "@/lib/canvas-storage";
import { CanvasBlock } from "@/components/canvas-block";
import { AddItemModal } from "@/components/add-item-modal";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash2, TrendingUp } from "lucide-react";

export default function Canvas() {
  const [canvasData, setCanvasData] = useState<CanvasData>(CanvasStorage.getEmptyCanvas());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlockType, setCurrentBlockType] = useState<BlockType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadedData = CanvasStorage.loadData();
    setCanvasData(loadedData);
  }, []);

  const saveData = (newData: CanvasData) => {
    setCanvasData(newData);
    CanvasStorage.saveData(newData);
  };

  const openAddModal = (blockType: BlockType) => {
    setCurrentBlockType(blockType);
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
    setCurrentBlockType(null);
  };

  const addItem = (text: string) => {
    if (!currentBlockType) return;

    const newItem: CanvasItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      blockType: currentBlockType
    };

    const newData = {
      ...canvasData,
      [currentBlockType]: [...canvasData[currentBlockType], newItem]
    };

    saveData(newData);
    toast({
      title: "Élément ajouté",
      description: "L'élément a été ajouté avec succès",
    });
  };

  const removeItem = (blockType: BlockType, itemId: string) => {
    const newData = {
      ...canvasData,
      [blockType]: canvasData[blockType].filter(item => item.id !== itemId)
    };

    saveData(newData);
    toast({
      title: "Élément supprimé",
      description: "L'élément a été supprimé",
    });
  };

  const exportData = () => {
    CanvasStorage.exportData(canvasData);
    toast({
      title: "Export réussi",
      description: "Les données ont été exportées en JSON",
    });
  };

  const clearAllData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer toutes les données ?")) {
      const emptyData = CanvasStorage.getEmptyCanvas();
      saveData(emptyData);
      CanvasStorage.clearAllData();
      toast({
        title: "Données effacées",
        description: "Toutes les données ont été effacées",
      });
    }
  };

  const blockConfigs = [
    { blockType: "key-partners" as BlockType, title: "Partenaires clés", icon: "handshake", className: "block-key-partners" },
    { blockType: "key-activities" as BlockType, title: "Activités Clés", icon: "cogs", className: "block-key-activities" },
    { blockType: "value-propositions" as BlockType, title: "Propositions de valeur", icon: "gem", className: "block-value-propositions" },
    { blockType: "customer-relationships" as BlockType, title: "Relation Client", icon: "heart", className: "block-customer-relationships" },
    { blockType: "customer-segments" as BlockType, title: "Clients", icon: "users", className: "block-customer-segments" },
    { blockType: "key-resources" as BlockType, title: "Ressources clés", icon: "box", className: "block-key-resources" },
    { blockType: "channels" as BlockType, title: "Canaux", icon: "share-alt", className: "block-channels" },
    { blockType: "cost-structure" as BlockType, title: "Coûts", icon: "calculator", className: "block-cost-structure" },
    { blockType: "revenue-streams" as BlockType, title: "Revenus", icon: "money-bill-wave", className: "block-revenue-streams" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              <TrendingUp className="text-primary mr-3 inline" />
              Business Model Canvas
            </h1>
            <div className="flex gap-3">
              <button
                onClick={clearAllData}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                data-testid="clear-all-button"
              >
                <Trash2 className="w-4 h-4" />
                Effacer tout
              </button>
              <button
                onClick={exportData}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                data-testid="export-button"
              >
                <Download className="w-4 h-4" />
                Exporter JSON
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="canvas-grid" data-testid="canvas-grid">
          {blockConfigs.map((config) => (
            <CanvasBlock
              key={config.blockType}
              blockType={config.blockType}
              title={config.title}
              icon={config.icon}
              items={canvasData[config.blockType]}
              onAddItem={openAddModal}
              onRemoveItem={removeItem}
              className={config.className}
            />
          ))}
        </div>
      </main>

      <AddItemModal
        isOpen={isModalOpen}
        blockType={currentBlockType}
        onClose={closeAddModal}
        onAddItem={addItem}
      />
    </div>
  );
}
