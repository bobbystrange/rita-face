import React from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import _ from "lodash";
import {fetchTags} from "../actions";
import {getPadding, getUsername, pushForcibly, randomDark, storage} from "../config";

export default class TagsPage extends React.Component {
    constructor(props) {
        super(props);
        const setting = storage.getUserSetting();
        if (!setting) {
            pushForcibly("/")
        } else {
            document.title = "Tags -" + setting.fullName;
        }
        this.state = {
            tags: [],
            error: "",
        };
    }


    componentDidMount() {
        const username = getUsername();
        fetchTags(username).then(res => {
            if (res.data.code === 0){
                const tags = res.data.data;
                console.log("tags: ", tags);
                console.log("typeof tags", typeof tags);
                this.setState({
                    tags: tags,
                    error: "",
                });
            }
        }, err => {
            let message = _.get(err, "response.data.message", "");
            if (!message) message = `Fail to fetch your posts, http status is ${err.message}`;
            this.setState({
                error: message,
            })
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid" style={{
                    marginTop: 64,
                }}>
                    <div className="col-6 offset-3" style={{
                        lineHeight: 3,
                    }}>
                        {
                            this.state.tags.map((tag, index) => {
                                const count = tag.count;
                                // t r b l
                                let padding = getPadding(`${count}`);
                                return (
                                    <a className="btn btn-light" style={{
                                        // color: "#258",
                                        marginLeft: "auto",
                                        marginRight: 10,
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                    }}
                                       href={`/tags/${tag.name}`}
                                       role="button" key={index}>
                                        <div style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                        }}>{tag.name}&nbsp;<span style={{
                                            color: randomDark(),
                                            // background: randomLight(),
                                            // border: "1px solid",
                                            borderRadius: "50%",
                                            padding: padding,
                                            // border: "none",
                                        }}>{tag.count}</span></div>
                                    </a>
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
