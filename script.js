let canvas = document.querySelector("canvas");
setupCanvas();

const ctx = canvas.getContext('2d');

function setupCanvas(){
    canvas.width = window.innerWidth*60/100;
    canvas.height = 800;
}

window.addEventListener("resize" , setupCanvas);

const pointer = {
    x : 0.5 * window.innerWidth,
    y : 0.5 * window.innerHeight
};

function updateMousePosition(X,Y){
    pointer.x = X - canvas.getBoundingClientRect().left;
    pointer.y = Y - canvas.getBoundingClientRect().top;
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", e => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

const  p = {x:0,y:0};

const params = {
    spring : .4,
    pointsNumber : 30,
    friction : 0.5,
    baseWidth : 0.9
};

const trail = new Array (params.pointsNumber);
for (let i=0; i < params.pointsNumber; i++){
    trail[i] = {
        x : pointer.x,
        y : pointer.y,
        dx : 0,
        dy : 0
    };
}

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

        if(pIdx == 0){
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
        }
    });

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.baseWidth * (params.pointsNumber - i);
        ctx.strokeStyle = `rgba(0, 0, 255, ${i/(trail.length - 1)})`; // Blue color with varying alpha

        // Add shadow effect
        ctx.shadowColor = `rgba(0, 0, 255, ${i/(trail.length - 1)})`; // Shadow color
        ctx.shadowBlur = 10; // Blur radius

        ctx.stroke();

        // Reset shadow properties
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }

    window.requestAnimationFrame(update);
}

// Initial call to start the animation
update(0);
