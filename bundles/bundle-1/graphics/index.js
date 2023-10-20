let roundtype = 0
let redround = 0
let blueround = 0

nodecg.Replicant('redplayer').on('change', (newVal) => {
    document.getElementById("redteam").innerText = newVal.name
})

nodecg.Replicant('blueplayer').on('change', (newVal) => {
    document.getElementById("blueteam").innerText = newVal.name
})

nodecg.Replicant('score').on('change', (newVal) => {
    document.getElementById("redscore").innerText = newVal.red
    document.getElementById("bluescore").innerText = newVal.blue
})

nodecg.Replicant('round').on('change', (newVal) => {
    redround = newVal.red
    blueround = newVal.blue
    setRound()
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