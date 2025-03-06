import { BoidComponent } from "../components/cmp_boid.js";
import { PositionComponent } from "../components/cmp_position.js";
import { VelocityComponent } from "../components/cmp_velocity.js";
import { AccelerationComponent } from "../components/cmp_acceleration.js";
import { DrawComponent } from "../components/cmp_draw.js";
export class BoidEntity {
    constructor(entityManager, x, y) {
        this.entityId = entityManager.createEntity();
        entityManager.addComponent(this.entityId, 'Boid', BoidComponent());
        entityManager.addComponent(this.entityId, 'Position', PositionComponent(x, y));
        entityManager.addComponent(this.entityId, 'Velocity', VelocityComponent());
        entityManager.addComponent(this.entityId, 'Acceleration', AccelerationComponent());
        entityManager.addComponent(this.entityId, 'Draw', DrawComponent('white', 5, 'triangle'));
    }
}
