import React, {Component} from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        window.show = () => {
            this.show.call(this)
        };
        window.hide = () => {
            this.hide.call(this)
        };
    }


    render() {
        return (
            <div className={this.state.show ? window.page.loading : window.page.loading_hide}>
                <div className={window.page.loadingItem}>
                    <p className={window.page.loadingIcon}></p>
                </div>
            </div>
        )
    }

    show() {
        this.setState({
            show: true
        })
    }

    hide() {
        this.setState({
            show: false
        })
    }
}
