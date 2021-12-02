import React, { Suspense, useRef, useEffect } from 'react';
import {Canvas, extend, useFrame, useLoader, useThree} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import './App.css';
import axios from "axios";

extend({ OrbitControls});

const Orbit = () => {
    const { camera, gl } = useThree();
    return (
        <orbitControls args={[camera, gl.domElement]} />
    );
};

const Box = (props) => {
    const ref = useRef(null);

    useFrame(state => {
        ref.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={ref} {...props} castShadow>
            <sphereBufferGeometry args={[1,100,1000]} />
            <meshPhysicalMaterial
                clearcoat={1}
                color={'orange'}
            />
        </mesh>
    )
};

const getImage = () => (
    axios.get('/autoshop.jgp').then((image) => console.log('image', image))
);

const Background = props => {
    useEffect(() => {
        console.log('firing')
        const getData = async () => {
            return await getImage();
        };
        getData();
    }, []);

    const texture = useLoader(
        THREE.TextureLoader,
        '/autoshop.jpg'
    );
    console.log('texture', texture);
    const { gl } = useThree();
    // const formatted = new THREE.WebGLRenderTarget(
    //     texture.image.height
    // ).fromEquirectangularTexture(gl, texture);

    return (
        <primitive object={texture} attach={'background'} />
    );
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
    const background = <Suspense fallback={'Loading Background...'}>
        <Background/>
    </Suspense>;
    console.log('background', background);

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
                {background}
                <Box position={[0, 1, 0]} />

                <Floor position={[0,-0.5,0]} />
                <Orbit />
            </Canvas>
        </div>
    )
};

export default App;
