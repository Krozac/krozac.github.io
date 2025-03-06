export class MovementSystem {
    update(entityManager, canvasWidth, canvasHeight) {
        const entities = entityManager.getEntities();
        entities.forEach((components, entityId) => {
            const position = components.get('Position');
            const velocity = components.get('Velocity');
            if (position && velocity) {
                position.x += velocity.x;
                position.y += velocity.y;
            }
        });
    }
}
