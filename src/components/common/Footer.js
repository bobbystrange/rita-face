import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10,
                textAlign: "center",
                color: "slategray"
            }}>
                <hr/>
                <div className="col-4 offset-4">
                    <a className="footer-link no-underline" href="/">
                        Home
                    </a>
                    &nbsp;|&nbsp;
                    <a className="footer-link no-underline" href="https://github.com/bobbystrange">
                        Github
                    </a>
                    &nbsp;|&nbsp;Powered by&nbsp;
                    <a className="footer-link no-underline" href="https://reactjs.org/">
                        React
                    </a>
                    &nbsp;and&nbsp;
                    <a className="footer-link no-underline" href="https://getbootstrap.com/">
                        Bootstrap
                    </a>

                </div>
            </div>
        );
    }
}
