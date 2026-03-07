let roundtype = 0
let redround = 0
let blueround = 0

nodecg.Replicant('redplayer').on('change', (newVal) => {
    update_name()
})

nodecg.Replicant('blueplayer').on('change', (newVal) => {
    update_name()
})

nodecg.Replicant('score').on('change', (newVal) => {
    update_score(newVal.red, newVal.blue)
})

nodecg.Replicant('round').on('change', (newVal) => {
    redround = newVal.red
    blueround = newVal.blue
    setRound()
})

nodecg.Replicant('round_name').on('change', (newVal) => {
    document.getElementById("round-name").innerText = newVal
})

nodecg.Replicant('roundtype').on('change', (newVal) => {
    const redrounds = document.getElementById("redround")
    while(redrounds.firstChild) redrounds.removeChild(redrounds.firstChild)
    const bluerounds = document.getElementById("blueround")
    while(bluerounds.firstChild) bluerounds.removeChild(bluerounds.firstChild)
    roundtype = newVal.type

    for (let i = 0; i < newVal.type; i++){
        const redspan = document.createElement("span")
        redspan.id = "redround." + i
        redspan.className = "roundgray"
        redrounds.appendChild(redspan)
        const bluespan = document.createElement("span")
        bluespan.id = "blueround." + i
        bluespan.className = "roundgray"
        bluerounds.appendChild(bluespan)
    }

    setRound()
})

nodecg.Replicant('reverse').on('change', (newVal) => {
    update_name()
    const score = nodecg.Replicant('score').value
    update_score(score.red, score.blue)
})

function setRound(){
    let count = roundtype
    for(let i = 0; i < count; i++){
        if (i < redround){
            document.getElementById("redround." + (roundtype - i - 1)).className = "roundwhite"
        }else {
            document.getElementById("redround." + (roundtype - i - 1)).className = "roundgray"
        }
        if (i < blueround){
            document.getElementById("blueround." + i).className = "roundwhite"
        }else {
            document.getElementById("blueround." + i).className = "roundgray"
        }
    }
}

function update_name(){
        if (nodecg.Replicant('reverse').value){
            document.getElementById("redteam").innerText = nodecg.Replicant('blueplayer').value
            document.getElementById("blueteam").innerText = nodecg.Replicant('redplayer').value
        }
        else {
            document.getElementById("redteam").innerText = nodecg.Replicant('redplayer').value
            document.getElementById("blueteam").innerText = nodecg.Replicant('blueplayer').value
        }
    }

    function update_score(red, blue){
        if (nodecg.Replicant('reverse').value){
            document.getElementById("redscore").innerText = blue
            document.getElementById("bluescore").innerText = red
        }
        else {
            document.getElementById("redscore").innerText = red
            document.getElementById("bluescore").innerText = blue
        }
    }