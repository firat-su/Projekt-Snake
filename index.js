    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let rows = 20;
    let cols = 20;
    let snake = [{ x: 19, y: 3 }];
    let food = {x: 5,y: 5,};
    let cellwidth = canvas.width / cols;
    let cellheight = canvas.height / rows;
    let direction = "left";
    let foodCollected = false;


    
      setInterval(gameloop, 100);
      document.addEventListener("keydown", keyDown);

      placeFood();
      draw();

      function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        snake.forEach((part) => add(part.x, part.y));

        ctx.fillStyle = "red";
        add(food.x, food.y);

        requestAnimationFrame(draw);
      }

      function placeFood() {
        let randomx = Math.floor(Math.random() * cols);
        let randomy = Math.floor(Math.random() * rows);

        food = {x: randomx, y: randomy}
      }

      function add(x, y) {
        ctx.fillRect(
          x * cellwidth,
          y * cellheight,
          cellwidth - 1,
          cellheight - 1
        );
      }

      function shiftSnake() {
          for (let i = snake.length - 1; i > 0; i--) {
            const part = snake[i];
            const lastPart = snake[i - 1]
            part.x = lastPart.x;
            part.y = lastPart.y;
          }
      }

      function gameloop() {
        shiftSnake();

        if(foodCollected){
          snake = [{x: snake[0].x, y: snake[0].y}, ...snake];
          foodCollected = false;
        }

        

        if (direction == "LEFT") {
          snake[0].x--;
        }
        if (direction == "RIGHT") {
          snake[0].x++;
        }
        if (direction == "UP") {
          snake[0].y--;
        }
        if (direction == "DOWN") {
          snake[0].y++;
        }

        if(snake[0].x == food.x && snake[0].y == food.y) {
          foodCollected = true;
          placeFood();
        }

      }

      function keyDown(e) {
        if (e.keyCode == 37) {
          direction = "LEFT";
        }
        if (e.keyCode == 38) {
          direction = "UP";
        }
        if (e.keyCode == 39) {
          direction = "RIGHT";
        }
        if (e.keyCode == 40) {
          direction = "DOWN";
        }
      }