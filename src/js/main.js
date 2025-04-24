import * as THREE from 'three';
import { AsciiEffect } from './AsciiEffect.js';

// Define global variables
let container, camera, scene, renderer, effect;
let sphere, ring, light1;
let start = Date.now();

// Mouse position
const mouse = { x: 0, y: 0 };

// Initialize the scene
init();
animate();
function init() {
  const width = window.innerWidth || 2;
  const height = window.innerHeight || 2;
  container = document.getElementById("Background");

  const aspect = width / height ;
  const frustumSize = 1000;
  camera = new THREE.OrthographicCamera(
    (-frustumSize * aspect) / 2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    -frustumSize / 2,
    1,
    8000
  );

  camera.position.z = 2000;
  camera.position.x = width / 3;
  scene = new THREE.Scene();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.position.set(2000, 2000, 2000);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 5000;
  scene.add(directionalLight);

  light1 = new THREE.SpotLight(0xffffff, .8);
  light1.position.set(1000, 1000, 1500);
  light1.castShadow = true;
  light1.angle = Math.PI / 6;
  light1.penumbra = 0;
  scene.add(light1);

  // Objects
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(500, 20, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  sphere.castShadow = true;
  //scene.add(sphere);

  const ringGeometry = new THREE.RingGeometry(800, 600, 32);
  const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.3;
  ring.position.z = sphere.position.z;
  ring.rotation.y = Math.PI / 8;
  scene.add(ring);

  // Renderer setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xf0f0f0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // ASCII Effect setup
  effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: false });
  effect.setSize(width, height);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';
  container.appendChild(effect.domElement);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
}

function onWindowResize() {
  // Calculate new aspect ratio
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 1000; // Same frustum size as in `init`

  // Update orthographic camera properties
  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  // Update camera's X position to keep the sphere on the left side of the screen
  camera.position.x = window.innerWidth / 3;

  // Update camera and renderer settings
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  // Normalize mouse coordinates to range [-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  // Request animation frame and render scene
  requestAnimationFrame(animate);
  render();
}

function render() {
  // Calculate time-based variables for sphere animation
  const timer = Date.now() - start;

  // Rotate the sphere
  sphere.rotation.x = timer * 0.0003;
  sphere.rotation.z = timer * 0.0002;

  // Continuous rotation for the ring
  ring.rotation.y = Math.PI / 8 + Math.sin(timer * 0.0004) * 0.1;
  ring.rotation.z = timer * 0.01;

  // Update light1 position based on mouse movement

  // Render the scene with ASCII effect
  effect.render(scene, camera);
}
