import React from 'react';
import Footer from './common/Footer';
import Header from './common/Header'
import {getPagePostImByTag, handleErr, handleMessage, handlePostsRes} from "../actions";
import Pagination from "./common/Pagination";
import {getPostLink, getUsername, pushForcibly, storage} from "../config";
import {getSearchValue} from "../util/url";
import {dateFormat} from "../util/time";
import $ from "jquery";

export default class TagPage extends React.Component {
    constructor(props) {
        super(props);
        const tag = this.props.match.params.tag;
        // handle ?page=xxx
        const page = getSearchValue('page', 1);
        this.state = {
            tag: tag,
            posts: undefined,
            total: 0,
            totalPage: 0,
            page: page,
            size: 10,
            error: "",
        };
        const setting = storage.getUserSetting();
        if (!setting) {
            pushForcibly("/")
        } else {
            document.title = tag + " - " + setting.fullName;
        }

    }

    componentDidMount() {
        const username = getUsername();
        const page = this.state.page;
        const size = this.state.size;
        const tag = this.state.tag;

        getPagePostImByTag(username, tag, page, size).then(
            res => {
                if (res.data.success) handlePostsRes(this, res);
                else handleMessage(this, res.data.message);
            }, err => handleErr(this, err)
        );
    }

    render() {
        if (this.state.posts === undefined) {
            $("body").css("opacity", "0.66");
            return <Header/>
        } else {
            $("body").css("opacity", "1");
        }

        return (
            // style={{background: "#f6f6f6"}}
            // className="row"
            <div>
                <Header/>
                <div className="container-fluid" style={{
                    marginTop: 64,
                }}>

                    <div className="col-8 offset-2" style={{
                        marginTop: 50,
                    }}>
                        <div className="col-12" style={{
                            marginTop: 5,
                        }}>
                                <span style={{
                                    fontWeight: 400,
                                    fontSize: 30,
                                }}>{this.state.tag}&nbsp;</span>
                            <span style={{fontStyle: "italic", color: "#9696aa"}}>
                                    &nbsp;There are {this.state.total} posts under this tag.
                                </span>
                        </div>
                        {
                            this.state.posts.map((post, index) => {
                                const link = getPostLink(post.ctime, post.name);
                                const ctime = dateFormat(post.ctime, "yyyy-MM-dd");
                                return (
                                    <div style={{
                                        marginTop: 10,
                                        display: "flex",
                                    }} key={index}>
                                        <div className="col-10">
                                            <a href={link} className="post-title no-underline" style={{
                                                marginTop: 5,
                                                fontWeight: 400,
                                                wordBreak: "break-word",
                                            }}>
                                                <p>{post.title}</p>
                                            </a>
                                        </div>
                                        <div className="col-2">
                                            <p style={{
                                                marginTop: 5,
                                                marginLeft: "auto",
                                                marginRight: 0,
                                                fontWeight: 250,
                                                fontSize: 16,
                                                fontStyle: "italic",
                                                textAlign: "right",
                                            }}>{ctime}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <Pagination
                    pattern={`/tags/${this.state.tag}/?page=%d`}
                    size={this.state.size}
                    page={this.state.page}
                    total={this.state.total}/>
                <Footer/>
            </div>
        );
    }
}
