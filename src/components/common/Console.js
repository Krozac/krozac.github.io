import React, {useState, useEffect} from 'react';
import { useCli } from '../../hooks/cli/useCli';

export default function Console() {
    const cli = useCli();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);

    const runCommand = async (e) => {
        if (e.key === "Enter") {
            const result = await cli.execute(input);

            setOutput((prev)=> [...prev, `> ${input}`, result]);
            setInput("");
            //scroll to bottom of output
            setTimeout(() => {
                const outputDiv = document.querySelector(".console .output");
                outputDiv.scrollTop = outputDiv.scrollHeight;
            }, 100);
        }
    };

    return (
        <div className="console">
            <div className="output">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <div className="input">
                <p>{">"} </p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={runCommand}
                />
            </div>
        </div>
    );
}
