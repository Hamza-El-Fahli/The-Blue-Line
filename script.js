let canvas = document.querySelector("canvas");
setupCanvas();



const ctx = canvas.getContext('2d');

function setupCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};


window.addEventListener("resize" , setupCanvas);

const pointer = {
    x : 0.5 * window.innerWidth,
    y : 0.5 * window.innerHeight
};

function updateMousePosition (X,Y){
    pointer.x = X;
    pointer.y = Y;
};

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", e => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});


const  p = {x:0,y:0}
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    p.x = pointer.x ;
    p.y = pointer.y ;
    ctx.beginPath();
    ctx.arc(p.x,p.y,5 , 0 , 2* Math.PI);
    ctx.fill();
    window.requestAnimationFrame(update)
}

update();
