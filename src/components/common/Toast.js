import React, {Component} from 'react';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            show: false
        };
        window.showToast = (text) => {
            this.show.call(this, text)
        }
    }

    render() {
        return (
            <div className={this.state.show ? window.page.toast : window.page.toast_hide}>
                <p className={window.page.toastText}>{this.state.text}</p>
            </div>
        )
    }

    show(text) {
        this.setState({
            text: text,
            show: true
        });
        setTimeout(() => {
            this.setState({
                text: '',
                show: false
            })
        }, 1500)
    }
}
