import React from 'react';
import ReactMarkdown from 'react-markdown';
import RedactorStyle from './Styles/Redactor.css';

class Redactor extends React.Component {
    render() {
        if (this.props.isRedactor) {
            return(
            <textarea cols={100} rows={25} value={this.props.newNote} onChange={this.props.ChangeContext}
                              placeholder={'Write there your note'}/>
            );
        }
        else {
            return (
                <ReactMarkdown source={this.props.newNote}/>
            );
        }
    }
}

export default Redactor;