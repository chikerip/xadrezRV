import { getDocGame, setDocGame } from "./firebase.js";
const searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get('id');
let scene = document.getElementById('scene'), lastPiece = null, gameStatus = null, turn = null, youTurn = null,player = null, oneTimeSnapshot = false, oneTimePiece = false;
let running = false;

function update(killPiece) {
    if(killPiece !== null){
        let pieceName = lastPiece.getAttribute('id');
        let piece = killPiece.getAttribute('id');
        let i1 = 0, i2 = 0;

        gameStatus.forEach((obj) => {
            if(obj.type == piece) {
                gameStatus.splice(i2, 1);
                killPiece.remove();

                setDocGame(id, gameStatus, !turn);
            }
            i2++;
        });

        gameStatus.forEach((obj) => {
            if(obj.type == pieceName){
                let futureObj = obj;
                gameStatus.splice(i1, 1);
                futureObj.position = lastPiece.getAttribute('class').slice(-2);
                gameStatus.push(futureObj);

                setDocGame(id, gameStatus, !turn);
            }
            i1++;
        });
    } else {
        let pieceName = lastPiece.getAttribute('id');
        let i = 0;

        gameStatus.forEach((obj) => {
            if(obj.type == pieceName){
                let futureObj = obj;
                gameStatus.splice(i, 1);
                futureObj.position = lastPiece.getAttribute('class').slice(-2);
                gameStatus.push(futureObj);

                setDocGame(id, gameStatus, !turn);
            }
            i++;
        });
    }
}

function killPiece(cordenada) {
    let allPieces = document.getElementsByClassName('piece');
    let amountPiece = 0, piece = null;

    for(let i = 0; i < allPieces.length; i++){
        let target = allPieces[i].getAttribute('class').slice(-2);

        if(cordenada == target){
            if(lastPiece !== allPieces[i]){
                piece = allPieces[i];
            }
            amountPiece++
        }
    }

    update(piece);
}

function movePiece(box) {
    let position = box.getAttribute('position');
    let cordenada = box.classList[0];

    lastPiece.setAttribute('position', `${position.x} ${position.y + 1} ${position.z}`);
    lastPiece.setAttribute('class', `piece ${cordenada}`);

    killPiece(cordenada);
}

function createGame(){
    let letters = ['a','b','c','d','e','f','g','h'];
    let inverce = false, y = -15;

    letters.forEach((elm) => {
        let i = 1
        while(i < 9){
            if(inverce == true){
                if(i%2 == 0){
                    let box = document.createElement('a-box');
                        box.setAttribute("color", "black");
                        box.setAttribute("position", `${(i - 1) * 5} -1 ${y}`)
                        box.setAttribute("scale", `5 2 5`)
                        box.setAttribute("class", `${elm + i}`)
                    scene.appendChild(box);
                }
                if(i%2 == 1){
                    let box = document.createElement('a-box');
                        box.setAttribute("color", "white");
                        box.setAttribute("position", `${(i - 1) * 5} -1 ${y}`)
                        box.setAttribute("scale", `5 2 5`)
                        box.setAttribute("class", `${elm + i}`)
                    scene.appendChild(box);
                }
            } else if (inverce == false){
                if(i%2 == 1){
                    let box = document.createElement('a-box');
                        box.setAttribute("color", "black");
                        box.setAttribute("position", `${(i - 1) * 5} -1 ${y}`)
                        box.setAttribute("scale", `5 2 5`)
                        box.setAttribute("class", `${elm + i}`)
                    scene.appendChild(box);
                }
                if(i%2 == 0){
                    let box = document.createElement('a-box');
                        box.setAttribute("color", "white");
                        box.setAttribute("position", `${(i - 1) * 5} -1 ${y}`)
                        box.setAttribute("scale", `5 2 5`)
                        box.setAttribute("class", `${elm + i}`)
                    scene.appendChild(box);
                }

            }
            i++
        }

        inverce = !inverce
        y += 5
    })

    setTimeout(()=>{
        reloadGame()
    },5000)
}

async function reloadGame(){
    async function piececreator(){
        const doc = await getDocGame(id);
        gameStatus = doc.gameData;

        gameStatus.forEach((obj) => {
            let box = document.getElementsByClassName(obj.position);
            let position = box[0].getAttribute('position');
    
            let piece = document.createElement('a-entity');
                    piece.setAttribute('position', `${position.x} ${position.y + 1} ${position.z}`)
                    piece.setAttribute('class', `piece ${obj.position}`)
                    piece.setAttribute('id', `${obj.type}`)
                    piece.setAttribute('gltf-model', `#${obj.piece}`)
            scene.appendChild(piece)
        });
    
        setTimeout(()=>{
            let allPieces = document.getElementsByClassName("piece");
            let allBox = document.getElementsByTagName('a-box');
    
            for(let i = 0; i < allBox.length; i++){
                allBox[i].addEventListener('click', (e) => {
                     movePiece(e.target);
                })
            }
    
            for(let i = 0; i < allPieces.length; i++){
                allPieces[i].addEventListener('click', (e) => {
                    let piece = e.target.id;
                    piece = piece.slice(-6, -1);
                    if(youTurn == turn){
    
                        if(player == 2 && (piece == 'Preto' || piece == 'aPret')){
                            lastPiece = e.target;
                        };
                        if(player == 1 && (piece == 'ranco' || piece == 'Branc')){
                            lastPiece = e.target;
                        }
                    }
                })
            }
        },1000)

    };

    if(oneTimePiece !== false){
        if(running == false){
            running = true;
            let allPieces = document.getElementsByClassName('piece');
            
            for(let i = 0; i < allPieces.length; i++){
                allPieces[i].remove();

                if(i == allPieces.length - 1){
                    piececreator();
                    running = false;
                }
            }
        }
    } else {
        oneTimePiece = !oneTimePiece;
        piececreator();
    };
}

export function camera(data){
    let rig = document.getElementById('rig');

    if(oneTimeSnapshot == false){
        if(data.players == 2){
            youTurn = !data.turn;
            player = data.players;
            rig.setAttribute('position', '20 30 -30');
            rig.setAttribute('rotation', '-50 180 0');
    
        } else if (data.players == 1){
            youTurn = data.turn;
            player = data.players;
            rig.setAttribute('position', '20 30 30');
            rig.setAttribute('rotation', '-50 0 0');
        }
        oneTimeSnapshot = !oneTimeSnapshot;
    } else {
        reloadGame();
    }

    turn = data.turn

    let cursor = document.createElement('a-cursor');
        cursor.setAttribute("color", "red");
        cursor.setAttribute("id", "cursor");

    let cameraa = document.getElementById('camera');
        cameraa.appendChild(cursor);

    createGame();
}