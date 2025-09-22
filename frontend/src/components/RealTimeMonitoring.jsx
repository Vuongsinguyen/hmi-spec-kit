import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './RealTimeMonitoring.css';

const RealTimeMonitoring = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    console.log('RealTimeMonitoring component mounted - initializing 3D scene');
    if (!mountRef.current) {
      console.error('mountRef.current is null');
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5); // Center the camera
    camera.lookAt(0, 0, 0); // Look at center
    cameraRef.current = camera;

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);
    console.log('Renderer setup complete, canvas size:', width, 'x', height);

    // OrbitControls setup for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false; // Disable pan for better UX
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(0, 0, 0); // Set target to center
    controls.update(); // Apply target change
    controlsRef.current = controls;

    // Create wireframe box (3D Machine) - centered
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0); // Center the cube
    scene.add(cube);

    // Add some additional wireframe elements to make it look more like a machine
    const frameGeometry = new THREE.BoxGeometry(2.5, 0.1, 2.5);
    const frameMaterial = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, -1.1, 0); // Center and position below cube
    scene.add(frame);

    // Add axes helper to visualize center
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    console.log('3D objects created and positioned at center:', {
      cube: cube.position,
      frame: frame.position,
      camera: camera.position
    });

    // Animation loop - using setInterval for testing
    console.log('Starting animation loop...');
    const animate = () => {
      // Update controls for smooth interaction
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Continuous auto rotation - increased speed for visibility
      if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
      if (frame) {
        frame.rotation.y += 0.005;
      }

      // Debug logging every second
      const now = Date.now();
      if (!animate.lastLog || now - animate.lastLog > 1000) {
        console.log('3D Animation running - Cube rotation:', cube ? cube.rotation.x.toFixed(3) : 'N/A');
        animate.lastLog = now;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    // Use setInterval instead of requestAnimationFrame for testing
    animationIdRef.current = setInterval(animate, 16); // ~60fps

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      console.log('Window resized, new canvas size:', width, 'x', height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      console.log('Cleaning up 3D scene...');
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        clearInterval(animationIdRef.current); // Changed from cancelAnimationFrame
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="real-time-monitoring">
      <div className="monitoring-content">
        <div className="machine-view" ref={mountRef}>
          {/* 3D Machine will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;