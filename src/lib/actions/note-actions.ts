import {DraggableData} from "react-draggable";
import axios from "@/lib/axios";
import {stringify} from "node:querystring";

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
        // console.log(response.data.data)
        return response.data.data;
    } catch (err) {
        console.log('err', err);
        return [];
    }
}

export async function updateCard(id: number, data:{x: number, y: number, z: number}): Promise<void> {
    const flattenedData = {
        position: {
            x: data.x,
            y: data.y,
            z: data.z
        }
    }
    await axios.patch(`api/cards/${id}`, flattenedData).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
    });
}

export async function updateCardContent({id, title, content}: {
    id: number,
    title: string,
    content: string,
}) {
    await axios.patch(`api/cards/${id}`, {title, content}).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
    });

}


export function addCard(): void {

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