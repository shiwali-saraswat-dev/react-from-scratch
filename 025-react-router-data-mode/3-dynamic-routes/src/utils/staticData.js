export const categories = [
    { id: "pizza",  name: "Pizza" },
    { id: "burger", name: "Burger" },
    { id: "biryani", name: "Biryani" },
];

// keyed by category id, like a PHP array: $restaurants['pizza']
export const restaurants = {
    pizza: [
        { id: "p1", name: "Pizza Corner", rating: 4.3 },
        { id: "p2", name: "Slice House", rating: 4.1 },
    ],
    burger: [
        { id: "b1", name: "Burger Barn", rating: 4.0 },
        { id: "b2", name: "Patty Point", rating: 4.4 },
        { id: "b3", name: "Bun Story", rating: 3.9 },
    ],
    biryani: [
        { id: "r1", name: "Dum Pukht Palace", rating: 4.5 },
    ],
};