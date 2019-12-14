import React from 'react'

export default function Me(props) {
    return (
        <div className="me right">
            <button className="btn blue">
                {props.body}
            </button>
            <br />
        </div>

    )
}
