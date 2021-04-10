import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index
        }
    }
    render() {

        return (
            <div>
               {this.state.index} 
            </div>
        )
    }
}