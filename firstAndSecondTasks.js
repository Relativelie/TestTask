
const taskOne = `const square = document.querySelector(".tn-atom");
square.addEventListener("click", function (square) {
    const allBorders = [
        "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius",
    ];
    let activeBorder = "";
    let prevActiveBorder = "";
    const activeBorderStyle = square.target.style[0]
    if (activeBorderStyle === undefined) {
        activeBorder = allBorders[0]
    } else {
        for(let i=0; i<allBorders.length; i++) {
            if (square.target.style[allBorders[i]] === "10px") {
                prevActiveBorder = allBorders[i];
                const number = i === allBorders.length-1 ? -1 : i;
                activeBorder = allBorders[number + 1];
            }
        }
    }
    square.target.style[prevActiveBorder] = "0"
    square.target.style[activeBorder] = "10px"
})`

const taskTwo = `const square = document.querySelector(".tn-atom");
square.addEventListener("click", function (square) {
    if (square.target.style.transform === "scale(1.2)") {
        square.target.style.transform = "scale(1)";
    } else square.target.style.transform = "scale(1.2)";
})`