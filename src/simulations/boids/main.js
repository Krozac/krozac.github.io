import { EntityManager } from './entities/entityManager.js';
import { BoidEntity } from './entities/ent_boid.js';
import { BoidSystem } from './systems/sys_boid.js';
import { MovementSystem } from './systems/sys_movement.js';
import { DrawSystem } from './systems/sys_draw.js';
let entityManager;
let boidSystem;
let movementSystem;
let drawSystem;
let canvaswidth;
let canvasheight;
function init(context, num) {
    canvaswidth = context.canvas.width;
    canvasheight = context.canvas.height
    entityManager = new EntityManager();
    boidSystem = new BoidSystem(entityManager,canvaswidth,canvasheight);
    movementSystem = new MovementSystem();
    drawSystem = new DrawSystem(context);;
    for (let i = 0; i < num; i++) {
        const boidEntity = new BoidEntity(entityManager, Math.random() * canvaswidth, Math.random() * canvasheight);
    }
}
let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;
let delta = 0;

function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    delta += timestamp - lastTime;
    lastTime = timestamp;


    while (delta >= interval) {
        boidSystem.update();
        movementSystem.update(entityManager, canvaswidth, canvasheight);
        delta -= interval;
    }

    drawSystem.update(entityManager);
    requestAnimationFrame(gameLoop);
}
export { init, gameLoop };
