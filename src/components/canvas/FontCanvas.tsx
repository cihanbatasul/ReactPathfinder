import  { useRef, useEffect } from 'react';
import { useThree, Canvas,  } from '@react-three/fiber';
import { Center, Text3D, OrbitControls} from '@react-three/drei';
import { Color } from 'three';
const FontCanvas = () => {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 100], zoom: 100 }}
      onCreated={({ camera }) => {
        camera.userData.originalZoom = camera.zoom;
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Center>
        <Font />
      </Center>
      <axesHelper scale={0} position={[0, 0, 0]} onUpdate={(self) => self.setColors(new Color('#ff2080'), new Color('#20ff80'), new Color('#2080ff'))
  }/>
      <OrbitControls enableZoom={false} enablePan={false}   />
    </Canvas>
  );
};

const Font = () => {
  const { camera, size} = useThree();
  const textRef = useRef<THREE.Mesh>(null);



  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const newZoom = isMobile ? camera.userData.originalZoom * (window.innerWidth / 768) : camera.userData.originalZoom;
      camera.zoom = newZoom;
      camera.updateProjectionMatrix();

      const textMesh = textRef.current;
      if (textMesh) {
        const scaleFactor = camera.zoom / camera.userData.originalZoom;
        if(window.innerWidth <= 640){
          // Scale text
          if(window.innerWidth < 490){
            textMesh.position.set(2, 1, 0); 
            textMesh.scale.set(scaleFactor , scaleFactor , 1);
          }
          else if(window.innerWidth > 585) {
            textMesh.position.set(1.5, 1, 0); 
            textMesh.scale.set(scaleFactor *0.8, scaleFactor * 0.8, 1);
          } else {
            textMesh.position.set(2.5, 1, 0); 
            textMesh.scale.set(scaleFactor *0.8, scaleFactor * 0.8, 1); 
          }
        }else if(window.innerWidth > 640 && window.innerWidth <= 1024){
          

          if(window.innerWidth > 701 && window.innerWidth < 910 ){
            textMesh.position.set(1.4, 0, 0); 
          textMesh.scale.set(scaleFactor * 0.7, scaleFactor *0.7, 1)
          }else {
            textMesh.position.set(1.4, 0, 0); 
          textMesh.scale.set(scaleFactor * 0.8, scaleFactor *0.8, 1);
          }
        }else if(window.innerWidth > 1024 && window.innerWidth <= 1280){
          textMesh.position.set(1.4, 0, 0); 
          textMesh.scale.set(scaleFactor * 0.8, scaleFactor *0.8, 1);
        }
        else if(window.innerWidth > 1280 && window.innerWidth <= 1280){
          textMesh.position.set(1.4, 0, 0); 
          textMesh.scale.set(scaleFactor * 0.8, scaleFactor *0.8, 1); //
        }
        else {
          textMesh.position.set(0, 0, 0); 
          textMesh.scale.set(scaleFactor, scaleFactor, 1); // Scale text

        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, size]);

  return (
   
    <Center rotation={[-0.5,-0.2,0.02]}>
      
        <Text3D
        ref={textRef}
        curveSegments={22}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.4}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1}
        font="/fonts/Vina Sans.json"
      >
        {`Pathfinding Visualizer\nby Cihan`}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
};

export default FontCanvas;