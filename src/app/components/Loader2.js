import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const designList = ['curtain', 'blinds', 'door', 'wallpaper'];

export default function Loader2() {
  const fonts = useSelector((state) => state.font);
  const mountRef = useRef(null);
  const [designIndex, setDesignIndex] = useState(0);
  const [design, setDesign] = useState(designList[0]);
  const meshRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const createMesh = (type) => {
    // Natural material colors
    const fabric = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5DC, // Beige fabric
      roughness: 0.8
    });
    
    const wood = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Wood brown
      roughness: 0.7,
      metalness: 0.1
    });
    
    const metal = new THREE.MeshStandardMaterial({ 
      color: 0xC0C0C0, // Silver metal
      roughness: 0.3,
      metalness: 0.9
    });
    
    const wallpaperPattern = new THREE.MeshStandardMaterial({ 
      color: 0xE6E6FA, // Lavender
      roughness: 0.6,
      emissive: 0xE6E6FA,
      emissiveIntensity: 0.2
    });

    switch (type) {
      case 'curtain': {
        // Create realistic curtain with folds
        const group = new THREE.Group();
        
        // Curtain left panel
        const leftCurtain = new THREE.Mesh(
          new THREE.PlaneGeometry(1.2, 2.5, 20, 20),
          fabric
        );
        
        // Add folds to curtain
        const leftPositions = leftCurtain.geometry.attributes.position;
        for (let i = 0; i < leftPositions.count; i++) {
          const x = leftPositions.getX(i);
          leftPositions.setZ(i, Math.sin(x * 10) * 0.1);
        }
        leftPositions.needsUpdate = true;
        leftCurtain.position.x = -0.6;
        leftCurtain.castShadow = true;
        group.add(leftCurtain);
        
        // Curtain right panel
        const rightCurtain = new THREE.Mesh(
          new THREE.PlaneGeometry(1.2, 2.5, 20, 20),
          fabric
        );
        
        const rightPositions = rightCurtain.geometry.attributes.position;
        for (let i = 0; i < rightPositions.count; i++) {
          const x = rightPositions.getX(i);
          rightPositions.setZ(i, Math.cos(x * 10) * 0.1);
        }
        rightPositions.needsUpdate = true;
        rightCurtain.position.x = 0.6;
        rightCurtain.castShadow = true;
        group.add(rightCurtain);
        
        // Curtain rod
        const rod = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 2.8, 16),
          metal
        );
        rod.rotation.z = Math.PI/2;
        rod.position.y = 1.3;
        group.add(rod);
        
        return group;
      }
      
      case 'blinds': {
        const group = new THREE.Group();
        
        // Window frame
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(2.8, 3.2, 0.1),
          wood
        );
        group.add(frame);
        
        // Individual blinds
        for (let i = 0; i < 12; i++) {
          const blind = new THREE.Mesh(
            new THREE.BoxGeometry(2.6, 0.08, 1.8),
            new THREE.MeshStandardMaterial({ 
              color: 0xF5DEB3, // Wheat color for blinds
              roughness: 0.6
            })
          );
          blind.position.y = 1.2 - i * 0.2;
          blind.rotation.z = Math.PI/4; // Partially open
          group.add(blind);
        }
        
        // Control cords
        const cordMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const cordGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(1, -1.4, 0),
          new THREE.Vector3(1, -1.6, 0.5)
        ]);
        const cord = new THREE.Line(cordGeometry, cordMaterial);
        group.add(cord);
        
        return group;
      }
      
      case 'blinds': {
        const group = new THREE.Group();
      
        // Blinds slats
        const slatMaterial = new THREE.MeshStandardMaterial({
          color: 0xD3D3D3, // Light gray
          roughness: 0.5,
          metalness: 0.3
        });
      
        const slatCount = 20;
        const slatWidth = 2.4;
        const slatHeight = 0.08;
        const slatDepth = 0.05;
        const spacing = 0.15;
      
        for (let i = 0; i < slatCount; i++) {
          const slat = new THREE.Mesh(
            new THREE.BoxGeometry(slatWidth, slatHeight, slatDepth),
            slatMaterial
          );
          slat.position.y = 1.5 - i * spacing;
          slat.rotation.z = Math.PI / 4; // slightly open
          group.add(slat);
        }
      
        // Optional: Thin top bar (rod)
        const topBar = new THREE.Mesh(
          new THREE.BoxGeometry(slatWidth, 0.1, 0.1),
          new THREE.MeshStandardMaterial({ color: 0xA9A9A9 })
        );
        topBar.position.y = 1.6;
        group.add(topBar);
      
        return group;
      }
      
      
      
      case 'wallpaper': {
        // Create wallpaper with subtle pattern
        const group = new THREE.Group();
        
        // Wall base
        const wall = new THREE.Mesh(
          new THREE.PlaneGeometry(3, 3),
          wallpaperPattern
        );
        group.add(wall);
        
        // Add pattern elements
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            const dot = new THREE.Mesh(
              new THREE.CircleGeometry(0.05, 16),
              new THREE.MeshStandardMaterial({ 
                color: 0x9370DB, // Medium purple
                roughness: 0.5
              })
            );
            dot.position.set(-1.2 + i * 0.6, -1.2 + j * 0.6, 0.01);
            group.add(dot);
          }
        }
        
        return group;
      }
      
      default:
        return null;
    }
  };

  useEffect(() => {
    const current = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    
    const camera = new THREE.PerspectiveCamera(
      50, // Natural viewing angle
      current.clientWidth / current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(current.clientWidth, current.clientHeight);
    current.appendChild(renderer.domElement);

    camera.position.z = 5;
    camera.position.y = 0.5;

    // Natural lighting setup
    const sunlight = new THREE.DirectionalLight(0xFDF5E6, 1.2);
    sunlight.position.set(3, 5, 2);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.width = 1024;
    sunlight.shadow.mapSize.height = 1024;
    scene.add(sunlight);

    const ambientLight = new THREE.AmbientLight(0xF5F5F5, 0.8);
    scene.add(ambientLight);

    const mesh = createMesh(design);
    scene.add(mesh);

    meshRef.current = mesh;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005; // Gentle rotation
        if (design === 'blinds') {
          // Animate blinds opening/closing slightly
          meshRef.current.children.slice(1, 13).forEach((blind, i) => {
            blind.rotation.z = Math.PI/4 + Math.sin(Date.now() * 0.001 + i) * 0.1;
          });
        }
      }

      renderer.render(sceneRef.current, cameraRef.current);
    };

    animate();

    const handleResize = () => {
      camera.aspect = current.clientWidth / current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(current.clientWidth, current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesignIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % designList.length;
        const nextDesign = designList[nextIndex];
  
        // Remove old mesh
        if (meshRef.current && sceneRef.current) {
          sceneRef.current.remove(meshRef.current);
        }
  
        // Add new mesh
        const newMesh = createMesh(nextDesign);
        meshRef.current = newMesh;
        if (sceneRef.current) {
          sceneRef.current.add(newMesh);
        }
  
        setDesign(nextDesign);
        return nextIndex;
      });
    }, 4500);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[999999] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5F5DC, #F0FFF0)',
        width: '100vw',
        height: '100vh',
        isolation: 'isolate',
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.9,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '8%',
          zIndex: 2,
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          color: '#5A4A42',
          fontFamily: fonts.Helvetica_Neue_Bold?.style?.fontFamily || 'sans-serif',
          textAlign: 'right',
          maxWidth: 'min(400px, 80vw)',
          lineHeight: 1.5,
          fontWeight: '700',
          textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.7)',
          padding: '1.2rem 1.8rem',
          borderRadius: '12px',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        Designing your perfect <span style={{color: '#8B4513'}}>{design}</span>...
        <div style={{
          marginTop: '1rem',
          height: '4px',
          background: 'linear-gradient(90deg, #8B4513, #CD853F, #8B4513)',
          borderRadius: '2px',
          backgroundSize: '200% 100%',
          animation: 'loadingGradient 2s linear infinite',
        }} />
      </div>
    </motion.div>
  );
}