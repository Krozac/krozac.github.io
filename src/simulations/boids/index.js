import { startSimulation, addTracingToggle } from './simulation.js';
import { boidParams } from './boid.js';
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
if (ctx) {
    startSimulation(ctx);
    addTracingToggle(); // Ajouter le bouton de contrôle
}
else {
    console.error('Failed to get canvas context.');
}
const controlsContainer = document.createElement('div');
controlsContainer.style.position = 'absolute';
controlsContainer.style.top = '10px';
controlsContainer.style.left = '10px';
controlsContainer.style.backgroundColor = 'white';
controlsContainer.style.padding = '10px';
controlsContainer.style.border = '1px solid black';
controlsContainer.style.zIndex = '10';
function createSlider(label, min, max, step, value, onChange) {
    const container = document.createElement('div');
    const sliderLabel = document.createElement('label');
    const slider = document.createElement('input');
    const valueDisplay = document.createElement('span');
    sliderLabel.textContent = label;
    slider.type = 'range';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = String(value);
    valueDisplay.textContent = `: ${value}`;
    slider.addEventListener('input', () => {
        valueDisplay.textContent = `: ${slider.value}`;
        onChange(Number(slider.value));
    });
    container.appendChild(sliderLabel);
    container.appendChild(slider);
    container.appendChild(valueDisplay);
    return container;
}

controlsContainer.appendChild(createSlider('Separation', 0, 0.1, 0.001, boidParams.separationFactor, (val) => (boidParams.separationFactor = val)));
controlsContainer.appendChild(createSlider('Alignment', 0, 0.1, 0.001, boidParams.alignmentFactor, (val) => (boidParams.alignmentFactor = val)));
controlsContainer.appendChild(createSlider('Centering', 0, 0.001, 0.00001, boidParams.centeringFactor, (val) => (boidParams.centeringFactor = val)));
document.body.appendChild(controlsContainer);
