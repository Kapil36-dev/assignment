import React, { useEffect, useState } from 'react'

function Home() {
    const [argumentsList, setArgumentsList] = useState([{ key: "My arg", value: "false"}]);
    var comp;
    const options = [
        { key: "constant", value: "constant" },
        { key: "variable", value: "variable" },
        { key: "And", value: "and" },
        { key: "Or", value: "or" }
    ];

    const [result, setResult] = useState();

    const return1Selects = () =>{
        comp+=`
            <select onChange=${(e) => handleSelect(e)}>
                <option value="" selected disabled>select....</option>
                ${options.map((option) => (
                    `<option value=${option.value}>${option.key}</option>`
                ))}
            </select>`
            document.getElementById('return').innerHTML+=comp;
    }
    const return2Selects = () => {
        comp=
            `<div>
                <div>
                <select onChange=${(e)=>calculate(e)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>
                <div>
                <select onChange=${(e)=>calculate(e)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>
                <div>
                <button onClick=${(return1Selects)}>add</button>
            </div>`;
        document.getElementById('return').innerHTML+=comp;
    };

    const handleSelect = (e) => {
        console.log(e.target.value);
        // if option is constant or variable, then show the input
        // if option is and or or, then show the select 2 times
        var component;
        switch (e.target.value) {
            case "constant":
                setResult('true');
                component =
                    `<select onchange="calculate(event)">
                        <option value="true" selected>True</option>
                        <option value="false">False</option>
                    </select>
                    `
                    document.getElementById('return').innerHTML=component;
                break;
            case "variable":
                setResult(argumentsList[0].value)
                console.log(argumentsList[0].value);
                component =
                    `<select onChange=${(e)=>calculate(e)}>
                        ${argumentsList.map((argument) => (
                            `<option value=${argument.value}>${argument.key}</option>`
                        ))}
                    </select>
                    <button onClick={delete}>-</button>`;
                document.getElementById('return').innerHTML=component;
                break; 
            case "and":
                console.log("jdhfjah");
                return2Selects();
                break;
            case "or":
                return2Selects();
                break
        }
    };

    const calculate =(e)=>{
        setResult(e.target.value)
    }
    const handleArgumentNameChange = (e, index) => {
        const newArgumentsList = [...argumentsList];
        newArgumentsList[index].key = e.target.value;
        setArgumentsList(newArgumentsList);
    };

    const handleArgumentValueChange = (e, index) => {
        const newArgumentsList = [...argumentsList];
        newArgumentsList[index].value = e.target.value;
        setArgumentsList(newArgumentsList);
    };

    useEffect(() => {
        // setArgumentsList();
      },[argumentsList]);
    return (
        <div>
            {argumentsList.map((argument, index) => (
                <div>
                    <input
                        type="text"
                        value={argument.key}
                        onChange={(e) => handleArgumentNameChange(e, index)}
                    />
                    <select
                        onChange={(e) => handleArgumentValueChange(e, index)}
                        value={argument.value}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    {index > 0 && (
                        <button onClick={() =>setArgumentsList(argumentsList.filter((_, i) => i !== index))} >
                            -
                        </button>
                    )}
                    <br />
                </div>
            ))}
            <button onClick={() =>setArgumentsList([...argumentsList, { key: "", value: "false" }])}>+</button>
            <br />
            {result==="true"||result==="false"?
"":
            <select onChange={(e) => handleSelect(e)}>
                <option value="" selected disabled>select....</option>
                {options.map((option) => (
                    <option value={option.value}>{option.key}</option>
                ))}
            </select>
            }
            <div id='return'></div>
            <br />
            {
          result?
          <div>result: {result}</div>:
          <div>result: undefine</div>
        }
        </div>
    );
}

export default Home