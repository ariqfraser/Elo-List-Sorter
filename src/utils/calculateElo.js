const getProbablility = (rAtingCurrent, rAtingCompare) => {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (rAtingCurrent - rAtingCompare) / 200))
}

/*
    rA = Rating A winner
    rb = Rating B loser
*/
export const getNewRating = (rA, rB) => {
    const c = 42
    const Pb = getProbablility(rA, rB)
    const Pa = getProbablility(rB, rA)
    let newRatingA;
    let newRatingB;

    newRatingA = rA + c * (1 - Pa)
    newRatingB = rB + c * (0 - Pb)
    console.log(c * (1 - Pa), '|',c * (0 - Pb))
    return [newRatingA, newRatingB]
}