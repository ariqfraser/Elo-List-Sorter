import styled from "@emotion/styled";
import { useState, useRef, useEffect} from "react";
import "./App.css";
import {getNewRating} from './utils/calculateElo'
import { Center } from './components/Containers'
import ResultsOutput from "./components/ResultsOutput";


function App() {
    console.time('LoadTime')
    useEffect(() => {
        console.timeEnd('LoadTime')
    }, [])
    const [counter, setCounter] = useState(0)
    const [opt1, setOpt1] = useState(0);
    const [opt2, setOpt2] = useState(1);
    const [data, setData] = useState([{title: 'Enter List'}, {title: 'Enter List'}]);
    const [sortedData, setSortedData] = useState([])
    const inputTitles = useRef();
    const inputElo = useRef();
    const [listTitle, setListTitle] = useState('');
    const listTitleInput = useRef()
    const output = useRef();

    const getNewComparison = () => {return Math.floor(Math.random() * data.length)}

    const handleWinner = (winnerIndex, loserIndex) => {
        console.log(winnerIndex, "wins");
        const newElo = getNewRating(data[winnerIndex].elo, data[loserIndex].elo)
        let tempData = data;
        tempData[winnerIndex] = {title: data[winnerIndex].title, elo: newElo[0]}
        tempData[loserIndex] = {title: data[loserIndex].title, elo: newElo[1]}
        // console.table(tempData)
        setData(tempData)
        
        const newOpt1 = getNewComparison()
        let newOpt2 = getNewComparison()
        while (newOpt2 === newOpt1){
            newOpt2 = getNewComparison()
        }
        setOpt1(newOpt1)
        setOpt2(newOpt2)
        setSortedData(data.sort((a,b)=>{
            return b.elo - a.elo 
        }))
        setCounter(counter+1)
        // document.getElementById('1').innerHTML = data[opt1].title
        console.log(data[newOpt1].title, 'vs', data[newOpt2].title)
    };

    const newSet = () => {
        const titles = inputTitles.current.value.split('\n')
        const existingElo = inputElo.current.value.split('\n')
        let fullList = []
        for (let i in titles){
            fullList.push({title: titles[i], elo: (existingElo[i]*20)})
        }
        setCounter(0)
        setData(fullList)
        setListTitle(listTitleInput.current.value)
    }

    const loadSet = () => {
        let err = 'ERROR:\n';
        const inputVal = listTitleInput.current.value.trim()
        if (inputVal=== null) err += 'set title\n';
        if (localStorage.getItem('comparisonData-'+inputVal) === null) err += 'no set found\n';
        if (err !== 'ERROR:\n') {
            alert(err)
            return
        }

        setCounter(parseInt(localStorage.getItem('conparisonCount-'+inputVal)))
        setData(JSON.parse(localStorage.getItem('comparisonData-'+inputVal)))
        setListTitle(inputVal)
    }



    return (
        <>
            <textarea ref={inputTitles} />
            <textarea ref={inputElo} />
            <input type={'text'} placeholder='Title for list' ref={listTitleInput}/>
            <button onClick={newSet}>New set</button>
            <button onClick={loadSet}>Load set</button>
            <h1 style={{ color: "white" }}>What is better? Count: {counter}</h1>
            <Center>
                <button onClick={(e) => handleWinner(opt1, opt2)} id='1' >
                    {data[opt1].title}
                </button>
                <button onClick={(e) => handleWinner(opt2, opt1)} >
                {data[opt2].title}
                </button>
            </Center>
            {/* <textarea ref={output} value={sortedData}/>
            <textarea value={sortedData.map((value)=>{
                return JSON.stringify(value.elo)
            })}/> */}
            <button onClick={() => {
                console.table(sortedData)
                localStorage.setItem('comparisonData-'+listTitle, JSON.stringify(sortedData))
                localStorage.setItem('conparisonCount-'+listTitle, counter)
            }}>show results</button>
            <ResultsOutput data={sortedData}/>
        </>
    );
}

export default App;
