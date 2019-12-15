import React, {Component} from 'react';
import Router from './Router/Router';
import Loading from './components/common/Loading';
import Toast from './components/common/Toast';
export default  class App extends Component {
    render() {

        return (
            <div>
                <Router />
                <Loading />
                <Toast />
            </div>
        );
    }
}

