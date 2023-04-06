import React, { useState } from 'react'

export default function Button() {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <h1>counter = {counter}</h1>
            <button onClick={() => {
                setCounter(counter + 1);
                setCounter(counter + 1);
            }}>
                +
            </button>
        </div>
    )
}
