import React from 'react';
import $ from 'jquery';
import Header from "./common/Header";
import Footer from "./common/Footer";
import {loadOrFetchPostByName} from "../actions";
import {getPostLink, getUsername, md2html} from "../config";
import {dateFormat} from "../util/time";
import {getStyle} from "../config/markdown";
import Tag from "./common/Tag";

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.content && this.state.content) {
            $("code").each(function () {
                $(this).html("<ol><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "\n</li></ol>");
            });
        }
        if (!prevState.title && this.state.title) {
            document.title = this.state.title;
        }
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
        const {ctime, mtime} = this.state;
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
                        <div className="row font-weight-light" style={{
                            marginLeft: 5,
                            marginBottom: 10,
                            color: "#9696aa",
                        }}>
                            <div className="mb-1 mt-2 ">Created at {ctime}&ensp;/&ensp;</div>
                            {ctime !== mtime &&
                            <div className="mb-1 mt-2 ">Modified at {mtime}&ensp;/&ensp;</div>
                            }
                            {
                                this.state.tags.map((tag, index) =>
                                    <Tag tag={tag} key={`${index}`}/>)
                            }
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
