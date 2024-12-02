'use client'
import DraggableCard from "@/components/draggable-card";
import {Button} from "@/components/ui/button";
import {addCard, deleteCard, getCards, togglePin, updateCard, updateCardContent} from "@/lib/actions/note-actions";
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

    const handleStop = (id: number, e: any, data: DraggableData) => {
        updateCard(id, data);
        setCards([...cards]);
    };
    const handleUpdateCardContent = ({id, title, content, zIndex}: {id: number, title?: string, content?: string, zIndex: number}) => {
        updateCardContent({id: id, title: title, content: content, zIndex: zIndex});
        setCards([...cards]);
    };
    const handleAddCard = async () => {
        addCard("New Card", "New Card Content");
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
        <section className="relative flex h-full bg-gray-100 gap-4">
            <Button className="z-20 m-5 shadow-amber-400" onClick={handleAddCard}>Add</Button>
            <DraggableCard
                key={0}
                card={cardDemo}
                onDragStop={()=>{}}
                onUpdate={()=>{}}
                onDelete={()=>{}}
                onPin={()=>{}}
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
        </section>
    );
}