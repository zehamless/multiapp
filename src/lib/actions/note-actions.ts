import {DraggableData} from "react-draggable";

let cards: Card[] = [
    {
        id: 1,
        title: "Card Title 1",
        content: "Card Content 1",
        pinned: false,
        position: {x: 0, y: 0},
        lastEditted: new Date('2021-09-01T12:00:00')
    },
    {
        id: 2,
        title: "Card Title 2",
        content: "Card Content 2",
        pinned: false,
        position: {x: 0, y: 0},
        lastEditted: new Date('2021-09-01T12:00:00')
    },
    {
        id: 3,
        title: "Card Title 3",
        content: "Card Content 3",
        pinned: false,
        position: {x: 0, y: 0},
        lastEditted: new Date('2021-09-01T12:00:00')
    },
];

export function getCards(): Card[] {
    return cards;
}

export function updateCard(id: number, data: DraggableData): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    card.position = {x: data.x, y: data.y};
    console.log("Card updated", card);
}

export function updateCardContent(id: number, title: string, content: string): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    card.title = title;
    card.content = content;
    card.lastEditted = new Date();
    console.log("Card content updated", card);
}

export function addCard(title: string, content: string): void {
    const id = cards.length > 0 ? Math.max(...cards.map(({id}) => id)) + 1 : 1;
    const newCard = {id, title, content, pinned: false, position: {x: 0, y: 0}, lastEditted: new Date()};
    cards = [...cards, newCard];
    console.log("Card added", newCard);
}

export function deleteCard(id: number): void {
    if (!cards.some(card => card.id === id)) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    cards = cards.filter(card => card.id !== id);
    console.log("Card deleted", id);
}

export function togglePin(id: number): void {
    const card = cards.find(card => card.id === id);
    if (!card) {
        console.error(`Card with id ${id} not found`);
        return;
    }
    card.pinned = !card.pinned;
    console.log("Card pin toggled", card);
}
