import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import CanvasLoader from '../Loader'


const SpaceBoy = () => {

    const boy = useGLTF('./src/assets/space_boi/scene.gltf')

  return (
    <mesh>
        <hemisphereLight
        intensity={0.15}
        groundColor="black"
        />
        <pointLight intensity={1}/>
        <spotLight
        position={[-30, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        /> 
        <primitive
        object={boy.scene}
        scale={0.9}
        position={[0, -3.25, -1.0]}
        />  
    </mesh>
  )
}


const SpaceCanvas = () => {
    

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
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI / 2}/>
        <SpaceBoy />
    </Suspense>


    </Canvas>
  )
}


export default SpaceCanvas