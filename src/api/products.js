import faker from 'faker';

const products = [
    { id: 1, name:faker.commerce.productName(), price: faker.commerce.price()},
    { id: 2, name:faker.commerce.productName(), price: faker.commerce.price()},
    { id: 3, name:faker.commerce.productName(), price: faker.commerce.price()},
    { id: 4, name:faker.commerce.productName(), price: faker.commerce.price()},
    { id: 5, name:faker.commerce.productName(), price: faker.commerce.price()},
]

export function getProducts(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= 0.0) {
                resolve(products);
            } else {
                reject();
            }
        }, 1500);
    })
}