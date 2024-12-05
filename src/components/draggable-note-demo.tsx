"use client"

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from 'lucide-react'

interface Note {
    id: number
    content: string
    x: number
    y: number
}

export function DraggableNoteDemo() {
    const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "Drag me around!", x: 100, y: 100 }])
    const [newNoteContent, setNewNoteContent] = useState("")

    const addNote = () => {
        if (newNoteContent.trim()) {
            setNotes([...notes, { id: Date.now(), content: newNoteContent, x: 20, y: 20 }])
            setNewNoteContent("")
        }
    }

    const updateNotePosition = useCallback((id: number, x: number, y: number) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, x, y } : note))
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => e.preventDefault(), [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        const noteId = parseInt(e.dataTransfer.getData('text/plain'), 10)
        const noteIndex = notes.findIndex(note => note.id === noteId)
        if (noteIndex !== -1) {
            const containerRect = e.currentTarget.getBoundingClientRect()
            updateNotePosition(noteId, e.clientX - containerRect.left, e.clientY - containerRect.top)
        }
    }, [notes, updateNotePosition])

    return (
        <div className="relative h-full border rounded-lg p-4 overflow-hidden" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="mb-4 flex space-x-2">
                <Input type="text" value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} placeholder="Enter note content" />
                <Button onClick={addNote}><PlusIcon className="h-4 w-4 mr-2" />Add Note</Button>
            </div>
            {notes.map(note => (
                <div key={note.id} style={{ position: 'absolute', left: note.x, top: note.y, cursor: 'move' }} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', `${note.id}`)}>
                    <Card className="w-40">
                        <CardHeader className="p-2"><CardTitle className="text-sm">Note {note.id}</CardTitle></CardHeader>
                        <CardContent className="p-2"><p className="text-xs">{note.content}</p></CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}