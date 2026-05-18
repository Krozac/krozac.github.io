import React, {useState, useEffect} from 'react';
import { useCli } from '../../hooks/cli/useCli';

export default function Console() {
    const cli = useCli();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);

    const [prev,setPrev] = useState([]);
    const [prevIdx,setPrevIdx]  = useState(0);

    const runCommand = async (e) => {
        if (e.key === "Enter") {
            const result = await cli.execute(input);

            setPrev((prev) => [...prev, input]);
            setPrevIdx(-1);

            if (result === "\x1b[2J\x1b[H") {
                setOutput([]);
                setInput("");
                return;
            }

            setOutput((prev)=> [...prev, `> ${input}`, result]);
            setInput("");
            //scroll to bottom of output
            setTimeout(() => {
                const outputDiv = document.querySelector(".console .output");
                outputDiv.scrollTop = outputDiv.scrollHeight;
            }, 100);
        }
        if (e.key === "Tab"){
            e.preventDefault();

            if (input.trim().length === 0){
                return;
            }

            const commands = cli.getCommandNames();

            const match = commands.find(cmd => cmd.startsWith(input.trim()));

            if (match){
                setInput(match + "")
            }
            return;
        }
        if (e.key === "ArrowUp"){
            e.preventDefault();
            setPrevIdx((idx) => {
                const newIdx = idx < prev.length - 1 ? idx + 1 : idx;

                setInput(prev[prev.length - 1 - newIdx] || "");

                return newIdx;
            });
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();

            setPrevIdx((idx) => {
                const newIdx = idx > 0 ? idx - 1 : -1;

                if (newIdx === -1) {
                    setInput("");
                } else {
                    setInput(prev[prev.length - 1 - newIdx]);
                }

                return newIdx;
            });

            return;
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
