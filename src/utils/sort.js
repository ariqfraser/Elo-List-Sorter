export const eloDesc = (data) => {
    const sortedData = data.sort((a, b) => {
        return b.elo - a.elo;
    })

    return sortedData
}

export const eloAsc = (data) => {
    const sortedData = data.sort((a, b) => {
        return a.elo - b.elo;
    })
    return sortedData
}