import Note from "../model/Note.js"

export const getAllNote = async (_, res) => {
    try {
        const allNote = await Note.find().sort({createdAt:-1});
        res.status(200).json(allNote);
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error" });
        console.error("Error in getAllNote controller", error);
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error" });
        console.error("Error in getNote controller", error);
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content })
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error" })
        console.error("Error in createNote controller", error)
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true
            }
        );
        if (!updatedNote) return res.status(404).json({ Message: "Note not found" })
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error" })
        console.error("Error in updateNote controller", error)
    }
}

export const deleteNote = async(req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ Message: "Note not found" })
        res.status(200).json({ Message: "Deleted Note" })
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error" })
        console.error("Error in deleteNote controller", error)
    }
}
