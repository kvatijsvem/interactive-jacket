import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import BabylonScene from "./BabylonScene";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { useState } from 'react';

const CustomScene = () => {

    const [modelUrl, setModelUrl] = useState(null);

    getDownloadURL(ref(storage, 'Working_jacket_DAY.glb'))
        .then((url) => {
            setModelUrl(url);
        });

    const onSceneReady = (scene) => {

        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.1);

        const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 5, new BABYLON.Vector3(0, 0, 0), scene);

        camera.setPosition(new BABYLON.Vector3(10, 0, 0));

        camera.panningSensibility = 0;

        const canvas = scene.getEngine().getRenderingCanvas();

        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        if (modelUrl) {
            BABYLON.SceneLoader.Append(modelUrl, '', scene);
        }

    };

    return (
        <BabylonScene antialias onSceneReady={onSceneReady} id="my-canvas" />
    );
}

export default CustomScene