import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import CanvasLoader from '../Loader'

const CuteAlien = () => {

    const assetBaseUrl = import.meta.env.VITE_ASSET_BASE_URL || ''

    const boy = useGLTF(`${assetBaseUrl}/alien_hominid/scene.gltf`)

    return (
        <group>
            <hemisphereLight intensity={1} groundColor="#51124c" />
            <pointLight intensity={1.2} position={[2.2, 1.7, 0.9]} />
            <spotLight
                position={[0, -2.8, 0]}
                angle={0.8}
                penumbra={0.5}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <primitive object={boy.scene}  scale={0.0035} position={[0, -2.8, 0]} rotation={[0.09, 1.9, 0]}/>
        </group>
    );
}


const AlienCanvas = () => {

  return (
    <Canvas
    frameloop="demand"
    shadows 
    camera={{position: [20, 3, 5], fov: 25}}
    gl={{preserveDrawingBuffer: true}}
    >
    <Suspense
    fallback={<CanvasLoader/>}
    >
        <OrbitControls enableZoom={false}
        maxPolarAngle={Math.PI/3}
        minPolarAngle={Math.PI / 3}/>
        <CuteAlien />
    </Suspense>


    </Canvas>
  )
}


export default AlienCanvas