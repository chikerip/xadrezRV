let gameStatus = [], lastPiece;

function refershGameStatus(cordenada, piece, type) {
    let obj = {
        cordenada: cordenada,
        piece: piece,
        type: type
    }
    gameStatus.push(obj)
}

function killPiece(cordenad){
    let i = 0, cord = []
    gameStatus.forEach((elm) => {
        if(elm.cordenada == cordenad){
            cord.push(i)
        }
        i++
    })

    if(cord.length > 1){
        if(cordenad.slice(0, 1) == "g" || cordenad.slice(0, 1) == "b"){
            let deadPiece = document.getElementsByClassName(`${gameStatus[cord[0]].piece}${gameStatus[cord[0]].type}`)
            deadPiece = deadPiece[cordenad.slice(-1) - 1]
            deadPiece.remove()
        } else {
            let deadPiece = document.getElementsByClassName(`${gameStatus[cord[0]].piece}${gameStatus[cord[0]].type}`)
            deadPiece = deadPiece[0]
            deadPiece.remove()
        }
    }
}

function movePiece(evt){
    lastPiece.setAttribute("position", evt.getAttribute("position"))

    let i = 0, obj, condition = false

    if(lastPiece.getAttribute("class").slice(-5) == "Preto"){
        condition = true
    }
    gameStatus.forEach((elm) => {
        if(condition == true){
            if(elm.type == lastPiece.getAttribute("class").slice(-5)){
                if(elm.piece == lastPiece.getAttribute("class").slice(0, -5)){
                    obj = {
                        cordenada: evt.getAttribute("class"),
                        piece: elm.piece,
                        type: elm.type
                    }
                    gameStatus.splice(i, 1)
                }
            }
        } else {
            if(elm.type == lastPiece.getAttribute("class").slice(-6)){
                if(elm.piece == lastPiece.getAttribute("class").slice(0, -6)){
                    console.log(elm)
                    console.log(i)
                    obj = {
                        cordenada: evt.getAttribute("class"),
                        piece: elm.piece,
                        type: elm.type
                    }
                    gameStatus.splice(i, 1)
                }
            }
        }
        i++
    })

    gameStatus.push(obj)
    killPiece(evt.getAttribute("class"))

    // document.getElementById('cursor').remove()
}

function eventListener(piece){
    piece.addEventListener('click', (event) =>{
        if(event.target !== lastPiece){
                 lastPiece = event.target
                 let obj = {
                     x: lastPiece.getAttribute("position").x,
                     y: lastPiece.getAttribute("position").y,
                     z: lastPiece.getAttribute("position").z + 1
                 }
                 lastPiece.setAttribute("position", obj)
     
        } else {
             let obj = {
                 x: lastPiece.getAttribute("position").x,
                 y: lastPiece.getAttribute("position").y,
                 z: lastPiece.getAttribute("position").z - 1
             }
             if(obj.z !== -1){
                 lastPiece.setAttribute("position", obj)
                 lastPiece = event.target
             }
        }
     })
}

function gameConstrutor(){
    function pieceCreator (i, tabuleiro, y, row, colorPiece, piecePeao){
        let scene = document.querySelector('a-scene')
        let valueBlackPiece = ["torrePreto", "cavaloPreto", "bispoPreto", "reiPreto", "rainhaPreto", "bispoPreto", "cavaloPreto", "torrePreto","peaoPreto"]
        let valueBrancoPiece = ["torreBranco", "cavaloBranco", "bispoBranco", "rainhaBranco", "reiBranco", "bispoBranco", "cavaloBranco", "torreBranco","peaoBranco"]
    
        if(colorPiece === false){
            if(piecePeao == false){
                let piece = document.createElement('a-entity');
                piece.setAttribute("position", `${tabuleiro} -1 ${y - 1}`)
                piece.setAttribute("id", `${row}`)
                piece.setAttribute("class", `${valueBlackPiece[i-1]}`)
                piece.setAttribute('gltf-model', `#${valueBlackPiece[i-1]}`)
                scene.appendChild(piece)

                eventListener(piece)

                refershGameStatus(row, valueBlackPiece[i-1].slice(0, -5), valueBlackPiece[i-1].slice(-5))
            } else {
                let piece = document.createElement('a-entity');
                piece.setAttribute("position", `${tabuleiro} -1 ${y}`)
                piece.setAttribute("id", `${row}`)
                piece.setAttribute("class", `${valueBlackPiece[valueBlackPiece.length-1]}`)
                piece.setAttribute('gltf-model', `#${valueBlackPiece[valueBlackPiece.length-1]}`)
                scene.appendChild(piece)

                eventListener(piece)

                refershGameStatus(row, valueBlackPiece[valueBlackPiece.length-1].slice(0, -5), valueBlackPiece[i-1].slice(-5))
            }
        } else {
            if(piecePeao == false){
                let piece = document.createElement('a-entity');
                piece.setAttribute("position", `${tabuleiro} -1 ${y - 1}`)
                piece.setAttribute("id", `${row}`)
                piece.setAttribute("class", `${valueBrancoPiece[i-1]}`)
                piece.setAttribute('gltf-model', `#${valueBrancoPiece[i-1]}`)
                scene.appendChild(piece)

                eventListener(piece)

                refershGameStatus(row, valueBrancoPiece[i-1].slice(0, -6), valueBrancoPiece[i-1].slice(-6))
            } else {
                let piece = document.createElement('a-entity');
                piece.setAttribute("position", `${tabuleiro} -1 ${y}`)
                piece.setAttribute("id", `${row}`)
                piece.setAttribute("class", `${valueBrancoPiece[valueBrancoPiece.length-1]}`)
                piece.setAttribute('gltf-model', `#${valueBrancoPiece[valueBrancoPiece.length-1]}`)
                scene.appendChild(piece)

                eventListener(piece) 

                refershGameStatus(row, valueBlackPiece[valueBlackPiece.length-1].slice(0, -5), valueBrancoPiece[i-1].slice(-6))
            }
        }
    }
    function oneLineCreator (y, bollean, row, lastI) {
        let colorPiece = false
        let tabuleiro = 15
        let scene = document.querySelector('a-scene')
    
        for(let i = 1; i <= 8; i++){
            let cordenada = `${row}${i}`
            let box = document.createElement('a-box');
            box.setAttribute("color", "black");
            box.setAttribute("position", `${tabuleiro} -1 ${y}`)
            box.setAttribute("scale", `5 2 5`)
            box.setAttribute("class", cordenada)
            if(bollean === true){
                if(i % 2 === 0) {
                    box.setAttribute("color", "white")
                } else {
                    box.setAttribute("color", "black")
                }
            } else {
                if(i % 2 === 0) {
                    box.setAttribute("color", "black")
                } else {
                    box.setAttribute("color", "white")
                }
            }
    
            if(lastI <= 1 || lastI >= 6){
                let piecePeao = false
    
                if(lastI == 1 || lastI == 6){
                    piecePeao = true
                }
    
                if(lastI >= 6){
                    colorPiece = true
                }
                pieceCreator(i, tabuleiro, y, cordenada, colorPiece, piecePeao)
            }
            
            box.addEventListener("click", (evt) => {
                movePiece(evt.target)
            })
            scene.appendChild(box);
            tabuleiro -= 5
        }
    }
    
    function sceneCreator () {
        let y = 0
        let array = ["a", "b", "c", "d", "e", "f", "g", "h"]
        for(let i = 0; i < 8 ; i++){
            let bollean = false;
    
            if(i % 2 === 0) {
                bollean = true;
            }
    
            oneLineCreator(y, bollean, array[i], i);
            y += 5
        }
        
    }
    
    sceneCreator()
}



gameConstrutor()