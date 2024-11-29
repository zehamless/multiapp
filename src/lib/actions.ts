import {DraggableData} from "react-draggable";


let cards: Card[] = [
    {id: 1, title: "Card Title 1", content: "Card Content 1", pinned: false, position: {x: 0, y: 0}, lastEditted: new Date()},
    {id: 2, title: "Card Title 2", content: "Card Content 2", pinned: false, position: {x: 0, y: 0}, lastEditted: new Date()},
    {id: 3, title: "Card Title 3", content: "Card Content 3", pinned: false, position: {x: 0, y: 0}, lastEditted: new Date()},
];

// Function to retrieve all cards
export function getCards(): Card[] {
    return cards;
}

// Function to update a card's position
export function updateCard(id: number, data: DraggableData): void {
    const card = cards.find(card => card.id === id);
    if (card) {
        card.position = {x: data.x, y: data.y};
        console.log("Card updated", card);
    }
}

// Function to update card content
export function updateCardContent(id: number, title: string, content: string): void {
    const card = cards.find(card => card.id === id);
    if (card) {
        card.title = title;
        card.content = content;
        card.lastEditted = new Date();
        console.log("Card content updated", card);
    }
}

export function addCard(title: string, content: string): void {
    const id = Math.max(...cards.map(({id}) => id)) + 1;
    const newCard = {id, title, content, pinned: false, position: {x: 0, y: 0}, lastEditted: new Date()};
    cards.push(newCard);
    console.log("Card added", newCard);
    console.log("All cards", cards);
}

export function deleteCard(id: number): void {
    cards = cards.filter(card => card.id !== id);
}
export function togglePin(id: number): void {
    const card = cards.find(card => card.id === id);
    if (card) {
        card.pinned = !card.pinned;
    }
}