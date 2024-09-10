
interface Category {
    id: number,
    parentId: number,
    name: string,
}

export const categories: Category[] = [
    {
        id: 1,
        parentId: 0,
        name: "Life"
    },
    {
        id: 2,
        parentId: 0,
        name: "Programming"
    },
    {
        id: 3,
        parentId: 0,
        name: "Tutotials"
    },
    {
        id: 4,
        parentId: 2,
        name: "PHP"
    },
    {
        id: 5,
        parentId: 2,
        name: "Golang"
    },
    {
        id: 6,
        parentId: 2,
        name: "Rust"
    },
    {
        id: 7,
        parentId: 2,
        name: "Typescript"
    }
];
