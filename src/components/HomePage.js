import React from 'react';
import $ from "jquery";
import Footer from './common/Footer';
import Header from './common/Header'
import {getPagePostIm, handleErr, handleMessage, handlePostsRes} from "../actions";
import Pagination from "./common/Pagination";
import PostSummary from "./PostSummary";
import {getStyle, getUsername, storage} from "../config";
import {getSearchValue} from "../util/url";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        // handle ?page=xxx
        const page = getSearchValue('page', 1);
        this.state = {
            // posts of current page
            posts: undefined,
            total: 0,
            totalPage: 0,
            page: page,
            size: 10,
            // highlight.js css
            style: getStyle(),
            error: "",
        };

        document.title = "Home page - Lovaly Rita ";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const setting = storage.getUserSetting();
        if (setting) {
            document.title = setting.fullName + "'s Blog";
        }
    }

    componentDidMount() {
        const username = getUsername();
        const page = this.state.page;
        const size = this.state.size;

        getPagePostIm(username, page, size).then(
            res => {
                if (res.data.code === 0) handlePostsRes(this, res);
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
                {this.state.style ?
                    <link rel="stylesheet" type="text/css"
                          href={`/static/css/highlight/${this.state.style}.css`}/>
                    : <span/>
                }
                <Header/>
                <div className="container-fluid" style={{
                    marginTop: 84,
                }}>
                    {
                        this.state.posts.map((post, index) => (
                            <PostSummary
                                key={`${index}`}
                                id={post.id}
                                name={post.name}
                                title={post.title}
                                ctime={post.ctime}
                                tags={post.tags}
                                summary={post.summary}/>
                        ))
                    }
                </div>

                <Pagination
                    pattern="/?page=%d"
                    size={this.state.size}
                    page={this.state.page}
                    total={this.state.total}/>
                <Footer/>
            </div>
        );
    }
}
