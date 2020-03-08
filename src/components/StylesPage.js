import React from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import {HIGHLIGHT_STYLE_LIST, pushForcibly, storage} from '../config'

export default class StylesPage extends React.Component {
    constructor(props) {
        super(props);
        const setting = storage.getUserSetting();
        if (!setting) {
            pushForcibly("/")
        } else {
            document.title = "Highlight Style -" + setting.fullName;
        }
        this.state = {
            path: "/"
        };
    }


    componentDidMount() {
        let referrer = document.referrer;
        let prefix = `${window.location.protocol}//${window.location.host}`;
        if (referrer) {
            if (referrer.startsWith(prefix)) {
                let referrerPathname = referrer.slice(prefix.length);
                // from post page
                if (/^\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/.*?$/.test(referrerPathname)) {
                    let que = referrerPathname.indexOf("?");
                    if (que !== 0) {
                        referrerPathname = referrerPathname.slice(0, que);
                    }
                    this.setState({
                        path: referrerPathname,
                    });
                }
            }
        }
    }

    clickStyle(style) {
        if (this.state.path === '/') {
            storage.setStyle(style);
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid" style={{
                    marginTop: 64,
                }}>
                    <div className="col-6 offset-3" style={{
                        // textAlign: "center",
                    }}>
                        {
                            HIGHLIGHT_STYLE_LIST.map((style, index) => (
                                <a className="btn btn-light" style={{
                                    color: "#258",
                                    marginLeft: "auto",
                                    marginRight: 5,
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                }}
                                   onClick={e => this.clickStyle(style)}
                                   href={this.state.path === "/" ? "/" : `${this.state.path}?style=${style}`}
                                   role="button" key={index}>
                                    <p style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                    }}>{style}</p>
                                </a>
                            ))
                        }
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
