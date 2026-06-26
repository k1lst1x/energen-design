import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Bot } from 'lucide-react';
import robotModelUrl from '../../assets/robot-toy-3d-model.glb?url';

const FRONT_YAW = -1.2;
const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export const HeroRobotModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.08, 6.8);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.domElement.className = 'home-robot-canvas';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xdceee7, 2.65);
    scene.add(ambient);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.35);
    frontLight.position.set(0, 1.6, 5);
    scene.add(frontLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf3, 1.45);
    keyLight.position.set(-3, 4.5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb8efd7, 1.7);
    fillLight.position.set(4, 2.5, 3);
    scene.add(fillLight);

    const lowerFill = new THREE.DirectionalLight(0xe9fff6, 0.75);
    lowerFill.position.set(0, -2, 3);
    scene.add(lowerFill);

    const rimLight = new THREE.DirectionalLight(0xa7d8ff, 0.45);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let robot: THREE.Group | null = null;
    let baseY = 0;
    let baseScale = 1;
    let loadedAt = 0;
    let rafId = 0;
    let disposed = false;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 560 ? 34 : 30;
      camera.position.z = width < 560 ? 7.05 : 6.8;
      camera.updateProjectionMatrix();
    };

    const fitRobotToScene = (model: THREE.Group) => {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;

      model.position.sub(center);
      baseScale = (window.innerWidth < 560 ? 3.55 : 3.35) / maxAxis;
      model.scale.setScalar(baseScale);

      const fittedBox = new THREE.Box3().setFromObject(model);
      const fittedSize = fittedBox.getSize(new THREE.Vector3());
      baseY = fittedSize.y > fittedSize.x ? 0.08 : 0.04;
      model.position.y = baseY;
      model.rotation.set(0.03, FRONT_YAW, 0);
    };

    loader.load(
      robotModelUrl,
      gltf => {
        if (disposed) return;

        robot = gltf.scene;
        loadedAt = clock.getElapsedTime();
        robot.traverse(child => {
          if (!(child instanceof THREE.Mesh)) return;

          child.castShadow = false;
          child.receiveShadow = false;

          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(material => {
            if ('roughness' in material) material.roughness = Math.min(Math.max(material.roughness ?? 0.58, 0.56), 0.82);
            if ('metalness' in material) material.metalness = Math.min(material.metalness ?? 0, 0.12);
            material.needsUpdate = true;
          });
        });

        fitRobotToScene(robot);
        scene.add(robot);
      },
      undefined,
      () => {
        if (!disposed) setWebglUnavailable(true);
      },
    );

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (robot) {
        const sinceLoaded = elapsed - loadedAt;
        const entrance = Math.min(sinceLoaded / 1.2, 1);
        const entranceEase = 1 - Math.pow(1 - entrance, 3);
        const greetingProgress = clamp01((sinceLoaded - 0.65) / 2.8);
        const greetingEnvelope = greetingProgress > 0 && greetingProgress < 1
          ? Math.sin(greetingProgress * Math.PI)
          : 0;
        const greetingTurn = greetingEnvelope * Math.sin(greetingProgress * Math.PI * 2) * 0.16;
        const greetingNod = greetingEnvelope * 0.075;
        const greetingRoll = greetingEnvelope * Math.sin(greetingProgress * Math.PI * 1.5) * 0.035;
        const idleYaw = Math.sin(elapsed * 0.32) * 0.085 + Math.sin(elapsed * 0.67) * 0.025;
        const idlePitch = Math.sin(elapsed * 0.72) * 0.016;
        const idleRoll = Math.sin(elapsed * 0.5) * 0.022;
        const floatY = Math.sin(elapsed * 0.9) * 0.04;
        const softHop = Math.pow(Math.max(0, Math.sin(elapsed * 1.25 + 0.45)), 2) * 0.026;
        const breathe = Math.sin(elapsed * 1.15) * 0.011;

        robot.rotation.x = 0.025 + idlePitch + greetingNod;
        robot.rotation.y = THREE.MathUtils.lerp(-0.55, FRONT_YAW + idleYaw + greetingTurn, entranceEase);
        robot.rotation.z = idleRoll + greetingRoll;
        robot.position.x = Math.sin(elapsed * 0.38) * 0.024;
        robot.position.y = baseY + floatY + softHop + greetingEnvelope * 0.018;
        robot.scale.setScalar(baseScale * (1 + breathe + softHop * 0.08 + greetingEnvelope * 0.006));
      }

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);

      scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => material.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className={`home-robot-stage${webglUnavailable ? ' home-robot-fallback-stage' : ''}`} aria-hidden="true">
      {webglUnavailable && (
        <div className="home-robot-fallback">
          <Bot size="42%" strokeWidth={1.45} />
        </div>
      )}
    </div>
  );
};
