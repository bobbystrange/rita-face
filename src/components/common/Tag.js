import React from "react";
import PropTypes from 'prop-types';

export default class Tag extends React.Component {
    static propTypes = {
        tag: PropTypes.string.isRequired,
    };

    state = {
        color: "rgba(166,167,168,0.29)",
    };

    render() {
        const {color} = this.state;
        const {tag} = this.props;
        return (
            <div className="mb-1 mt-2 mr-2 d-block card" style={{
                background: color,
            }} onMouseEnter={e => {
                this.setState({
                    color: "#ddd"
                });
            }} onMouseLeave={e => {
                this.setState({
                    color: "rgba(166,167,168,0.29)",
                });
            }}>
                <a className="no-underline p-2" style={{
                    color: "#a6a7a8",
                }} href={`/tags/${tag}`}>
                    {tag}
                </a>
            </div>
        );
    }
}
