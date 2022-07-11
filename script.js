var c = document.getElementById('myCanvas');
		var ctx = c.getContext('2d');
		var box = 32;
		let dir = "right";
		let score = 0;
		var Restart = document.getElementById('Restart');

		//setting the locations of each images
		let image = new Image();
		image.src = "Images/ground.jpg";
		let food = new Image();
		food.src = "Images/food.png";
		let gameover = new Image();
		gameover.src = "Images/gameover.png";

		//setting audio locations
		let up = new Audio();
		up.src = "audio/up.mp3";
		let down = new Audio();
		down.src = "audio/down.mp3";
		let left = new Audio();
		left.src = "audio/left.mp3";
		let right = new Audio();
		right.src = "audio/right.mp3";
		let eat = new Audio();
		eat.src = "audio/eat.mp3";
		let dead = new Audio();
		dead.src = "audio/dead.mp3";

		//creating snake
	
		snake =[
		{x: 8*box, y: 7*box}
		];

		//generating random food location at beginning
		let apple ={
				x: Math.floor(Math.random()*17+1)*box,
				y: Math.floor(Math.random()*15+3)*box 
			}

		//adding event controls of the snake

		document.addEventListener("keydown",function(e){
			if(e.keyCode == 37 && dir!="right"){
				dir = "left";
				left.play();
			}
			if(e.keyCode == 38 && dir!="down"){
				dir = "up";
				up.play();
			}
			if(e.keyCode == 39 && dir!="left"){
				dir = "right";
				right.play();
			}
			if(e.keyCode == 40 && dir!="up"){
				dir = "down";
				down.play();
			}
		});

		//coloring of the body parts of the snake
		function draw(){
			for(let i=0;i<snake.length;i++){
				ctx.fillStyle = (i==0)? "black": "orange";
				if(i%2==0){
					ctx.fillStyle ="black";
				}
				ctx.fillRect(snake[i].x,snake[i].y,box,box);
				ctx.strokeRect(snake[i].x,snake[i].y,box,box);
			}

			//storing the value of old position of snake
			snakeX = snake[0].x;
			snakeY = snake[0].y;

			if(dir == "left"){
				snakeX-=box;
			}
			else if(dir == "right"){
				snakeX+=box;
			}
			else if(dir == "up"){
				snakeY-=box;
			}
			else if(dir == "down"){
				snakeY+=box;
			}
			
			
			if(snakeX==apple.x && snakeY==apple.y){
				eat.play();
				score++;	
				apple ={x: Math.floor(Math.random()*17+1)*box, y: Math.floor(Math.random()*15+3)*box};
				if(score>localStorage.getItem("highScore")){
					localStorage.setItem("highScore",score);
				}

			}
			else{
				snake.pop();
			}
			
			newHead = {x:snakeX, y:snakeY};	
			snake.unshift(newHead);

			// checking collision to it's body
			function collision(head,array){
				for(let i=1;i<array.length;i++){
						if(head.x==array[i].x && head.y==array[i].y){
							return true;
						}
				}
				return false;
			}
			function dragon(){
				let dragon1 = document.getElementById('dragon1');
				let dragon2 = document.getElementById('dragon2');
				dragon1.style.display = "block";
				dragon2.style.display = "block";
			}

			if(snakeX<box || snakeY<3*box || snakeX>17*box || snakeY>17*box || collision(newHead,snake)){
				clearInterval(game);
				dragon();
				dead.play();
				ctx.drawImage(gameover,0,0,561,371,c.width/2-100,c.height/2-40,200,200);
				Restart.style.display ="block";	
				isGameover = true;
			}
				
			ctx.drawImage(food,apple.x,apple.y,box,box);		
		}

		function loop(){
			ctx.drawImage(image,0,0,640,640,0,0,640,640);
			ctx.fillStyle = "white";
			ctx.font = "35px impact";
			ctx.fillText(score,2.1*box,1.6*box);
			ctx.fillStyle = "yellow";
			ctx.font = "25px sans-serif";
			ctx.fillText("High Score : ",13*box,1.6*box);
			ctx.fillText(localStorage.getItem("highScore"),17.5*box,1.6*box);
			draw();
		}
		let game = setInterval(loop,100);
		Restart.addEventListener("click",(e)=>{
				snake = [];
				score = 0;
				dir = "right";
				snake[0] ={x: 8*box, y:7*box};
				clearInterval(game);
				game = setInterval(loop,100);
				let dragon1 = document.getElementById('dragon1');
				let dragon2 = document.getElementById('dragon2');
				dragon1.style.display = "none";
				dragon2.style.display = "none";
				Restart.style.display = "none";
			});
