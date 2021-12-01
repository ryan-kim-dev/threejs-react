import React, { useRef, Suspense } from 'react';
import {Canvas, extend, useFrame, useLoader, useThree} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import './App.css';

extend({ OrbitControls});

const Orbit = () => {
    const { camera, gl } = useThree();
    return (
        <orbitControls args={[camera, gl.domElement]} />
    );
};

const Box = (props) => {
    const ref = useRef();
    const texture = useLoader(
        THREE.TextureLoader,
        '/wood.jpg'
    );
    useFrame(state => {
        ref.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={ref} {...props} castShadow>
            <boxBufferGeometry />
            <meshPhysicalMaterial
                map={texture}
            />
        </mesh>
    )
};

const Floor = (props) => {
    return (
        <mesh {...props} receiveShadow>
            <boxBufferGeometry args={[10, 1, 10]} />
            <meshPhysicalMaterial />
        </mesh>
    );
};

const Bulb = props => {
    return (
        <mesh {...props}>
            <pointLight />
            <sphereBufferGeometry args={[0.5]} />
            <meshPhongMaterial emissive='green' />
        </mesh>
    )
}
const App = () => {
    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <Canvas
                shadowMap
                style={{background: 'black'}}
                camera={{ position: [3, 5, 3]}}
            >
                <ambientLight intensity={0.1} />
                <Bulb position={[0, 3, 0]} />
                <axesHelper args={[5]} />
                <Suspense fallback={null}>
                    <Box position={[0, 1, 0]} />
                </Suspense>
                <Floor position={[0,-0.5,0]} />
                <Orbit />
            </Canvas>
        </div>
    )
};

export default App;
