"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshStandardMaterial, Mesh, Group } from "three";
import * as THREE from "three";

function Headphones({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<Group>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;

    // Idle bob + slow Y rotation
    groupRef.current.position.y = Math.sin(timeRef.current * (Math.PI * 2) / 4) * 0.15;
    groupRef.current.rotation.y = timeRef.current * (Math.PI * 2) / 20;

    // Mouse parallax tilt (lerped)
    const targetX = mouse.current[1] * 0.08;
    const targetZ = mouse.current[0] * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (-targetZ - groupRef.current.rotation.z) * 0.05;
  });

  const darkMat = new THREE.MeshStandardMaterial({ color: "#1a1a2e", roughness: 0.6, metalness: 0.3 });
  const padMat = new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.8, metalness: 0.1 });
  const accentMat = new THREE.MeshStandardMaterial({ color: "#22C55E", roughness: 0.4, metalness: 0.5, emissive: "#22C55E", emissiveIntensity: 0.15 });

  return (
    <group ref={groupRef}>
      {/* Headband arc (torus arc approximated as thin cylinder bent) */}
      <mesh rotation={[0, 0, 0]} material={darkMat}>
        <torusGeometry args={[1.1, 0.07, 12, 40, Math.PI]} />
      </mesh>

      {/* Left ear cup */}
      <group position={[-1.1, 0, 0]}>
        {/* Arm */}
        <mesh position={[0, 0.45, 0]} material={darkMat}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 10]} />
        </mesh>
        {/* Cup outer */}
        <mesh position={[0, -0.1, 0]} material={darkMat}>
          <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        </mesh>
        {/* Cup pad */}
        <mesh position={[0, -0.1, 0.18]} material={padMat}>
          <cylinderGeometry args={[0.38, 0.38, 0.06, 24]} />
        </mesh>
        {/* Green accent ring */}
        <mesh position={[0, -0.1, 0]} material={accentMat}>
          <torusGeometry args={[0.42, 0.018, 8, 24]} />
        </mesh>
      </group>

      {/* Right ear cup */}
      <group position={[1.1, 0, 0]}>
        {/* Arm */}
        <mesh position={[0, 0.45, 0]} material={darkMat}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 10]} />
        </mesh>
        {/* Cup outer */}
        <mesh position={[0, -0.1, 0]} material={darkMat}>
          <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        </mesh>
        {/* Cup pad */}
        <mesh position={[0, -0.1, 0.18]} material={padMat}>
          <cylinderGeometry args={[0.38, 0.38, 0.06, 24]} />
        </mesh>
        {/* Green accent ring */}
        <mesh position={[0, -0.1, 0]} material={accentMat}>
          <torusGeometry args={[0.42, 0.018, 8, 24]} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeadphonesCanvas() {
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
    <div style={{ width: "40vh", height: "40vh", maxWidth: 480, maxHeight: 480 }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[-3, 3, 2]} intensity={0.6} color="#22C55E" />
        <pointLight position={[3, 2, 2]} intensity={0.3} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={0.2} color="#0B1120" />

        <Headphones mouse={mouse} />
      </Canvas>
    </div>
  );
}
