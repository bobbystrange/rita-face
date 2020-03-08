import React from 'react';
import {Event, Timeline} from "react-timeline-scribble";
import PropTypes from 'prop-types'
import Header from "./common/Header";
import {loadPostsForArchives} from "../actions";
import {getSearchValue} from "../util/url";
import Pagination from "./common/Pagination";
import Footer from "./common/Footer";
import {yyyyMMdd} from "../util/time";
import {getPostLink, getStyle, md2html, pushForcibly, storage} from "../config";

export class ArchivesPage extends React.Component {
    constructor(props) {
        super(props);
        const setting = storage.getUserSetting();
        if (!setting) {
            pushForcibly("/")
        } else {
            document.title = "Archives -" + setting.fullName;
        }

        this.state = {
            posts: [],
            page: getSearchValue('page', 1),
            size: 10,
            // highlight.js css
            style: getStyle(),
        }
    }

    componentDidMount() {
        const page = this.state.page;
        const size = this.state.size;

        loadPostsForArchives(page, size).then(res => {
            console.log(res);
            const {current_posts, total, totalPage} = res;
            this.setState({
                posts: current_posts,
                total: total,
                totalPage: totalPage,
            })
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
                    <div className="col-8 offset-2" style={{}}>
                        <Timeline>
                            {
                                this.state.posts.map((post, index) => {
                                    const ctime = yyyyMMdd(post.ctime);
                                    const link = getPostLink(ctime, post.name);
                                    return <ArchivesSummary key={index} id={post.id}
                                                            title={post.title} link={link} ctime={ctime}
                                                            summary={post.summary}/>
                                })
                            }
                        </Timeline>
                    </div>
                </div>
                <Pagination
                    pattern="/archives?page=%d"
                    size={this.state.size}
                    page={this.state.page}
                    total={this.state.total}/>
                <Footer/>
            </div>
        );
    }
}

class ArchivesSummary extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        ctime: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
    };

    // componentDidMount() {
    //     $(`#archives-summary-${this.props.id}`).html(md2html(this.props.summary));
    // }

    render() {
        return (<Event title={<a href={this.props.link} className="post-title no-underline">{this.props.title}</a>}
                       interval={this.props.ctime}
                       id={`archives-summary-${this.props.id}`}>
            <div dangerouslySetInnerHTML={{__html: md2html(this.props.summary)}}/>
        </Event>)
    }


}
