import { useState } from "react";



export function Button() {
    //let it changed
    //let counter = 0;

    const [counter, setCounter] =useState(0)

    function increment() {
        setCounter( counter + 1 )
        console.log(counter);
    }

    return (
       <button onClick={increment}>{counter}</button>
    )
}

//named export sem usar o default