import express from "express"
import { createNote, deleteNote, getAllNote, getNote, updateNote } from "../controller/notesControllers.js"

const router = express()

router.get("/", getAllNote)

router.get("/:id", getNote)

router.post("/", createNote)

router.put("/:id", updateNote)

router.delete("/:id", deleteNote)

export default router;