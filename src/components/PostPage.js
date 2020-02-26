import React from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import {loadOrFetchPostByName} from "../actions";
import {getPostLink, getUsername, md2html} from "../config";
import {dateFormat} from "../util/time";
import {getStyle} from "../actions/markdown";

export default class PostPage extends React.Component {
    constructor(props) {
        super(props);
        const match = this.props.match;
        this.state = {
            id: "",
            name: match.params.name,
            ctime: `${match.params.year}-${match.params.month}-${match.params.day}`,
            mtime: "",
            title: "",
            content: "",
            tags: [],
            // highlight.js css
            style: "",
            // prev & next
            prev: {
                title: "",
                link: "",

            },
            next: {
                title: "",
                link: "",
            },
        };
    }

    componentDidMount() {
        // fetch post
        const username = getUsername();
        const name = this.state.name;

        loadOrFetchPostByName(username, name).then(post => {
            const content = post.content;
            this.setState({
                id: post.id,
                title: post.title,
                content: content,
                mtime: dateFormat(post.mtime, "yyyy-MM-dd"),
                tags: post.tags,
                error: "",
            });

            this.setState({
                style: getStyle(post.style),
            });

            if (post.prev) {
                this.setState({
                    prev: {
                        title: post.prev.title,
                        link: getPostLink(post.prev.ctime, post.prev.name),
                    },
                });
            }
            if (post.next) {
                this.setState({
                    next: {
                        title: post.next.title,
                        link: getPostLink(post.next.ctime, post.next.name),
                    },
                });
            }
        });
    }

    render() {
        return (
                <div>
                    {this.state.style ?
                            <link rel="stylesheet" type="text/css"
                                  href={`/static/css/highlight/${this.state.style}.css`}/>
                            : <span/>
                    }
                    <Header/>
                    <div className="container-fluid" style={{
                        marginTop: 64,
                    }}>
                        <div className="col-8 offset-2" style={{
                            textAlign: "center",
                        }}>
                            <p style={{
                                fontSize: 30,
                                fontWeight: 600,
                            }}>{this.state.title}</p>
                            <div style={{
                                color: "#9696aa"
                            }}>
                                <svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M336 292v24c0 6.6-5.4 12-12 12h-76v76c0 6.6-5.4 12-12 12h-24c-6.6 0-12-5.4-12-12v-76h-76c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h76v-76c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v76h76c6.6 0 12 5.4 12 12zm112-180v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/>
                                </svg>
                                <small>&nbsp;Posted on {this.state.ctime}</small>
                                <small>&ensp;/&ensp;</small>
                                <svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"/>
                                </svg>
                                <small>&nbsp;Modified on {this.state.mtime}</small>
                            </div>
                        </div>

                        <div className="col-8 offset-2" style={{
                            marginTop: 30,
                        }} dangerouslySetInnerHTML={{__html: md2html(this.state.content)}}>
                        </div>

                        <div className="col-8 offset-2" style={{
                            marginTop: 50,
                            display: "flex",
                        }}>
                            <a href={this.state.prev.link} className="post-title no-underline" style={{
                                marginTop: 5,
                                fontWeight: 100,
                                fontSize: 16,
                            }}>
                                {
                                    !this.state.prev.title ? "" : (
                                            <p>&lt;&nbsp;{this.state.prev.title}</p>
                                    )
                                }
                            </a>

                            <a href={this.state.next.link} className="post-title no-underline" style={{
                                marginTop: 5,
                                marginLeft: "auto",
                                marginRight: 0,
                                fontWeight: 100,
                                fontSize: 16,
                                textAlign: "right",
                            }}>
                                {
                                    !this.state.next.title ? "" : (
                                            <p>{this.state.next.title}&nbsp;&gt;</p>
                                    )
                                }
                            </a>
                        </div>
                    </div>
                    <Footer/>
                </div>
        );
    }
}
