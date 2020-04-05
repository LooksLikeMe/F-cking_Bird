let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bird = new Image();
let background = new Image();
let foreground = new Image();
let pipeUp = new Image();
let pipeBot = new Image();

bird.src = 'flappy_bird_bird.png';
background.src = 'flappy_bird_bg.png';
foreground.src = 'flappy_bird_fg.png';
pipeUp.src = 'flappy_bird_pipeUp.png';
pipeBot.src = 'flappy_bird_pipeBottom.png';

//Audio files

let fly = new Audio();
let score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';

let gap = 90;
//Mouse event
document.addEventListener('click', () => {
    yPos -= 25;
    fly.play();
});
//Create a blocks
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0,
}

let score = 0;

//bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;


const draw = () => {
    ctx.drawImage(background, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBot, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - foreground.height) {
            location.reload();
        }
        if (pipe[i].x == 5) {
            score_audio.play();
            score++;
            
        }
    }

    ctx.drawImage(foreground, 0, canvas.height - foreground.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    //score points 
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText(`Score : ${score}`, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}
pipeBot.onload = draw; 