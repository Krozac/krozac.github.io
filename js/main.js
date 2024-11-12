// Import Three.js core and necessary modules
import * as THREE from 'three';
import { AsciiEffect } from 'AsciiEffect';
// Define global variables
let container, camera, scene, renderer, effect;
let sphere, plane,light1;
let start = Date.now();

// Initialize the scene
init();
animate();

function init() {
  // Set up scene dimensions
  const width = window.innerWidth || 2;
  const height = window.innerHeight || 2;

  // Create a container element for the scene
  container = document.getElementById("Background");

  // Set up the camera
  const aspect = width / height;
  const frustumSize = 1000; // Adjust as needed for zoom level
  camera = new THREE.OrthographicCamera(
    (-frustumSize * aspect) / 2, // left
    (frustumSize * aspect) / 2,  // right
    frustumSize / 2,             // top
    -frustumSize / 2,            // bottom
    1,                           // near
    2000                         // far
  );
    camera.position.z = 2000; 
    camera.position.x = 700; 
  // Set up the scene
  scene = new THREE.Scene();

  // Add lighting to the scene
   light1 = new THREE.PointLight(0xfffff);
  light1.position.set(500, 500, 500);
  scene.add(light1);


  // Create a sphere and add it to the scene
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(500, 20, 10),
    new THREE.MeshLambertMaterial()
  );
  scene.add(sphere);


  // Set up the WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
	  renderer.setClearColor(0xf0f0f0);
  // Set up the ASCII effect
  effect = new AsciiEffect(renderer);
  effect.setSize(width, height);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';
  container.appendChild(effect.domElement);

 
  // Add event listener for window resize
  window.addEventListener('resize', onWindowResize, false);
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

  // Update camera and renderer settings
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // Request animation frame and render scene
  requestAnimationFrame(animate);
  render();
}

function render() {
  // Calculate time-based variables for sphere animation
  const timer = Date.now() - start;

  // Rotate the sphere (keeping your existing rotations)
  sphere.rotation.x = timer * 0.0003;
  sphere.rotation.z = timer * 0.0002;


  // Render the scene with ASCII effect
  effect.render(scene, camera);
}