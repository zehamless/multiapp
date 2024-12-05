'use client'
import DraggableCard from "@/components/draggable-card";
import {Button} from "@/components/ui/button";
import {
    addCard,
    deleteCard,
    getCards,
    togglePin,
    updateCard,
    updateCardContent,
} from "@/lib/actions/note-actions";
import {DraggableData} from 'react-draggable';
import {useState, useEffect} from "react";

export default function NotePage() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        async function fetchCards() {
            const fetchedCards = await getCards();
            setCards(fetchedCards);
        }

        fetchCards();
    }, []);

    const handleStop = async (id: number, e: any, data:{x: number, y: number, z: number}) => {
        try {
            await updateCard(id, data);
            setCards([...cards]);
        } catch (error) {
            console.error('Failed to update card:', error);
        }
    };
    const handleUpdateCardContent = async ({id, title, content}: { id: number, title: string, content: string }) => {
        try {
            await updateCardContent({id: id, title: title, content: content});
            setCards([...await getCards()]);
        } catch (error) {
            console.error('Failed to update card content:', error);
        }
    };
    const handleAddCard = async () => {
        addCard();
        setCards([...await getCards()]);
    };
    const handleDeleteCard = async (id: number) => {
        deleteCard(id);
        setCards([...await getCards()]);
    };
    const handlePin = (id: number) => {
        togglePin(id);
    };
    const cardDemo: Card = {
        id: 0,
        title: "Drag Here",
        content: "2x Click to edit",
        pinned: true,
        position: {x: 0, y: 0, z: 10},
        lastEdited: new Date('2021-09-01T12:00:00')
    }
    return (
        <div className="relative h-screen bg-gray-100">
            <Button className="z-20 m-5 shadow-amber-400" onClick={handleAddCard}>Add</Button>
            <DraggableCard
                key={0}
                card={cardDemo}
                onDragStop={() => {
                }}
                onUpdate={() => {
                }}
                onDelete={() => {
                }}
                onPin={() => {
                }}
            />
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
        </div>
    );
}