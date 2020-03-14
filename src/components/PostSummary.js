import React from 'react';
import PropTypes from 'prop-types';
import PostSummaryTag from "./PostSummaryTag";
import {getPostLink} from "../config";
import {yyyyMMdd} from "../util/time";

export default class PostSummary extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        ctime: PropTypes.number.isRequired,
        tags: PropTypes.array.isRequired,
        summary: PropTypes.string.isRequired,
    };

    render() {
        const ctime = yyyyMMdd(this.props.ctime);
        const link = getPostLink(ctime, this.props.name);
        const {tags} = this.props.tags;

        return (
            <div className="col-8 offset-2" style={{
                marginBottom: 10,
                marginTop: 20,
            }}>
                <div className="row" style={{
                    marginLeft: 5,
                    marginBottom: 0,

                }}>
                    <a href={link} className="post-title no-underline" style={{
                        marginTop: 5,
                    }}>
                        <h4>{this.props.title}</h4>
                    </a>
                </div>

                <div className="row" style={{
                    marginLeft: 5,
                    marginBottom: 10,
                }}>
                    <div style={{marginBottom: 0,}}>{ctime}</div>
                    <div style={{marginBottom: 0,}}>&ensp;/&ensp;</div>
                    {tags && tags.map((tag, index) =>
                        <PostSummaryTag tag={tag} key={`${index}`}/>)
                    }
                </div>

                {/*<div style={{*/}
                {/*    marginLeft: 5,*/}
                {/*    wordBreak: "break-word",*/}
                {/*    opacity: "0.382",*/}
                {/*}} dangerouslySetInnerHTML={{__html: md2html(this.props.summary)}}>*/}
                {/*</div>*/}
            </div>
        );
    }
}
