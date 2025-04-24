import { useEffect } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from './AsciiEffect.js'; // Assurez-vous que AsciiEffect est correctement importé

const useAsciiBackground = () => {
  useEffect(() => {
    let container, camera, scene, renderer, effect;
    let sphere, ring;
    let start = Date.now();

    const mouse = { x: 0, y: 0 };

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      container = document.getElementById('Background');

      const aspect = width / height;
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

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(200, 200, 200);
      scene.add(directionalLight);

      // Objects setup
      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(500, 20, 10),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      sphere.castShadow = true;
      scene.add(sphere);

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

      // ASCII Effect setup
      effect = new AsciiEffect(renderer, ' .:-=+*#%@', { 
        invert: false, 
        resolution: 0.18, // Fixed resolution
      });
      effect.setSize(width, height); // set the initial size
      effect.domElement.style.color = 'white';
      effect.domElement.style.backgroundColor = 'black';
      container.appendChild(effect.domElement);

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const aspect = window.innerWidth / window.innerHeight;
      const frustumSize = 1000;

      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.position.x = window.innerWidth / 3;

      camera.updateProjectionMatrix();
      // Set the new size of the effect container based on the screen's aspect ratio
      effect.setSize(width, height);
    };

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      const timer = Date.now() - start;

      sphere.rotation.x = timer * 0.0003;
      sphere.rotation.z = timer * 0.0002;
      ring.rotation.y = Math.PI / 8 + Math.sin(timer * 0.0004) * 0.1;
      ring.rotation.z = timer * 0.01;

      effect.render(scene, camera);
    };

    init();
    animate();

    return () => {
      // Cleanup
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      container.removeChild(effect.domElement);
    };
  }, []);
};

export default useAsciiBackground;
