import React from 'react';
import Footer from './common/Footer';
import Header from './common/Header'
import {HIGHLIGHT_STYLE_LIST, md2html, pushForcibly, storage} from "../config";
import {choose} from "../util/random";

const IMPORT_THIS = "### The Zen of Python, by Tim Peters\n" +
    "```\n" +
    "Beautiful is better than ugly.\n" +
    "Explicit is better than implicit.\n" +
    "Simple is better than complex.\n" +
    "Complex is better than complicated.\n" +
    "Flat is better than nested.\n" +
    "Sparse is better than dense.\n" +
    "Readability counts.\n" +
    "Special cases aren't special enough to break the rules.\n" +
    "Although practicality beats purity.\n" +
    "Errors should never pass silently.\n" +
    "Unless explicitly silenced.\n" +
    "In the face of ambiguity, refuse the temptation to guess.\n" +
    "There should be one-- and preferably only one --obvious way to do it.\n" +
    "Although that way may not be obvious at first unless you're Dutch.\n" +
    "Now is better than never.\n" +
    "Although never is often better than *right* now.\n" +
    "If the implementation is hard to explain, it's a bad idea.\n" +
    "If the implementation is easy to explain, it may be a good idea.\n" +
    "Namespaces are one honking great idea -- let's do more of those!\n```";

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        const setting = storage.getUserSetting();
        if (!setting) {
            pushForcibly("/")
        } else {
            document.title = "About -" + setting.fullName;
        }
    }

    render() {
        const style = choose(1, HIGHLIGHT_STYLE_LIST);
        return (
            <div>
                <link rel="stylesheet" type="text/css"
                      href={`/static/css/highlight/${style}.css`}/>
                : <span/>
                <Header/>
                <div className="container-fluid" style={{
                    marginTop: 84,
                }}>
                    <div className="col-6 offset-3" dangerouslySetInnerHTML={{__html: md2html(IMPORT_THIS)}}>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
