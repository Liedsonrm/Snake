var canvas = document.getElementById("cobra")
var ctx = canvas.getContext('2d')


function newSnake(){
    var snake = {
        direction: "ArrowUp",
        color : "rgb(91, 0, 165)",
        points: 0,
        time: 150,
        speed: 5,
        position: [{x:1, y:10}],
        anda(){
            switch(this.direction){
                case "ArrowUp":
                    x = this.position[0]['x']
                    y = this.position[0]['y'] - 1
                    this.position.unshift({x, y})
                    this.position.pop()
                    break
                case "ArrowDown":
                    x = this.position[0]['x']
                    y = this.position[0]['y'] + 1
                    this.position.unshift({x, y})
                    this.position.pop()
                    break
                case "ArrowLeft":
                    x = this.position[0]['x'] - 1
                    y = this.position[0]['y'] 
                    this.position.unshift({x, y})
                    this.position.pop()
                    break
                case "ArrowRight":
                    x = this.position[0]['x'] + 1
                    y = this.position[0]['y'] 
                    this.position.unshift({x, y})
                    this.position.pop()
                    break
            }
            
            this.direction
        },
        acelerar(){
            if(this.time == 10) this.speed = 0
            if(this.time == 90) this.speed = 2.5
            this.time = this.time - this.speed
        },
        desenha(){
            for(let i = 0; this.position.length > i; i++){
                ctx.fillStyle = this.color
                ctx.fillRect(this.position[i]['x'], this.position[i]['y'], 1, 1)
            }
        },
        crescer(){
            var last = snake.position[(snake.position.length-1)]
            console.log(last)
            this.position.push(last)
            
    
        },
    }
    
    return snake
}


var apple = {
    position: {x:1,y:2},
    desenha(){
        ctx.fillStyle = "rgb(68, 0, 26)"
        ctx.fillRect(this.position.x, this.position.y ,1 ,1)
    },
    redefinir(){
        this.position.x = Math.floor(Math.random() * canvas.width)
        this.position.y = Math.floor(Math.random() * canvas.height)
    },
}


var telas = {
    INICIO: {
        desenha(){
            ctx.fillStyle = "rgb(91, 0, 165)"
            ctx.font='20px arial';
            ctx.fillText("S", 10, 20)
        }
    },
    GAME: {
        desenha(){            
            snake.desenha()
            snake.anda()
            apple.desenha()
        },
        checagem(){
            for(let i = 1; i < snake.position.length; i++){
                if(snake.position[0]["x"] == snake.position[i]["x"] && snake.position[0]['y'] == snake.position[i]['y']){
                    vocePerdeu()
                }
            }
            if(apple.position.x == snake.position[0].x && apple.position.y == snake.position[0].y){
                apple.redefinir()
                snake.crescer()
                snake.acelerar()
                snake.points = snake.points + 1
                atualizarPlacar()
            }
            if(snake.position[0].x == -1 || snake.position[0].x == canvas.width || snake.position[0].y == -1 || snake.position[0].y == canvas.height){
                setTimeout(() => {vocePerdeu()}, 1000)
            }

            
        }
    }

}

function vocePerdeu(){
    telaAtual = telas.INICIO
    pontua = snake.points
    snake.points = 0
    document.getElementById("Enter").innerHTML =  "USE ENTER PARA INICIAR"
    
    atualizarPlacar()
}


var telaAtual = telas.INICIO

function limpaTela(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function loop(){
    limpaTela()
    if(telaAtual.checagem){
        telaAtual.checagem()
    }
    telaAtual.desenha()
    

    try{
        setTimeout(() => {
            loop()
        }, (snake.time))
        
    }
        
    catch(err){
        setTimeout(() => {
            loop()
        }, (200))
}
}

function atualizarPlacar(){
    document.getElementById('points').innerHTML = snake.points
}

loop()
document.addEventListener('keydown', (e) => {
    switch(e.key){
        case "Enter":
            if(telaAtual == telas.INICIO){
                telaAtual = telas.GAME
                globalThis.snake = newSnake()
                document.getElementById("Enter").innerHTML =  ""
            }
        case "ArrowUp":
            if(snake.direction == "ArrowDown") return
            snake.direction = e.key
            break
        case "ArrowDown":
            if(snake.direction == "ArrowUp") return
            snake.direction = e.key
            break
        case "ArrowLeft":
            if(snake.direction == "ArrowRight") return
            snake.direction = e.key
            break
        case "ArrowRight":
            if(snake.direction == "ArrowLeft") return
            snake.direction = e.key
            break
        }
})