import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
  try {
    //will get all post
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};

export const createPost = async (req, res, next) => {
  const post = req.body;
  const newPost = new PostMessage({...post,creator: req.userId,createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "delete succesfully " });
};


export const likedPost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id ===String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
}