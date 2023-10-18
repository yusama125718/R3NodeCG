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