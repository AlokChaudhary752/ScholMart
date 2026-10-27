"use client";

import React, { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface UniformModelProps {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  mousePosition?: { x: number; y: number };
}

/* -------------------------------------------------------------
 * Floating Dust Particles in Studio Light
 * ------------------------------------------------------------- */
function FloatingParticles({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return coords;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
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
        size={0.03}
        color="#FF8533"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------
 * Photorealistic 3D Human Student Avatar Model
 * ------------------------------------------------------------- */
function PhotorealisticHumanModel({
  color = "#10233D",
  accentColor = "#FF6500",
  mousePosition = { x: 0, y: 0 },
}: UniformModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/student.glb");

  // Deep clone scene and configure realistic school uniform textures
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Customise outfit/uniform with school palette
        if (
          mesh.name === "avaturn_look_0" ||
          mesh.name.toLowerCase().includes("look") ||
          mesh.name.toLowerCase().includes("cloth")
        ) {
          if (mesh.material) {
            const origMat = mesh.material as THREE.MeshStandardMaterial;
            const customMat = origMat.clone();
            // Blend uniform fabric color with natural shading
            customMat.color = new THREE.Color(color);
            customMat.roughness = 0.65;
            customMat.metalness = 0.08;
            mesh.material = customMat;
          }
        }
      }
    });

    return clone;
  }, [scene, color]);

  // Gentle human breathing and idle sway
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Natural human respiration
    const time = Date.now() * 0.002;
    groupRef.current.position.y = -1.35 + Math.sin(time) * 0.015;

    // Subtle head/upper body lean towards cursor
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePosition.x * 0.25,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePosition.y * 0.1,
      0.04
    );
  });

  return (
    <group ref={groupRef} position={[0, -1.35, 0]}>
      {/* Photorealistic 3D Human Student Model */}
      <primitive object={clonedScene} scale={1.55} />

      {/* Embroidered School Crest Shield Pin on Chest */}
      <group position={[-0.2, 0.98, 0.22]} rotation={[0.05, 0.2, -0.05]}>
        {/* Golden Pin Outer Shield */}
        <mesh>
          <boxGeometry args={[0.07, 0.085, 0.015]} />
          <meshStandardMaterial color="#E5A93C" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Inner Brand Accent Inset */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.05, 0.065, 0.008]} />
          <meshStandardMaterial color={accentColor} roughness={0.4} />
        </mesh>
        {/* Micro Golden Emblem Star */}
        <mesh position={[0, 0, 0.016]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#E5A93C" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Studio Turntable Display Pedestal Underneath Student */}
      <group position={[0, 0, 0]}>
        {/* Beveled Slate Turntable Base Platform */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[1.15, 1.25, 0.06, 36]} />
          <meshStandardMaterial color="#0B132B" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Glowing Brand Accent Ring */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.14, 36]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
        </mesh>
        {/* Inner Marble Inset */}
        <mesh position={[0, 0.002, 0]}>
          <cylinderGeometry args={[1.04, 1.04, 0.015, 36]} />
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// Preload the photorealistic model asset
useGLTF.preload("/models/student.glb");

/* -------------------------------------------------------------
 * Fallback Loader while 3D Model loads
 * ------------------------------------------------------------- */
function StudentLoader() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.4, 0.45, 1.2, 16]} />
        <meshStandardMaterial color="#1E3E62" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------
 * Main Exported Component: Uniform3DScene
 * ------------------------------------------------------------- */
export function Uniform3DScene({
  color = "#10233D",
  accentColor = "#FF6500",
  activeItem = "full",
  className = "w-full h-full",
}: {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 3.8]} fov={38} />

        {/* Orbit Controls: 360° Inspection with Smooth Damping */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.2}
          maxDistance={5.5}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 1.85}
          dampingFactor={0.06}
          enableDamping={true}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />

        {/* Studio 3-Point & Rim Lighting for Photorealistic Rendering */}
        <ambientLight intensity={1.1} />
        {/* Main Key Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFFFF" />
        {/* Cool Fill Light */}
        <directionalLight position={[-4, 3, 2]} intensity={0.9} color="#BAE6FD" />
        {/* Warm Golden Rim / Edge Highlight */}
        <directionalLight position={[0, 4, -4]} intensity={1.5} color="#FED7AA" />
        {/* Face & Uniform Chest Focus Spotlight */}
        <spotLight
          position={[0, 3.5, 3.2]}
          angle={0.5}
          penumbra={0.9}
          intensity={1.8}
          color="#FFF7ED"
        />

        {/* Floating Studio Dust Particles */}
        <FloatingParticles count={40} />

        {/* Realistic Human Student Avatar with Suspense boundary */}
        <Suspense fallback={<StudentLoader />}>
          <PhotorealisticHumanModel
            color={color}
            accentColor={accentColor}
            activeItem={activeItem}
            mousePosition={mousePos}
          />
        </Suspense>

        {/* Soft Studio Contact Floor Shadow */}
        <ContactShadows
          position={[0, -1.38, 0]}
          opacity={0.55}
          scale={5.0}
          blur={2.4}
          far={3}
          color="#0B132B"
        />
      </Canvas>
    </div>
  );
}

export default Uniform3DScene;
