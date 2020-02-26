import React from 'react';
import $ from "jquery";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {searchPosts} from "../actions";
import {getPostLink} from "../config";
import {dateFormat} from "../util/time";

export default class SearchPage extends React.Component {
    state = {
        total: 0,
        posts: [],
        keyword: "",
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const input = $("#search-page-keyword");
        input.focus();
        input.val(this.state.keyword)
    }

    search(e) {
        // if (e.key !== 'Enter') return;
        const keyword = $("#search-page-keyword").val();
        if (keyword.trim().length === 0) return;

        // this.setState({
        //     total: 0,
        //     posts: undefined,
        //     keyword: keyword,
        // });

        searchPosts(keyword).then(posts => {
            this.setState({
                total: posts.length,
                posts: posts,
                keyword: keyword,
            });
        });
    }

    render() {
        // if (this.state.posts === undefined){
        //     $("body").css("opacity", "0.66");
        //     return <Header/>
        // } else {
        //     $("body").css("opacity", "1");
        // }

        return (
                <div>
                    <Header/>
                    <div className="container-fluid" style={{
                        marginTop: 64,
                    }}>
                        <div className="col-8 offset-2" style={{}}>
                            <div className="form-row" style={{marginTop: 30}}>
                                <div className="col-12">
                                    <input type="text" className="form-control form-control-lg"
                                           id="search-page-keyword" placeholder="Search"
                                           onKeyUp={(e) => this.search(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-8 offset-2" style={{
                            marginTop: 50,
                        }}>
                            {
                                this.state.total === 0 ? <div/> : (
                                        <div className="col-12" style={{
                                            marginTop: 5,
                                        }}>
                                <span style={{fontStyle: "italic", color: "#9696aa"}}>
                                    &nbsp;There are {this.state.total} posts under this search.
                                </span>
                                        </div>
                                )
                            }
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
                    <Footer/>
                </div>
        );
    }
}
