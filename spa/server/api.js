import mockRestMiddleware from "mock-rest-middleware";
import filledArray from "filled-array";
import faker from "faker";

const api = mockRestMiddleware();

api.addResource(
    "/posts",
    filledArray(
        () => ({
            id: faker.random.uuid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            published: faker.date.past(),
            starred: Math.floor(Math.random() * 100),
        }),
        30
    )
);

export default api;
