export const saveSetToLocalStorage = ({data, title = '', counter = 0}) => {
    localStorage.setItem(
        "comparisonData-" + title,
        JSON.stringify(data)
    );
    localStorage.setItem("conparisonCount-" + title, counter);
};