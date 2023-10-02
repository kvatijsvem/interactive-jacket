import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import BabylonScene from "./BabylonScene";

const CustomScene = () => {
    let box;

    const onSceneReady = (scene) => {

        const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

        camera.setPosition(new BABYLON.Vector3(10, 0, 0));

        camera.panningSensibility = 0;

        const canvas = scene.getEngine().getRenderingCanvas();

        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        BABYLON.SceneLoader.Append(`${process.env.PUBLIC_URL}/`, "Working_jacket_DAY.glb", scene);

    };

    return (
        <BabylonScene antialias onSceneReady={onSceneReady} id="my-canvas" />
    );
}

export default CustomScene