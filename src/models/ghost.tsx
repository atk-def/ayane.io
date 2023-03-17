import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh;
  };
  materials: {
    Mat01: THREE.MeshBasicMaterial;
  };
};

export function Ghost(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<Group>(null!);
  const { nodes, materials } = useGLTF("/ghost.glb") as unknown as GLTFResult;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 1) / 8, 0);
    ref.current.position.y = -(20 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        name="body"
        geometry={nodes.body.geometry}
        material={materials.Mat01}
        morphTargetDictionary={nodes.body.morphTargetDictionary}
        morphTargetInfluences={nodes.body.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/ghost.glb");
