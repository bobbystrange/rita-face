import React from 'react';
import {getSetting} from "../../actions";
import {getUsername, storage} from "../../config";

export default class Header extends React.Component {
    state = {
        avatar: "",
        fullName: "",
    };

    componentDidMount() {
        const setting = storage.getUserSetting();
        if (setting) {
            this.setState({
                fullName: setting.fullName,
                avatar: setting.avatar,
                error: "",
            });
            return
        }

        const username = getUsername();
        getSetting(username).then(res => {
            if (res.data.code === 0) {
                const setting = res.data.data;
                this.setState({
                    fullName: setting.fullName,
                    avatar: setting.avatar,
                    error: "",
                });
                storage.setUserSetting(setting)
            } else {
                console.log(res.data.msg)
            }
        });
    }

    render() {
        return (
            <div className="row" style={{
                position: "fixed",
                top: 0,
                zIndex: 2,
                width: "100%",
                // 200 229 201
                background: "#fff",
            }}>
                <div className="col-8 offset-2" style={{
                    height: 48,
                }}>
                    <div className="row">
                        <a href="/" style={{
                            display: "flex",
                            color: "#012",
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} className="btn">
                            <img src={`${this.state.avatar}`}
                                 alt="avatar" style={{
                                height: 32,
                            }}/>
                            <h4 style={{
                                marginLeft: 5,
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>{this.state.fullName}</h4>
                        </a>

                        {/*{*/}
                        {/*    ["Home", "Archives", "Tags", "Styles", "Search", "About"].map((name, index) => {*/}
                        {/*        let href;*/}
                        {/*        if (name === 'Home'){*/}
                        {/*            href = "/";*/}
                        {/*        } else href = name.toLowerCase();*/}
                        {/*        return <a className="btn btn-light" style={{*/}
                        {/*            color: "#258",*/}
                        {/*            marginLeft: "auto",*/}
                        {/*            marginRight: 5,*/}
                        {/*            marginTop: "auto",*/}
                        {/*            marginBottom: "auto",*/}
                        {/*        }} href={href} role="button" key={index}>*/}
                        {/*            <p style={{*/}
                        {/*                marginTop: "auto",*/}
                        {/*                marginBottom: "auto",*/}
                        {/*            }}>{name}</p>*/}
                        {/*        </a>*/}
                        {/*    })*/}
                        {/*}*/}
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginLeft: "auto",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>Home</p>
                        </a>
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/tags" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>Tags</p>
                        </a>
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/archives" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>Archives</p>
                        </a>
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/styles" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>Styles</p>
                        </a>
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/search" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>Search</p>
                        </a>
                        <a className="btn btn-light" style={{
                            color: "#258",
                            marginRight: 5,
                            marginTop: "auto",
                            marginBottom: "auto",
                        }} href="/about" role="button">
                            <p style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                            }}>About</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
