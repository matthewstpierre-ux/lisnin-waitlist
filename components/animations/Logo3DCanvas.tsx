"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

const GREEN = "#1C6E3D";
const GREEN_BRIGHT = "#29a354";

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function LogoMesh() {
  const { scene } = useGLTF("/models/lisnin-logo-3d.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);
  const isDark = useIsDarkTheme();

  const centered = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    return { center, size };
  }, [scene]);

  useEffect(() => {
    const material = new THREE.MeshStandardMaterial({
      color: isDark ? "#ffffff" : "#000000",
      metalness: 0.2,
      roughness: 0.35,
      emissive: new THREE.Color(GREEN_BRIGHT),
      emissiveIntensity: isDark ? 0.9 : 0.7,
    });
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });
  }, [scene, isDark]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    const t = timeRef.current;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.04;
    groupRef.current.position.y = centered.center.y * -1 + Math.sin(t * 0.6) * 0.015;
  });

  return (
    <group ref={groupRef} position={[-centered.center.x, -centered.center.y, -centered.center.z]}>
      <primitive object={scene} />
    </group>
  );
}

function FitCamera({ width }: { width: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    const zoom = size.width / width;
    cam.zoom = zoom;
    cam.updateProjectionMatrix();
  }, [camera, size, width]);
  return null;
}

export default function Logo3DCanvas({ pixelWidth, pixelHeight }: { pixelWidth: number; pixelHeight: number }) {
  return (
    <div style={{ width: pixelWidth, height: pixelHeight }}>
      <Canvas
        orthographic
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], zoom: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[-2, 1.5, 3]} intensity={3} color={GREEN_BRIGHT} />
        <pointLight position={[2, -1, 3]} intensity={1.2} color={GREEN} />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" />
        <FitCamera width={4.4} />
        <Suspense fallback={null}>
          <LogoMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/lisnin-logo-3d.glb");
