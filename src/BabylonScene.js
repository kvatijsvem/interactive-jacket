"use client";

import { useEffect, useRef } from "react";
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

export default function BabylonScene({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) {
    const reactCanvas = useRef(null);

    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 145;

        const engine = new BABYLON.Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        const scene = new BABYLON.Scene(engine, sceneOptions);
        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === "function") onRender(scene);
            scene.render();
        });

        const resize = () => {
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
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

    return <canvas ref={reactCanvas} {...rest} />;
};