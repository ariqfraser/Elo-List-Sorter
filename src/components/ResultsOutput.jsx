import styled from "@emotion/styled";
import React from "react";

const ResultsOutput = ({ data = []}) => {
    const Table = styled("table")({
        '&>thead>tr>th': {
            color: 'var(--grey)',
            fontWeight: 200,
        },
        '&>tbody>tr>td': {
            margin: 0,
            border: 'none',
            paddingLeft: 12
        },
        '&>tbody>tr': {
            margin: 0,
            border: 'none',
        },
        color: 'var(--green)',
        width: '100%',
        margin: 0,
            border: 'none',

    });

    const ScrollWrapper = styled('div')({
        overflowX: "hidden",
        overflowY: 'scroll',
        maxHeight: '50vh',
        gridColumn: 'span 2',
        borderTop: '1px solid var(--grey)',
        borderLeft: '1px solid var(--grey)',
    })

    return (<>
        {/* <Table>
            <thead>
                <tr>
                    <th className=""></th>
                    <th className="rank">Title</th>
                    <th className="rank">Elo</th>
                </tr>
            </thead>
        </Table> */}
        <ScrollWrapper>
        <Table>
        <tbody>
                {data.map((v, i) => {
                    return (
                        <tr
                            key={`tr${
                                Math.floor(Math.random() * 100000000) + 1
                            }`}
                            
                        >
                            <td key={Math.floor(Math.random() * 100000000) + 1}>
                                {v.title}
                            </td>
                            <td key={Math.floor(Math.random() * 100000000) + 1} style={{marginLeft: 'auto'}}>
                                {Math.floor(v.elo)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        </ScrollWrapper>
        </>
    );
};

export default ResultsOutput;
