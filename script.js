let ITEMARRAY = [];
let ITEMDICT = {};
let TABLEDICT = {};
let TABLEARRAY = [];
let x = 0;

let rowNum = 0;

function initialize() {
    item = document.getElementById("Item");
    removeVar = document.getElementById("removeItems");
    quantity = document.getElementById("num");
    table = document.getElementById("listTable");
    itemDown = document.getElementById("moveItemDown");
    itemUp = document.getElementById("moveItemUp");
    document.getElementById("plus").addEventListener("click", increment);
    document.getElementById("minus").addEventListener("click", decrement);
    blueStud = new Audio('./Lego Blue Stud - Sound Effect (HD).mp3');
    yodaScream = new Audio('./Lego yoda death sound.mp3');
    legoBuild = new Audio('./Lego Build - Sound Effect (HD).mp3');
}

function addItem() {
    blueStud.play();
    console.log(ITEMARRAY);
    if(item.value.length > 50) {
        alert("Your item's name is too long")
        console.log(validateInput(item.value.length, 50));
    }
    else if (!(ITEMARRAY.includes(item.value)))
    {
        ITEMARRAY.push(item.value);
        ITEMDICT[item.value] = Number(quantity.innerHTML);
        newRow = table.insertRow(-1);
        newCell = newRow.insertCell(-1);
        newText = document.createTextNode(ITEMARRAY.indexOf(item.value)+1);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(-1);
        newText = document.createTextNode(ITEMARRAY[ITEMARRAY.indexOf(item.value)]);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(-1);
        /*console.log(ITEMDICT[item.value]);*/
        newText = document.createTextNode(ITEMDICT[item.value]);
        newCell.appendChild(newText);
        rowNum++;
        TABLEDICT[item.value] = rowNum;
        /*console.log(TABLEDICT);*/
        console.log(table.innerHTML);
        TABLEARRAY.push(table.rows[TABLEDICT[item.value]].innerHTML);
        console.log(table.innerHTML);
    }
    else {
        ITEMDICT[item.value] += Number(quantity.innerHTML);
        console.log(table.rows[TABLEDICT[item.value]]);
        console.log(table);
        console.log(item.value);
        console.log(TABLEDICT[item.value]);
        console.log(table.rows[TABLEDICT[item.value]]);
        table.rows[TABLEDICT[item.value]].cells[2].innerHTML = ITEMDICT[item.value];
    }
}

function validateInput(input1, input2) {
    if(input1 === input2) {return true}
    else if(input2 == input2) {return false}
}

function removeItem() {
    console.log(ITEMARRAY.includes(removeVar.value));
    if (ITEMARRAY.includes(removeVar.value)) {
        yodaScream.play();
        table.rows[TABLEDICT[removeVar.value]].remove();
        delete (TABLEDICT[removeVar.value]);
        delete ITEMDICT[removeVar.value];
        ITEMARRAY.splice(ITEMARRAY.indexOf(removeVar.value), 1);
        rowNum--;
    }  
}

decrement = () =>   {ITEMDICT[item.innerHTML] = quantity.innerHTML - 1; 
                    (!(quantity.innerHTML <= 1)) ? quantity.innerHTML = quantity.innerHTML - 1 : null;}

function increment() {
    ITEMDICT[item.innerHTML] = quantity.innerHTML + 1;
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
}

function moveUp() {
    console.log(ITEMDICT);
    if(ITEMARRAY.includes(itemUp.value) && ITEMARRAY.indexOf(itemUp.value) != 0) {
        legoBuild.play();
        thirdHand = itemUp.value;
        thirdHandIdx = ITEMARRAY.indexOf(itemUp.value);
        table.rows[thirdHandIdx+1].cells[1].innerHTML = table.rows[thirdHandIdx].cells[1].innerHTML;
        table.rows[thirdHandIdx+1].cells[2].innerHTML = table.rows[thirdHandIdx].cells[2].innerHTML;
        table.rows[thirdHandIdx].cells[1].innerHTML = thirdHand;
        table.rows[thirdHandIdx].cells[2].innerHTML = ITEMDICT[thirdHand];
        tempSwap = ITEMARRAY[thirdHandIdx];
        console.log(`tempSwap: ${tempSwap}`);
        console.log(`Pre-first-change ITEMARRAY: ${ITEMARRAY}`)
        ITEMARRAY[thirdHandIdx] = ITEMARRAY[thirdHandIdx-1];
        console.log(`Post-first-change ITEMARRAY: ${ITEMARRAY}`)
        ITEMARRAY[thirdHandIdx-1] = tempSwap
        console.log(`Final ITEMARRAY: ${ITEMARRAY}`)
        console.log(ITEMARRAY);
    }
    else {alert("invalid input or is at top of list");}
}

function moveDown() {
    console.log(ITEMDICT);
    if(ITEMARRAY.includes(itemDown.value) && ITEMARRAY.indexOf(itemDown.value) < ITEMARRAY.length-1) {
        legoBuild.play();
        thirdHand = itemDown.value;
        thirdHandIdx = ITEMARRAY.indexOf(itemDown.value) + 1;
        table.rows[thirdHandIdx].cells[1].innerHTML = table.rows[thirdHandIdx+1].cells[1].innerHTML;
        table.rows[thirdHandIdx].cells[2].innerHTML = table.rows[thirdHandIdx+1].cells[2].innerHTML;
        table.rows[thirdHandIdx+1].cells[1].innerHTML = thirdHand;
        table.rows[thirdHandIdx+1].cells[2].innerHTML = ITEMDICT[thirdHand];
        tempSwap = ITEMARRAY[thirdHandIdx-1];
        console.log(`tempSwap: ${tempSwap}`);
        console.log(`thirdHandIdx: ${thirdHandIdx}`);
        console.log(`Pre-first-change ITEMARRAY: ${ITEMARRAY}`);
        ITEMARRAY[thirdHandIdx-1] = ITEMARRAY[thirdHandIdx];
        console.log(`Post-first-change ITEMARRAY: ${ITEMARRAY}`);
        ITEMARRAY[thirdHandIdx] = tempSwap;
        console.log(`Final ITEMARRAY: ${ITEMARRAY}`);
        console.log(ITEMARRAY);

    }
    else {alert("invalid input or is at bottom of list");}
}

