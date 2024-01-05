import { getDocsGame, newDocGame, joinnGame } from "./firebase.js";
let gameData = [{position: 'a1', piece:'torrePreto', type: 'torrePreto1'},{position: 'a2', piece:'cavaloPreto', type: 'cavaloPreto1'},{position: 'a3', piece:'bispoPreto', type: 'bispoPreto1'},{position: 'a4', piece:'reiPreto', type: 'reiPreto'},{position: 'a5', piece:'rainhaPreto', type: 'rainhaPreto'},{position: 'a6', piece:'bispoPreto', type: 'bispoPreto2'},{position: 'a7', piece:'cavaloPreto', type: 'cavaloPreto2'},{position: 'a8', piece:'torrePreto', type: 'torrePreto2'},
                    {position: 'b1', piece:'peaoPreto', type: 'peaoPreto1'},{position: 'b2', piece:'peaoPreto', type: 'peaoPreto2'},{position: 'b3', piece:'peaoPreto', type: 'peaoPreto3'},{position: 'b4', piece:'peaoPreto', type: 'peaoPreto4'},{position: 'b5', piece:'peaoPreto', type: 'peaoPreto5'},{position: 'b6', piece:'peaoPreto', type: 'peaoPreto6'},{position: 'b7', piece:'peaoPreto', type: 'peaoPreto7'},{position: 'b8', piece:'peaoPreto', type: 'peaoPreto8'},
                    {position: 'g1', piece:'peaoBranco', type: 'peaoBranco1'},{position: 'g2', piece:'peaoBranco', type: 'peaoBranco2'},{position: 'g3', piece:'peaoBranco', type: 'peaoBranco3'},{position: 'g4', piece:'peaoBranco', type: 'peaoBranco4'},{position: 'g5', piece:'peaoBranco', type: 'peaoBranco5'},{position: 'g6', piece:'peaoBranco', type: 'peaoBranco6'},{position: 'g7', piece:'peaoBranco', type: 'peaoBranco7'},{position: 'g8', piece:'peaoBranco', type: 'peaoBranco8'},
                    {position: 'h1', piece:'torreBranco', type: 'torreBranco1'},{position: 'h2', piece:'cavaloBranco', type: 'cavaloBranco1'},{position: 'h3', piece:'bispoBranco', type: 'bispoBranco1'},{position: 'h4', piece:'rainhaBranco', type: 'rainhaBranco'},{position: 'h5', piece:'reiBranco', type: 'reiBranco'},{position: 'h6', piece:'bispoBranco', type: 'bispoBranco2'},{position: 'h7', piece:'cavaloBranco', type: 'cavaloBranco2'},{position: 'h8', piece:'torreBranco', type: 'torreBranco2'},    
                ]


async function newGame(){
    const id = await newDocGame(gameData);
    window.location.href = `http://127.0.0.1:5500/src/pages/game.html?id=${id}`
};

async function tableConstrution() {
    let i = 0;
    const table = document.getElementById('gamesTable')
    getDocsGame().then((snapshot) => {
        snapshot.forEach((doc) =>{
            const data = doc.data()
            table.innerHTML += `
            <tr>
                <td>${doc.id}</td>
                <td>${data.players}</td>
                <td> <button class="${doc.id} ${data.players}" type="button" id="joinGame${i}">Join</button> </td>
            </tr>
            `

            i++

            if(i == snapshot.length){
                let elem = document.getElementsByClassName(`join`);

                for(let p = 0; p < elem.length; p++){
                    console.log('a')
                    elem[p].addEventListener('click', async(e) => {
                        let values = e.target.classList;
        
                        if(1 == values[1]){
                            await joinnGame(values[0], gameData, true);
                            window.location.href = `${location.origin}/src/pages/game.html?id=${values[0]}`
                        }
                    });
                }
            }
            // console.log(doc.data(), doc.id)
        });
    });

};

tableConstrution()

document.getElementById('newGame').addEventListener('click', () => {
    newGame()
});