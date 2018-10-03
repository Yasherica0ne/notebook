import React from 'react';
import Note from "./Note";

export class NoteList extends React.Component {
    render() {
        const notes = this.props.notes;
        if(notes === undefined) return null;
        const viewType = this.props.isShortView;
        return (
            <div>
                {notes.map((note) => (
                    <Note
                        isShortView={viewType}
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        date={note.date}
                        tags={note.tags}
                        noteSelector={this.props.noteSelector}
                    />
                ))}
            </div>
        );
    }
}

export default NoteList;