import React from 'react';
import {randi2} from "../../util/random";

export default class RandomSpinner extends React.Component {
    render() {
        const diameter = Math.floor(Math.pow(randi2(1, 32), 5) / (2 << 20));
        const left = randi2(0, 100);
        const top = randi2(0, 100);

        return (
                <div className="spinner-grow" role="status" style={{
                    position: "absolute",
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${diameter}rem`,
                    height: `${diameter}rem`,
                }}>
                    <span className="sr-only">Loading...</span>
                </div>
        );
    }
}
