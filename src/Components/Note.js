import React from 'react';

class Note extends React.Component {
    render() {
        const id = this.props.id;
        if (this.props.isShortView) {
            return (
                <React.Fragment>
                    <hr/>
                    <h3 style={{cursor: 'pointer'}} id={id} onClick={this.props.noteSelector}>{this.props.title}</h3>
                </React.Fragment>
            );
        }
        else {
            const tags = this.props.tags;
            return (
                <React.Fragment>
                    <div>
                        <hr/>
                        <h3 style={{cursor: 'pointer'}} id={id} onClick={this.props.noteSelector}>{this.props.title}</h3>
                        <p>Date: {this.props.date}</p>
                        <p>Tags:
                            {tags.map((tag) => (
                                ` #${tag}`
                            ))}
                        </p>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Note;