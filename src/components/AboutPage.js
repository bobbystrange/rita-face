import React from 'react';
import Footer from './common/Footer';
import Header from './common/Header'
import $ from 'jquery';

export default class AboutPage extends React.Component {

    componentDidMount() {
        $('.toast').show();
    }

    render() {
        return (
                <div>
                    <Header/>
                    <div className="container-fluid" style={{
                        marginTop: 84,
                    }}>
                        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <img src="/static/images/avatar.jpg" className="rounded mr-2" alt="fix me"/>
                                <strong className="mr-auto">Bootstrap</strong>
                                <small>11 mins ago</small>
                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="toast-body">
                                Hello, world! This is a toast message.
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
        );
    }
}
