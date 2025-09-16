import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {  // req was never used so replace it with a _
  // fetching notes
  try {
    const notes = await Note.find().sort({createdAt:-1}); // show the newest firt (desc). 1 is for asc order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes Controller", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getNoteById = async (req, res) => {
  // fetching a specific note by id
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById Controller", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const createNote = async (req, res) => {
  // create notes
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote Controller", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateNote = async (req, res) => {
  // update notes
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteNote = async (req, res) => {
  // delete notes
  try {
    // const {title, content} = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote Controller", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
