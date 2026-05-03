"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

// ─── GLB model loader (used when public/models/headphones.glb exists) ──────
function GLBHeadphones({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { scene } = useGLTF("/models/headphones.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  // Override materials: dark body with green emissive accent
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0e1117"),
          roughness: 0.25,
          metalness: 0.9,
          emissive: new THREE.Color("#22C55E"),
          emissiveIntensity: 0.08,
          envMapIntensity: 1.5,
        });
        mesh.material = mat;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(timeRef.current * (Math.PI * 2) / 4) * 0.12;
    groupRef.current.rotation.y = timeRef.current * (Math.PI * 2) / 20;
    const tx = mouse.current[1] * 0.08;
    const tz = mouse.current[0] * 0.08;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (-tz - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[0.55, 0.55, 0.55]}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Fallback primitives (used until a .glb is provided) ────────────────────
function PrimitiveHeadphones({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  const dark = new THREE.MeshStandardMaterial({ color: "#1c1c2e", roughness: 0.5, metalness: 0.6 });
  const cup = new THREE.MeshStandardMaterial({ color: "#141428", roughness: 0.4, metalness: 0.7 });
  const pad = new THREE.MeshStandardMaterial({ color: "#0d0d1a", roughness: 0.9, metalness: 0.0 });
  const green = new THREE.MeshStandardMaterial({ color: "#22C55E", roughness: 0.3, metalness: 0.8, emissive: new THREE.Color("#22C55E"), emissiveIntensity: 0.4 });

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(timeRef.current * (Math.PI * 2) / 4) * 0.15;
    groupRef.current.rotation.y = timeRef.current * (Math.PI * 2) / 20;
    const tx = mouse.current[1] * 0.08;
    const tz = mouse.current[0] * 0.08;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (-tz - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Headband arc */}
      <mesh material={dark}>
        <torusGeometry args={[1.05, 0.065, 16, 60, Math.PI]} />
      </mesh>
      {/* Headband top padding */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]} material={pad}>
        <boxGeometry args={[0.7, 0.1, 0.18]} />
      </mesh>

      {/* Left side */}
      <group position={[-1.05, 0, 0]}>
        <mesh position={[0, 0.42, 0]} material={dark}><cylinderGeometry args={[0.045, 0.045, 0.84, 12]} /></mesh>
        {/* Outer cup */}
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={cup}>
          <cylinderGeometry args={[0.44, 0.40, 0.22, 32]} />
        </mesh>
        {/* Inner pad ring */}
        <mesh position={[0, -0.08, 0.12]} material={pad}>
          <torusGeometry args={[0.33, 0.07, 10, 32]} />
        </mesh>
        {/* Green accent dot */}
        <mesh position={[-0.12, -0.08, 0]} material={green}>
          <circleGeometry args={[0.06, 16]} />
        </mesh>
        {/* Green ring */}
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={green}>
          <torusGeometry args={[0.42, 0.012, 8, 32]} />
        </mesh>
      </group>

      {/* Right side */}
      <group position={[1.05, 0, 0]}>
        <mesh position={[0, 0.42, 0]} material={dark}><cylinderGeometry args={[0.045, 0.045, 0.84, 12]} /></mesh>
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={cup}>
          <cylinderGeometry args={[0.44, 0.40, 0.22, 32]} />
        </mesh>
        <mesh position={[0, -0.08, 0.12]} material={pad}>
          <torusGeometry args={[0.33, 0.07, 10, 32]} />
        </mesh>
        <mesh position={[0.12, -0.08, 0]} material={green}>
          <circleGeometry args={[0.06, 16]} />
        </mesh>
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={green}>
          <torusGeometry args={[0.42, 0.012, 8, 32]} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Scene wrapper ───────────────────────────────────────────────────────────
function Scene({
  mouse,
  useGlb,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  useGlb: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[-3, 3, 3]} intensity={4} color="#22C55E" />
      <pointLight position={[3, 2, 3]} intensity={1.5} color="#22C55E" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#ffffff" />
      <Environment preset="night" />
      {useGlb ? (
        <Suspense fallback={null}>
          <GLBHeadphones mouse={mouse} />
        </Suspense>
      ) : (
        <PrimitiveHeadphones mouse={mouse} />
      )}
    </>
  );
}

export default function HeadphonesCanvas({ useGlb = false }: { useGlb?: boolean }) {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ width: "min(90vh, 860px)", height: "min(90vh, 860px)" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.3, 10], fov: 30 }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} useGlb={useGlb} />
      </Canvas>
    </div>
  );
}
