import {Suspense, useEffect, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import CanvasLoader from '../Loader'

const CuteAlien = () => {
    const boy = useGLTF('./src/assets/alien_hominid/scene.gltf')

    return (
        <group>
            <hemisphereLight intensity={0.6} groundColor="black" />
            <pointLight intensity={1.2} position={[0, 10, 0]} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.3}
                penumbra={1}
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
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)")
    
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event: any) => {
          setIsMobile(event.matches)
        } 
    
        mediaQuery.addEventListener('change', handleMediaQueryChange)
    
        return () => {
          mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
      }, [])

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