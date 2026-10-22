"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface UniformModelProps {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  mousePosition?: { x: number; y: number };
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 6;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 6;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return coords;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#FF6500"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ProceduralUniformModel({
  color = "#0B192C",
  accentColor = "#FF6500",
  activeItem = "full",
  mousePosition = { x: 0, y: 0 },
}: UniformModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.4;
    // Parallax sway towards mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePosition.y * 0.25,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mousePosition.x * 0.2,
      0.05
    );
  });

  // Base materials
  const blazerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.1,
      }),
    [color]
  );

  const shirtMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFFFFF"),
        roughness: 0.4,
        metalness: 0.05,
      }),
    []
  );

  const tieMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        roughness: 0.5,
        metalness: 0.2,
      }),
    [accentColor]
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E5A93C"),
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* --- SHIRT INNER COLLAR & CHEST --- */}
      <mesh material={shirtMat} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 1.2, 24]} />
      </mesh>

      {/* Shirt Collar Flaps */}
      <mesh material={shirtMat} position={[-0.18, 0.95, 0.22]} rotation={[0.3, 0.4, -0.3]}>
        <boxGeometry args={[0.22, 0.16, 0.04]} />
      </mesh>
      <mesh material={shirtMat} position={[0.18, 0.95, 0.22]} rotation={[0.3, -0.4, 0.3]}>
        <boxGeometry args={[0.22, 0.16, 0.04]} />
      </mesh>

      {/* --- STRIPED SCHOOL TIE --- */}
      <group position={[0, 0.45, 0.24]}>
        {/* Tie Knot */}
        <mesh material={tieMat} position={[0, 0.46, 0]}>
          <coneGeometry args={[0.1, 0.14, 4]} />
        </mesh>
        {/* Tie Blade */}
        <mesh material={tieMat} position={[0, 0.1, 0]}>
          <boxGeometry args={[0.12, 0.65, 0.02]} />
        </mesh>
        {/* Tie Point Tip */}
        <mesh material={tieMat} position={[0, -0.26, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.085, 0.085, 0.02]} />
        </mesh>
      </group>

      {/* --- BLAZER / JACKET --- */}
      {(activeItem === "blazer" || activeItem === "full") && (
        <group>
          {/* Main Torso Jacket */}
          <mesh material={blazerMat} position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.55, 0.62, 1.35, 24]} />
          </mesh>

          {/* Left Lapel */}
          <mesh
            material={blazerMat}
            position={[-0.26, 0.68, 0.26]}
            rotation={[0.2, 0.3, -0.25]}
          >
            <boxGeometry args={[0.24, 0.55, 0.06]} />
          </mesh>
          {/* Right Lapel */}
          <mesh
            material={blazerMat}
            position={[0.26, 0.68, 0.26]}
            rotation={[0.2, -0.3, 0.25]}
          >
            <boxGeometry args={[0.24, 0.55, 0.06]} />
          </mesh>

          {/* Left Shoulder & Sleeve */}
          <mesh
            material={blazerMat}
            position={[-0.68, 0.42, 0]}
            rotation={[0, 0, 0.25]}
          >
            <capsuleGeometry args={[0.18, 0.85, 8, 16]} />
          </mesh>
          {/* Right Shoulder & Sleeve */}
          <mesh
            material={blazerMat}
            position={[0.68, 0.42, 0]}
            rotation={[0, 0, -0.25]}
          >
            <capsuleGeometry args={[0.18, 0.85, 8, 16]} />
          </mesh>

          {/* School Crest / Monogram Badge (Left Breast Pocket) */}
          <group position={[-0.26, 0.48, 0.42]}>
            <mesh material={goldMat}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            </mesh>
            <mesh
              material={tieMat}
              position={[0, 0, 0.015]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
            </mesh>
          </group>

          {/* Golden Embossed Blazer Buttons */}
          <mesh material={goldMat} position={[0, 0.15, 0.48]}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          <mesh material={goldMat} position={[0, -0.15, 0.5]}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
        </group>
      )}

      {/* --- TROUSERS / SKIRT (FULL UNIFORM) --- */}
      {activeItem === "full" && (
        <group position={[0, -0.95, 0]}>
          {/* Waist Band */}
          <mesh material={blazerMat} position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.5, 0.52, 0.18, 24]} />
          </mesh>
          {/* Left Leg */}
          <mesh material={blazerMat} position={[-0.22, -0.25, 0]}>
            <cylinderGeometry args={[0.2, 0.18, 1.1, 16]} />
          </mesh>
          {/* Right Leg */}
          <mesh material={blazerMat} position={[0.22, -0.25, 0]}>
            <cylinderGeometry args={[0.2, 0.18, 1.1, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function Uniform3DScene({
  color = "#0B192C",
  accentColor = "#FF6500",
  activeItem = "full",
  className = "w-full h-full",
}: {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  className?: string;
}) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.4, 4.2]} fov={45} />
        
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#93C5FD" />
        <pointLight position={[0, 2, 2]} intensity={0.9} color="#FFD1B3" />
        <spotLight
          position={[0, 6, 2]}
          angle={0.4}
          penumbra={1}
          intensity={1.2}
          color="#FFFFFF"
        />

        {/* Floating Particles simulating premium cotton thread dust in studio light */}
        <FloatingParticles count={50} />

        {/* Floating animated 3D uniform */}
        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <ProceduralUniformModel
            color={color}
            accentColor={accentColor}
            activeItem={activeItem}
            mousePosition={mousePos}
          />
        </Float>

        {/* Soft studio contact floor shadow */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.45}
          scale={7}
          blur={2.4}
          far={3}
          color="#0B192C"
        />
      </Canvas>
    </div>
  );
}
