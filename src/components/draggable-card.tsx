import React, {memo, useEffect, useRef, useState, useCallback} from 'react';
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Pin, PinOff, X} from "lucide-react";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";

const DraggableCard = memo(({card, onDragStop, onUpdate, onDelete, onPin}: DraggableCardProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [editState, setEditState] = useState({
        isEditing: false,
        title: card.title,
        content: card.content,
        isPinned: card.pinned,
        position: card.position,
    });

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [editState.content]);

    const handleDoubleClick = useCallback(() => setEditState(prevState => ({...prevState, isEditing: true})), []);
    const handleSave = useCallback(() => {
        setEditState(prevState => ({...prevState, isEditing: false}));
        // onUpdate({id: card.id, title: editState.title, content: editState.content});
    }, [card.id, editState.title, editState.content, onUpdate]);

    const handleCancel = useCallback(() => setEditState(prevState => ({...prevState, isEditing: false})), []);
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setEditState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }, []);
    const handleDelete = useCallback(() => onDelete(card.id), [card.id, onDelete]);
    const handlePin = useCallback(() => {
        onPin(card.id);
        setEditState(prevState => ({...prevState, isPinned: !prevState.isPinned}));
    }, [card.id, onPin]);
    const handleZFront = useCallback(() => {
        const newPosition = {
            x: editState.position.x,
            y: editState.position.y,
            z: editState.position.z + 1
        }
        setEditState(prevState => ({...prevState, position: newPosition}));
        onDragStop(null, newPosition);

    }, [card.id, editState.position.x, editState.position.y, editState.position.z, onDragStop]);

    const handleZBack = useCallback(() => {
        const newPosition = {
            x: editState.position.x,
            y: editState.position.y,
            z: editState.position.z - 1
        }
        setEditState(prevState => ({...prevState, position: newPosition}));
        onDragStop(null, newPosition);
    }, [card.id, editState.position.x, editState.position.y, editState.position.z, onDragStop]);

    const handleDragStop = useCallback((e: DraggableEvent, data: DraggableData) => {
        const {x, y} = data;
        const newPosition = {x, y, z: editState.position.z};
        setEditState(prevState => ({...prevState, position: newPosition}));
        onDragStop(e, newPosition);
        console.log('drag stop', newPosition);
    }, [onDragStop, editState.position.z]);

    return (
        <Draggable nodeRef={nodeRef} position={editState.position} onStop={handleDragStop} bounds="parent"
                   defaultClassName="absolute"
                   handle="#card_drag" disabled={editState.isEditing || editState.isPinned}>
            <div ref={nodeRef} className={`h-fit w-fit z-${editState.position.z}`}>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <Card className="w-fit min-w-48 max-w-64" onDoubleClick={handleDoubleClick}>
                            <div className="p-2 flex justify-end">
                                {editState.isPinned ?
                                    <PinOff size={20} onClick={handlePin}
                                            className="cursor-pointer hover:bg-gray-100"/> :
                                    <Pin size={20} onClick={handlePin} className="cursor-pointer hover:bg-gray-100"/>}
                            </div>
                            <CardHeader id="card_drag" className="py-1 cursor-grab">
                                <CardTitle>{editState.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p style={{whiteSpace: 'pre-wrap'}}>{editState.content}</p>
                            </CardContent>
                            <div className="m-3 flex items-end justify-between">
                                <Button variant="outline" size="icon" className="size-6" onClick={handleDelete}>
                                    <X/>
                                </Button>
                                <p className="text-xs pl-4">{new Date(card.lastEdited).toDateString()}</p>
                            </div>
                        </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={handleZFront}>Set Front</ContextMenuItem>
                        <ContextMenuItem onClick={handleZBack}>Set Back</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
                <Dialog open={editState.isEditing}
                        onOpenChange={(isOpen) => setEditState(prevState => ({...prevState, isEditing: isOpen}))}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit {card.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" type="text" className="w-full" value={editState.title}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="content">Content</Label>
                                <Textarea id="content" ref={textareaRef} value={editState.content} className="w-full"
                                          onChange={handleInputChange} style={{resize: 'none', overflow: 'hidden'}}/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Draggable>
    );
});

export default DraggableCard;