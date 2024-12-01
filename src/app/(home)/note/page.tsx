'use client'
import DraggableCard from "@/components/draggable-card";
import {Button} from "@/components/ui/button";
import {addCard, deleteCard, getCards, togglePin, updateCard, updateCardContent} from "@/lib/actions/note-actions";
import {DraggableData} from 'react-draggable';
import {useState} from "react";

export default function NotePage() {
    const [cards, setCards] = useState<Card[]>(getCards());

    const handleStop = (id: number, e: any, data: DraggableData) => {
        updateCard(id, data);
        setCards([...cards]);
    };
    const handleUpdateCardContent = ({id, title, content, zIndex}: {id: number, title?: string, content?: string, zIndex: number}) => {
        updateCardContent({id: id, title: title, content: content, zIndex: zIndex});
        setCards([...cards]);
        // console.log("Card content updated", {id, title, content, zIndex});
    };
    const handleAddCard = () => {
        addCard("New Card", "New Card Content");
        setCards([...getCards()]);
    };
    const handleDeleteCard = (id: number) => {
        deleteCard(id);
        setCards([...getCards()]);
    };
    const handlePin = (id: number) => {
        togglePin(id);
    };

    return (
        <section className="relative flex h-full bg-gray-100 gap-4">
            <Button className="z-20 m-5 shadow-amber-400" onClick={handleAddCard}>Add</Button>
            {cards.map((card) => (
                <DraggableCard
                    key={card.id}
                    card={card}
                    onDragStop={(e, data) => handleStop(card.id, e, data)}
                    onUpdate={handleUpdateCardContent}
                    onDelete={handleDeleteCard}
                    onPin={handlePin}
                />
            ))}
        </section>
    );
}