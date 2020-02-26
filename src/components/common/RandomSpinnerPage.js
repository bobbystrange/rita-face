import React from 'react';
import RandomSpinner from "./RandomSpinner";
import Header from "./Header";
import {randi2} from "../../util/random";

export default class RandomSpinnerPage extends React.Component {
    render() {
        const spinners = [];
        const len = randi2(64, 256);
        for (let i = 0; i < len; i++) {
            spinners.push(i);
        }
        return (
                <div>
                    <Header/>
                    <div className="container-fluid" style={{
                        marginTop: 84,
                    }}>
                        {
                            spinners.map(i => <RandomSpinner key={i}/>)
                        }
                    </div>
                </div>
        );
    }
}
