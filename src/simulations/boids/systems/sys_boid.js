export class BoidSystem {
    constructor(entityManager,canvaswidth,canvasheight) {
        this.entityManager = entityManager;
        this.boidParams = {
            separationFactor: 0.05,
            alignmentFactor: 0.05,
            centeringFactor: 0.0005,
        };
        this.canvaswidth = canvaswidth;
        this.canvasheight = canvasheight;
    }
    update() {
        const entities = this.entityManager.getEntities();
        entities.forEach((components, entityId) => {
            const boid = components.get('Boid');
            const position = components.get('Position');
            const velocity = components.get('Velocity');
            const acceleration = components.get('Acceleration');
            if (boid && position && velocity && acceleration) {
                this.applyupdate(entityId, position, velocity, boid, acceleration);
                this.applySeparation(entityId, position, velocity, boid);
                this.applyAlignment(entityId, position, velocity, boid);
                this.applyCentering(entityId, position, velocity, boid);
            }
        });
    }
    applyupdate(entityId, position, velocity, boid, acceleration) {
        //console.log(velocity)
        velocity.x += acceleration.x;
        velocity.y += acceleration.y;
        const speed = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
        if (speed > boid.maxSpeed) {
            velocity.x = (velocity.x / speed) * boid.maxSpeed;
            velocity.y = (velocity.y / speed) * boid.maxSpeed;
        }
        else if (speed < boid.minSpeed && speed !== 0) {
            velocity.x = (velocity.x / speed) * boid.minSpeed;
            velocity.y = (velocity.y / speed) * boid.minSpeed;
        }
        else if (speed === 0) {
            velocity.x = boid.minSpeed;
            velocity.y = boid.minSpeed;
        }

        if (position.x <  this.canvaswidth)
            velocity.x += boid.turnFactor;
        if (position.x > 0)
            velocity.x -= boid.turnFactor;
        if (position.y < this.canvasheight)
            velocity.y += boid.turnFactor;
        if (position.y > 0)
            velocity.y -= boid.turnFactor;
        acceleration.x = 0;
        acceleration.y = 0;
    }
    applySeparation(entityId, position, velocity, boid) {
        const entities = this.entityManager.getEntities();
        let close = { dx: 0, dy: 0 };
        entities.forEach((otherComponents, otherEntityId) => {
            if (entityId !== otherEntityId) {
                const otherPosition = otherComponents.get('Position');
                const otherBoid = otherComponents.get('Boid');
                if (otherPosition && otherBoid) {
                    const distance = Math.sqrt(Math.pow((position.x - otherPosition.x), 2) + Math.pow((position.y - otherPosition.y), 2));
                    if (distance < boid.protectedRange && distance > 0) {
                        close.dx += position.x - otherPosition.x;
                        close.dy += position.y - otherPosition.y;
                    }
                }
            }
        });
        velocity.x += close.dx * this.boidParams.separationFactor;
        velocity.y += close.dy * this.boidParams.separationFactor;
    }
    applyAlignment(entityId, position, velocity, boid) {
        let xvel_avg = 0;
        let yvel_avg = 0;
        let neighboring_boids = 0;
        const entities = this.entityManager.getEntities();
        entities.forEach((otherComponents, otherEntityId) => {
            if (entityId !== otherEntityId) {
                const otherPosition = otherComponents.get('Position');
                const otherBoid = otherComponents.get('Boid');
                const otherVelocity = otherComponents.get('Velocity');
                if (otherPosition && otherBoid && otherVelocity) {
                    const distance = Math.sqrt(Math.pow((position.x - otherPosition.x), 2) + Math.pow((position.y - otherPosition.y), 2));
                    if (distance < boid.visualRange && distance > 0) {
                        xvel_avg += otherVelocity.x;
                        yvel_avg += otherVelocity.y;
                        neighboring_boids++;
                    }
                }
            }
        });
        if (neighboring_boids > 0) {
            xvel_avg /= neighboring_boids;
            yvel_avg /= neighboring_boids;
        }
        velocity.x += (xvel_avg - velocity.x) * this.boidParams.alignmentFactor;
        velocity.y += (yvel_avg - velocity.y) * this.boidParams.alignmentFactor;
    }
    applyCentering(entityId, position, velocity, boid) {
        let xpos_avg = 0;
        let ypos_avg = 0;
        let neighboring_boids = 0;
        const entities = this.entityManager.getEntities();
        entities.forEach((otherComponents, otherEntityId) => {
            if (entityId !== otherEntityId) {
                const otherPosition = otherComponents.get('Position');
                const otherBoid = otherComponents.get('Boid');
                if (otherPosition && otherBoid) {
                    const distance = Math.sqrt(Math.pow((position.x - otherPosition.x), 2) + Math.pow((position.y - otherPosition.y), 2));
                    if (distance < boid.visualRange && distance > 0) {
                        xpos_avg += otherPosition.x;
                        ypos_avg += otherPosition.y;
                        neighboring_boids++;
                    }
                }
            }
        });
        if (neighboring_boids > 0) {
            xpos_avg /= neighboring_boids;
            ypos_avg /= neighboring_boids;
        }
        velocity.x += (xpos_avg - position.x) * this.boidParams.centeringFactor;
        velocity.y += (ypos_avg - position.y) * this.boidParams.centeringFactor;
    }
}
