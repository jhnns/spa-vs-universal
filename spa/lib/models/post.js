import Schema from "alamid-schema";

export default new Schema("post", {
    id: Number,
    title: String,
    content: String,
    published: Date,
    author: Number,
});
