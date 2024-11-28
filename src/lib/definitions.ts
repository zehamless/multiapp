type Card = {
    id: number;
    title: string;
    content: string;
    pinned: boolean;
    position: { x: number; y: number };
}

interface DraggableCardProps {
    card: Card;
    onDragStop: (e: any, data: any) => void;
    onUpdate: (id: number, title: string, content: string) => void;
    onDelete: (id: number) => void;
    onPin: (id: number) => void;
}
