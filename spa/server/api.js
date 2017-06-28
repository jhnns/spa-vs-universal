import mockRestMiddleware from "mock-rest-middleware";
import dummyPosts from "./dummyData/posts";

const api = mockRestMiddleware();

api.addResource("/posts", dummyPosts);

export default api;
