const fakeUML: UML[] = [
    {
        'id': 1,
        'title': 'Animal',
        'content': 'Animal <|-- Fish\nAnimal <|-- Zebra\nAnimal : +int age\nAnimal : +String gender\nAnimal: +isMammal()\nAnimal: +mate()\nclass Duck{\n    +String beakColor\n    +swim()\n    +quack()\n}\nclass Fish{\n    -int sizeInFeet\n    -canEat()\n}\nclass Zebra{\n    +bool is_wild\n    +run()\n}',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 2,
        'title': 'Simple',
        'content': '[*] --> Still\nStill --> [*]\n\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*]',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 3,
        'title': 'Order',
        'content': 'CUSTOMER ||--o{ ORDER : places\nORDER ||--|{ LINE-ITEM : contains\nCUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 4,
        'title': 'Journey',
        'content': 'title: User\'s journey\nsection Go shopping\n    Go shopping: Go to the shops\n    Go shopping: Buy some items\nsection Get home\n    Get home: Get in the door\n    Get home: Close the door',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 5,
        'title': 'Mindmap',
        'content': 'mindmap\n  root((mindmap))',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 6,
        'title': 'State',
        'content': '[*] --> Still\nStill --> [*]\n\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*]',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 7,
        'title': 'ERD',
        'content': 'CUSTOMER ||--o{ ORDER : places\nORDER ||--|{ LINE-ITEM : contains\nCUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 8,
        'title': 'User Journey',
        'content': 'journey\n    title My working day\n    section Go to work\n      Make tea: 5: Me\n      Go upstairs: 3: Me\n      Do work: 1: Me, Cat\n    section Go home\n      Go downstairs: 5: Me\n      Sit down: 5: Me',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 9,
        'title': 'Mindmap',
        'content': 'mindmap\n  root((mindmap))',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 10,
        'title': 'ERD',
        'content': 'CUSTOMER ||--o{ ORDER : places\nORDER ||--|{ LINE-ITEM : contains\nCUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 11,
        'title': 'State',
        'content': '[*] --> Still\nStill --> [*]\n\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*]',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 12,
        'title': 'User Journey',
        'content': 'journey\n    title My working day\n    section Go to work\n      Make tea: 5: Me\n      Go upstairs: 3: Me\n      Do work: 1: Me, Cat\n    section Go home\n      Go downstairs: 5: Me\n      Sit down: 5: Me',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 13,
        'title': 'Mindmap',
        'content': 'mindmap\n  root((mindmap))',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 14,
        'title': 'ERD',
        'content': 'CUSTOMER ||--o{ ORDER : places\nORDER ||--|{ LINE-ITEM : contains\nCUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 15,
        'title': 'State',
        'content': '[*] --> Still\nStill --> [*]\n\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*]',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 16,
        'title': 'User Journey',
        'content': 'journey\n    title My working day\n    section Go to work\n      Make tea: 5: Me\n      Go upstairs: 3: Me\n      Do work: 1: Me, Cat\n    section Go home\n      Go downstairs: 5: Me\n      Sit down: 5: Me',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 17,
        'title': 'Mindmap',
        'content': 'mindmap\n  root((mindmap))',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 18,
        'title': 'ERD',
        'content': 'CUSTOMER ||--o{ ORDER : places\nORDER ||--|{ LINE-ITEM : contains\nCUSTOMER }|..|{ DELIVERY-ADDRESS : uses',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
    {
        'id': 19,
        'title': 'State',
        'content': '[*] --> Still\nStill --> [*]\n\nStill --> Moving\nMoving --> Still\nMoving --> Crash\nCrash --> [*]',
        'lastEdited': new Date('2021-09-01T12:00:00')
    },
]

export async function getUML(): Promise<UML[]> {
    return fakeUML;
}
export async function getUMLById(id: number): Promise<UML | undefined> {
    return fakeUML.find(uml => uml.id === id);
}