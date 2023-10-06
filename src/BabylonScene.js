import { useEffect, useRef, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

export default function BabylonScene({ onRender, onSceneReady, ...rest }) {
    const reactCanvas = useRef(null);

    const [modelUrl, setModelUrl] = useState(null);
    const [touchpointUrl, setTouchpointUrl] = useState(null);

    getDownloadURL(ref(storage, 'Working_jacket_DAY.glb'))
        .then((url) => {
            setModelUrl(url);
        });

    getDownloadURL(ref(storage, 'hotspot1.png'))
        .then((url) => {
            setTouchpointUrl(url);
        });

    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 94;

        const engine = new BABYLON.Engine(canvas, true);

        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.1);

        const camera = new BABYLON.ArcRotateCamera("Camera", -1.5, 1.2, 2, new BABYLON.Vector3(0, 0, 0), scene);
        camera.lowerRadiusLimit = camera.radius;
        camera.upperRadiusLimit = camera.radius;
        camera.panningSensibility = 0;
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        if (modelUrl && touchpointUrl) {
            BABYLON.SceneLoader.ImportMesh('', modelUrl, '', scene, function (meshes) {
                const loadedModel = meshes[0];
                loadedModel.scaling = new BABYLON.Vector3(1, 1, 1);
                loadedModel.position = new BABYLON.Vector3(0, -1.4, 0);

                const touchPoints = [];
                for (let i = 0; i < 1; i++) {
                    // Create a plane
                    const plane = BABYLON.MeshBuilder.CreatePlane('touchPoint' + i, { size: 0.1 }, scene);

                    // Create a material with a PNG image
                    const material = new BABYLON.StandardMaterial('planeMaterial', scene);
                    const texture = new BABYLON.Texture(touchpointUrl, scene);
                    texture.hasAlpha = true;
                    material.diffuseTexture = texture;
                    plane.material = material;

                    // Set the plane as a billboard (always facing the camera)
                    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

                    // Adjust the position of the touch point
                    plane.position = new BABYLON.Vector3(0, 0, -0.15); // Adjust positions
                    touchPoints.push(plane);

                    // Add click event to the planes
                    plane.actionManager = new BABYLON.ActionManager(scene);
                    plane.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPickTrigger,
                            function () {
                                // Handle the click event here
                                alert('Clicked on touch point ' + i);
                            }
                        )
                    );
                }
            });
        }

        engine.runRenderLoop(() => {
            scene.render();
        });

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 94;
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    });

    return <canvas ref={reactCanvas} {...rest} />;
};