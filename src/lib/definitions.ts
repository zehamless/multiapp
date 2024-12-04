
type Card = {
    id: number;
    title: string;
    content: string;
    pinned: boolean;
    position: { x: number; y: number, z: number };
    lastEdited: Date;
}

interface DraggableCardProps {
    card: Card,
    onDragStop: (e: any, data: any) => void,
    onUpdate: (card: { id: number, title: string, content: string, }) => void,
    onDelete: (id: number) => void,
    onPin: (id: number) => void,
}

type UML = {
    id: number;
    title: string;
    content: string;
    lastEdited: Date;
}