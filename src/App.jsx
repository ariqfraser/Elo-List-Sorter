import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { getNewRating } from "./utils/calculateElo";
import {
    MainLayout,
    PageWrapper,
    SideNav,
    TopNav,
    Footer,
    BattleBox,
    CreateBox,
    ImportBox,
    FeedBox,
} from "./components/Containers";
import ResultsOutput from "./components/ResultsOutput";
import { motion } from "framer-motion";
import { saveSetToLocalStorage } from "./utils/save";
import { eloDesc } from "./utils/sort";
import { SideNavBtn, TopNavBtn } from "./components/NavBtns";

function App() {
    console.time("LoadTime");
    useEffect(() => {
        console.timeEnd('LoadTime');
    }, []);
    const [counter, setCounter] = useState(0);
    const [opt1, setOpt1] = useState(0);
    const [opt2, setOpt2] = useState(1);
    const [data, setData] = useState([
        { title: "Enter List" },
        { title: "Enter List" },
    ]);
    const [sortedData, setSortedData] = useState([]);
    const inputTitles = useRef();
    const inputElo = useRef();
    const [listTitle, setListTitle] = useState("No List Loaded");
    const [sets, setSets] = useState(JSON.parse(localStorage.getItem('comparisonSets')) || [])
    const [currentSet, setCurrentSet] = useState('')
    const listTitleInput = useRef();
    const output = useRef();

    const getNewComparison = () => {
        return Math.floor(Math.random() * data.length);
    };

    const handleWinner = (winnerIndex, loserIndex) => {
        console.log(winnerIndex, "wins");
        const newElo = getNewRating(
            data[winnerIndex].elo,
            data[loserIndex].elo
        );
        let tempData = data;
        tempData[winnerIndex] = {
            title: data[winnerIndex].title,
            elo: newElo[0],
        };
        tempData[loserIndex] = {
            title: data[loserIndex].title,
            elo: newElo[1],
        };
        // console.table(tempData)
        setData(tempData);

        const newOpt1 = getNewComparison();
        let newOpt2 = getNewComparison();
        while (newOpt2 === newOpt1) {
            newOpt2 = getNewComparison();
        }
        setOpt1(newOpt1);
        setOpt2(newOpt2);
        setSortedData(eloDesc(data));
        console.log(sortedData);
        setCounter(counter + 1);
        // document.getElementById('1').innerHTML = data[opt1].title
        console.log(data[newOpt1].title, "vs", data[newOpt2].title);
        saveSetToLocalStorage(sortedData, listTitle, counter);
    };

    const newSet = () => {
        const titles = inputTitles.current.value.split("\n");
        const existingElo = inputElo.current.value.split("\n");
        let fullList = [];
        for (let i in titles) {
            fullList.push({ title: titles[i], elo: existingElo[i] * 20 });
        }
        setCounter(0);
        setData(fullList);
        setListTitle(listTitleInput.current.value);

        if (sets.length > 0){
            setSets(prevItems=>[...prevItems, listTitleInput.current.value])
        } else {
            setSets(listTitleInput.current.value)
        }
        setCurrentSet(listTitleInput.current.value)
        saveSetToLocalStorage(fullList, listTitleInput.current.value, counter);
    
    };

    const loadSet = (e) => {
        setCurrentSet(e.currentTarget.title)
        setCounter(
            parseInt(localStorage.getItem("conparisonCount-" + e.currentTarget.title))
        );
        setData(JSON.parse(localStorage.getItem("comparisonData-" + e.currentTarget.title)));
        setListTitle(e.currentTarget.title);
        
    };

    useLayoutEffect(()=>{
        setCurrentSet(sets[0])
    }, [])

    return (
        <PageWrapper>
            <SideNav>
                
                <SideNavBtn icon="sort" active />
                <SideNavBtn icon="graph" />
                <SideNavBtn icon="settings" className={"split"} />
            </SideNav>
            <TopNav>
                {sets.map((v,i)=>{
                    return <TopNavBtn key={i} title={v} onClick={(e)=>loadSet(e) } active={v===currentSet && 'true'}>{v}</TopNavBtn>
                })}
            </TopNav>
            <MainLayout>
                <FeedBox></FeedBox>
                <BattleBox>
                    <motion.button
                        onClick={(e) => handleWinner(opt1, opt2)}
                        id="1"
                        whileTap={{ scale: 0.95 }}                    >
                        {data[opt1].title}
                    </motion.button>

                    <motion.button
                        onClick={(e) => handleWinner(opt2, opt1)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {data[opt2].title}
                    </motion.button>
                </BattleBox>

                <ResultsOutput data={sortedData} />
                <CreateBox>
                    <textarea ref={inputTitles} />

                    <textarea ref={inputElo} />
                    <button onClick={newSet}>New set</button>
                </CreateBox>
                <ImportBox>
                    <input
                        type={"text"}
                        placeholder="Title for list"
                        ref={listTitleInput}
                    />
                    <button onClick={loadSet}>Load set</button>
                </ImportBox>
            </MainLayout>
            <Footer></Footer>
        </PageWrapper>
    );
}

export default App;
