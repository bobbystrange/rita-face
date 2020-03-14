import React from "react";
import PropTypes from 'prop-types';

export default class PostSummaryTag extends React.Component {
    static propTypes = {
        tag: PropTypes.string.isRequired,
    };

    state = {
        color: "#f6f6f6",
    };

    render() {
        const {tag} = this.props.tag;
        return (
            <div style={{
                background: this.state.color,
                marginBottom: 0,
                marginLeft: 5,
                display: "block",
            }} onMouseEnter={e => {
                this.setState({
                    color: "#ddd"
                });
            }} onMouseLeave={e => {
                this.setState({
                    color: "#f6f6f6"
                });
            }}>
                <a className="no-underline" style={{
                    color: "#a6a7a8",
                    marginTop: 0,
                    marginLeft: 3,
                }} href={`/tags/${tag.name}`}>
                    {tag.name}
                </a>
            </div>
        );
    }
}
