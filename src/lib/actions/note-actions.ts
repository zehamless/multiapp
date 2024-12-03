import {DraggableData} from "react-draggable";
import axios from "@/lib/axios";

let cards: Card[] = [
    {
        id: 1,
        title: "Card Title 1",
        content: "Card Content 1",
        pinned: false,
        position: {x: 0, y: 0, z: 10},
        lastEdited: new Date('2021-09-01T12:00:00')
    },
    {
        id: 2,
        title: "Card Title 2",
        content: "Card Content 2",
        pinned: false,
        position: {x: 0, y: 0, z: 10},
        lastEdited: new Date('2021-09-01T12:00:00')
    },
    {
        id: 3,
        title: "Card Title 3",
        content: "Card Content 3",
        pinned: false,
        position: {x: 0, y: 0, z: 10},
        lastEdited: new Date('2021-09-01T12:00:00')
    },
];

export async function getCards(): Promise<Card[]> {

    try {
        const response = await axios.get('api/cards');
        console.log(response.data.data)
        return response.data.data;
    } catch (err) {
        console.log('err', err);
        return [];
    }
}

export function updateCard(id: number, data: DraggableData): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    card.position = {x: data.x, y: data.y, z: card.position.z};
    // console.log("Card updated", card);
}

export function updateCardContent({id, title, content, zIndex}: {
    id: number,
    title?: string,
    content?: string,
    zIndex: number
}): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    if (title) card.title = title;
    if (content) card.content = content;
    if (zIndex) card.position.z = zIndex;
    card.lastEdited = new Date();
    // console.log("Card content updated", card);
}

export function addCard(title: string, content: string): void {
    const id = cards.length > 0 ? Math.max(...cards.map(({id}) => id)) + 1 : 1;
    const newCard = {id, title, content, pinned: false, position: {x: 0, y: 0, z: 0}, lastEdited: new Date()};
    cards = [...cards, newCard];
    // console.log("Card added", newCard);
}

export function deleteCard(id: number): void {
    if (!cards.some(card => card.id === id)) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    cards = cards.filter(card => card.id !== id);
    // console.log("Card deleted", id);
}

export function togglePin(id: number): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    card.pinned = !card.pinned;
    // console.log("Card pin toggled", card);
}