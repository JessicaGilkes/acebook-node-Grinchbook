const { ObjectID } = require("mongodb");
var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });
  it("has a date", () => {
    var post = new Post({
      message: "some message",
      date: new Date("2022-12-25"),
    });
    expect(post.date.toDateString()).toEqual("Sun Dec 25 2022");
  });
  it("has an author", () => {
    var post = new Post({
      message: "some message",
      date: new Date("2022-12-25"),
      author: ObjectID("63b452e3a789c8c110e1042f"),
    });
    expect(post.author).toMatchObject(ObjectID("63b452e3a789c8c110e1042f"));
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({
      message: "some message",
      author: ObjectID("63b452e3a789c8c110e1042f"),
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({
          message: "some message",
          likes: 0,
          author: ObjectID("63b452e3a789c8c110e1042f"),
        });
        done();
      });
    });
  });
});
