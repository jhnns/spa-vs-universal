import filledArray from "filled-array";
import faker from "faker";

function posts() {
    return filledArray(
        i => ({
            id: faker.random.uuid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            author: faker.name.findName(),
            published: faker.date.past(),
            starred: Math.floor(Math.random() * 100),
            image: `/postImage${ i % 4 + 1 }.jpg`,
        }),
        30
    );
}

posts();
