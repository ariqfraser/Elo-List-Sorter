import styled from "@emotion/styled";
import React from "react";
import { Center } from "./Containers";
const ResultsOutput = ({ data = [] }) => {
    const Table = styled('div')({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        color: 'white',
        gap: '1em',
        '&> .rank': {
            display: 'flex',
            justifyContent: 'center',
        }
    })
    return (
        <Center>
            <Table>

                    <h3 className="rank">Rank</h3>
                    <h3 className="rank">Title</h3>
                    <h3 className="rank">Elo</h3>

                {data.map((v, i) => {
                    return (<>

                        <div key={Math.floor(Math.random() * 100000000) + 1} className="rank">{i}</div>
                        <div key={Math.floor(Math.random() * 100000000) + 1}>{v.title}</div>
                        <div key={Math.floor(Math.random() * 100000000) + 1}>{v.elo}</div>
                        </>
                    );
                })}
            </Table>
        </Center>
    );
};

export default ResultsOutput;
