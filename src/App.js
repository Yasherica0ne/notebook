import React from 'react';
import Style from './App.css';
import Redactor from "./Components/Redactor";
import NoteList from "./Components/NoteList";

const FilterType =
    {
        none: 1,
        byTag: 2,
        byTitle: 3
    }

function getDate() {
    const date = new Date();
    return date.getDay() + '.' + date.getUTCMonth() + '.' + date.getFullYear();
}

function GetEmptyNote() {
    return {
        id: -1,
        title: '',
        note: '',
        date: '',
        tags: []
    }
}

function GetRedactorDiv() {
    return document.querySelector('#Redactor');
}

function ShowRedactor() {
    let redactor = GetRedactorDiv();
    redactor.style.visibility = 'visible';
}

function HideRedactor() {
    let redactor = GetRedactorDiv();
    redactor.style.visibility = 'hidden';
}

(function FloatRedactor() {
    document.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset;
        document.querySelector('#RedactorBlock').style.marginTop = scrollTop + 'px';
    })
})();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: 0,
                    title: 'First note',
                    note: '# Something important',
                    date: '02.10.2018',
                    tags: ['first', 'second', 'third']
                },
                {
                    id: 1,
                    title: 'Second note',
                    note: '## Something important too',
                    date: '03.10.2018',
                    tags: ['first', 'second']
                }
            ],
            isRedactorView: true,
            notesCounter: 2,
            isShortViewType: true,
            filterType: FilterType.none + '',
            searchString: '',
            selectedNote: GetEmptyNote()
        };

        this.onTitleChange = (e) => {
            this.state.selectedNote.title = e.target.value;
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onNoteChange = (e) => {
            this.state.selectedNote.note = e.target.value;
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onRedactorButtonClick = () => {
            this.setState({
                isRedactorView: true
            })
        }
        this.onUserViewButtonClick = () => {
            this.setState({
                isRedactorView: false
            })
        }
        this.onTagsChange = (e) => {
            this.state.selectedNote.tags = e.target.value.split(' ');
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onSearchStringChange = (e) => {
            this.setState({
                searchString: e.target.value
            })
        }
        this.onSaveClickButton = () => {
            const note = this.state.selectedNote;
            if (!note.title) return null;
            if (note.id === -1) {
                const notes = [...this.state.notes];
                let note = this.state.selectedNote;
                note.id = this.state.notesCounter;
                note.date = getDate();
                notes.push(note);
                this.setState({
                    notesCounter: ++this.state.notesCounter,
                    notes: notes,
                });
            }
            else {
                let item = this.state.notes[note.id];
                item.title = note.title;
                item.note = note.note;
                item.tags = note.tags;
                this.setState({
                    notes: this.state.notes,
                });
            }
            HideRedactor();
        }
        this.onFilterChange = (e) => {
            this.setState({
                filterType: e.target.value
            });
        }
        this.onViewChange = (e) => {
            this.setState({
                isShortViewType: e.target.value
            });
        }
        this.onItemChange = (e) => {
            ShowRedactor();
            const item = this.state.notes[e.target.id];
            this.setState({
                selectedNote: item
            });
        }
        this.onNewNoteButtonClick = () => {
            ShowRedactor();
            this.setState({
                selectedNote: GetEmptyNote()
            });
        }
    }

    get notes() {
        const value = this.state.searchString;
        const filterType = this.state.filterType;

        switch (filterType) {
            case `${FilterType.none}`:
                return this.state.notes;
            case `${FilterType.byTitle}`:
                return this.state.notes.filter(note => note.title.includes(value));
            case `${FilterType.byTag}`:
                return this.state.notes.filter(note => note.tags.indexOf(value) !== -1);
        }
    }

    render() {
        return (
            <div style={{marginTop: "2vh"}}>
                <div style={{position: 'absolute', width: '34vw', marginLeft: '1vw'}}>
                    <input style={{width: '30vw'}} onChange={this.onSearchStringChange} placeholder={'Search'}/><br/>
                    <div>Filter&nbsp;
                        <select onChange={this.onFilterChange}>
                            <option value={FilterType.none}>None</option>
                            <option value={FilterType.byTitle}>Titles</option>
                            <option value={FilterType.byTag}>Tags</option>
                        </select>
                    </div>
                    <div>
                        View&nbsp;
                        <select onChange={this.onViewChange}>
                            <option value={'true'}>Сompact</option>
                            <option value={''}>Extended</option>
                        </select>
                    </div>
                    <NoteList isShortView={this.state.isShortViewType} noteSelector={this.onItemChange}
                              notes={this.notes}/>
                </div>
                <div id={'RedactorBlock'} style={{
                    marginLeft: '35vw',
                    position: 'absolute',
                    borderLeft: '1px solid gray',
                    paddingLeft: '1vh'
                }}>
                    <button style={{fontSize: '3vh'}} onClick={this.onNewNoteButtonClick}>Add note</button>
                    <hr/>
                    <div id={'Redactor'} style={{visibility: 'hidden'}}>
                        <input style={{width: '30vw', marginBottom: '1vh'}} maxLength={50}
                               value={this.state.selectedNote.title}
                               onChange={this.onTitleChange}
                               placeholder={'Note tittle'}/><br/>
                        <button onClick={this.onRedactorButtonClick}>Redactor</button>
                        <button onClick={this.onUserViewButtonClick}>View</button>
                        <br/>
                        <Redactor ChangeContext={this.onNoteChange} isRedactor={this.state.isRedactorView}
                                  newNote={this.state.selectedNote.note}/><br/>
                        <input style={{width: '35vw', marginBottom: '1vh'}} maxLength={50}
                               onChange={this.onTagsChange}
                               value={this.state.selectedNote.tags.join(' ')}
                               placeholder={'Tag1 Tag2 Tag3'}/><br/>
                        <button onClick={this.onSaveClickButton}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
