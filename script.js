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

const params = {
    spring : .4,
    pointsNumber : 30,
    friction : 0.5,
}
const trail = new Array (params.pointsNumber);
for (let i=0 ; i < params.pointsNumber ; i++){
    trail[i] = {
        x : pointer.x,
        y : pointer.y,
        dx : 0,
        dy : 0,
    }
};



function update(t){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

            
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy ;

        // ctx.beginPath();
        // ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        // ctx.fill();

        if(pIdx == 0){
            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
        } else {
            ctx.lineTo(p.x,p.y);
        }

    });
    ctx.stroke();
    window.requestAnimationFrame(update);
}










update(0);


