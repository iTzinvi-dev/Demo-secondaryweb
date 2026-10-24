import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ThreeBirthdayCakeProps {
  onAllBlown?: () => void;
}

interface CandleInstance {
  group: THREE.Group;
  flameMesh: THREE.Mesh;
  light: THREE.PointLight;
  isLit: boolean;
  baseScale: number;
}

export const ThreeBirthdayCake: React.FC<ThreeBirthdayCakeProps> = ({ onAllBlown }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [candlesLitCount, setCandlesLitCount] = useState(16);
  const [isPermanentlyBlown, setIsPermanentlyBlown] = useState(false);

  const candlesRef = useRef<CandleInstance[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const onAllBlownRef = useRef(onAllBlown);
  onAllBlownRef.current = onAllBlown;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.2);
    camera.lookAt(0, 0.9, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    dirLight.position.set(4, 8, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xebe4ff, 0.6);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Cake Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Materials
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3ede2,
      roughness: 0.3,
      metalness: 0.1,
    });

    const bottomIcingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.45,
    });

    const topIcingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf4ea,
      roughness: 0.4,
    });

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8dfd1,
      roughness: 0.5,
    });

    const candleWaxMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6ede3,
      roughness: 0.3,
    });

    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa22,
    });

    // Plate
    const plateGeo = new THREE.CylinderGeometry(2.5, 2.2, 0.12, 48);
    const plateMesh = new THREE.Mesh(plateGeo, plateMaterial);
    plateMesh.position.y = 0.06;
    plateMesh.receiveShadow = true;
    cakeGroup.add(plateMesh);

    // Bottom tier
    const bottomGeo = new THREE.CylinderGeometry(1.9, 1.9, 1.1, 48);
    const bottomMesh = new THREE.Mesh(bottomGeo, bottomIcingMaterial);
    bottomMesh.position.y = 0.67;
    bottomMesh.castShadow = true;
    bottomMesh.receiveShadow = true;
    cakeGroup.add(bottomMesh);

    // Trim ring on bottom tier
    const trimGeo = new THREE.TorusGeometry(1.92, 0.05, 16, 48);
    const trimMesh = new THREE.Mesh(trimGeo, trimMaterial);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = 1.2;
    cakeGroup.add(trimMesh);

    // Top tier
    const topGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.9, 48);
    const topMesh = new THREE.Mesh(topGeo, topIcingMaterial);
    topMesh.position.y = 1.67;
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    cakeGroup.add(topMesh);

    // Top trim ring
    const topTrimGeo = new THREE.TorusGeometry(1.32, 0.04, 16, 48);
    const topTrimMesh = new THREE.Mesh(topTrimGeo, trimMaterial);
    topTrimMesh.rotation.x = Math.PI / 2;
    topTrimMesh.position.y = 2.12;
    cakeGroup.add(topTrimMesh);

    // Center 16 cake plaque
    const plaqueGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 32);
    const plaqueMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.4,
      metalness: 0.2,
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMaterial);
    plaqueMesh.position.y = 2.15;
    cakeGroup.add(plaqueMesh);

    // 16 Candles
    const candles: CandleInstance[] = [];
    const candleCount = 16;
    const radius = 0.98;

    for (let i = 0; i < candleCount; i++) {
      const angle = (i / candleCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const candleGroup = new THREE.Group();
      candleGroup.position.set(x, 2.12, z);

      // Candle body
      const bodyGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.45, 16);
      const bodyMesh = new THREE.Mesh(bodyGeo, candleWaxMaterial);
      bodyMesh.position.y = 0.225;
      bodyMesh.castShadow = true;
      candleGroup.add(bodyMesh);

      // Wick
      const wickGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.08, 8);
      const wickMesh = new THREE.Mesh(wickGeo, new THREE.MeshBasicMaterial({ color: 0x222222 }));
      wickMesh.position.y = 0.48;
      candleGroup.add(wickMesh);

      // Flame
      const flameGeo = new THREE.SphereGeometry(0.045, 12, 12);
      flameGeo.scale(1, 1.8, 1);
      const flameMesh = new THREE.Mesh(flameGeo, flameMaterial);
      flameMesh.position.y = 0.58;
      candleGroup.add(flameMesh);

      // Point Light
      const pointLight = new THREE.PointLight(0xff9922, 0.55, 1.8);
      pointLight.position.y = 0.62;
      candleGroup.add(pointLight);

      cakeGroup.add(candleGroup);

      candles.push({
        group: candleGroup,
        flameMesh,
        light: pointLight,
        isLit: true,
        baseScale: 1,
      });
    }

    candlesRef.current = candles;

    // Drag to rotate cake
    let isDragging = false;
    let prevMouseX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevMouseX = clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - prevMouseX;
      prevMouseX = clientX;
      cakeGroup.rotation.y += deltaX * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Animation loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle idle spin if not dragging
      if (!isDragging) {
        cakeGroup.rotation.y += 0.0035;
      }

      // Flame flickers
      candlesRef.current.forEach((candle, idx) => {
        if (candle.isLit) {
          const flicker = Math.sin(time * 12 + idx * 2.3) * 0.15 + 1;
          candle.flameMesh.scale.set(flicker, flicker * 1.1, flicker);
          candle.light.intensity = 0.45 * flicker;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);
      renderer.dispose();
    };
  }, []);

  const triggerBlowOutCandle = (index: number) => {
    const candle = candlesRef.current[index];
    if (candle && candle.isLit) {
      candle.isLit = false;
      candle.flameMesh.visible = false;
      candle.light.intensity = 0;
      soundEngine.playCandleExtinguish(index);

      // Count lit candles
      const remaining = candlesRef.current.filter((c) => c.isLit).length;
      setCandlesLitCount(remaining);

      if (remaining === 0) {
        handleAllBlownPermanently();
      }
    }
  };

  const handleAllBlownPermanently = () => {
    setIsPermanentlyBlown(true);
    soundEngine.playCelebrationChord();

    if (onAllBlownRef.current) {
      onAllBlownRef.current();
    }
  };

  const blowAllAtOnce = () => {
    if (isPermanentlyBlown) return;
    candlesRef.current.forEach((candle, idx) => {
      if (candle.isLit) {
        setTimeout(() => {
          triggerBlowOutCandle(idx);
        }, idx * 60);
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="relative h-[380px] w-full max-w-[540px] cursor-grab active:cursor-grabbing"
      />

      {/* Helper status */}
      <p className="mt-1 text-center font-serif text-sm italic text-[#78716C]">
        {!isPermanentlyBlown
          ? 'Cake ta ghuriye dekho, ar niche click kore 16 ti candle nibhiye dao'
          : '16 ti candle nibhe geche! Tomar wish ta shobshomoy er jonno shotti hok!'}
      </p>

      {/* Just 1 Single Action Button: Strictly 1-time blow out, No Reverse */}
      <div className="mt-5 flex items-center justify-center">
        {!isPermanentlyBlown ? (
          <button
            type="button"
            onClick={blowAllAtOnce}
            className="inline-flex items-center gap-2 rounded-full border border-[#201D1B]/20 bg-white px-6 py-2.5 text-xs font-medium text-[#201D1B] shadow-xs transition-all hover:bg-[#F3EFE6] hover:shadow-sm active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
            <span>Click kore 16 ti candle nibhao</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-[#201D1B]/15 bg-[#FAF8F5] px-5 py-2 text-xs font-medium text-[#201D1B]">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Candle gulo nibhe geche · Wish shotti hok</span>
          </div>
        )}
      </div>
    </div>
  );
};
