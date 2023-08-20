import { useState, useEffect, useRef } from 'react';

const WebcamComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState(false);

    const cameraOnButtonClick = () => {
        // const constraints: MediaStreamConstraints = { video: true };
        const constraints: MediaStreamConstraints = { video: { facingMode: 'environment'} };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraActive(true);
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject as MediaStream;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }
        };
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const capturedDataURL = canvasRef.current.toDataURL('image/png');
                setCapturedImage(capturedDataURL);
                setCameraActive(false);
            }
        }
    };

    return (
        <div>
            <div className={!cameraActive ? "flex ml-auto" : "flex ml-auto hidden"}>
                <button onClick={cameraOnButtonClick}
                    className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                    {capturedImage ? "Capture Again" : "Capture"}
                </button>
            </div>
            <div>
                <div className={cameraActive ? "flex flex-col ml-auto" : "flex ml-auto hidden"}>
                    <video ref={videoRef} autoPlay playsInline />
                    <button onClick={captureImage}
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600  hover:bg-gradient-to-l hover:from-indigo-500 hover:to-indigo-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                    Capture
                </button>
                </div>
                {capturedImage && !cameraActive && (
                    <div className="mt-3 ">
                        <img src={capturedImage} alt="Captured" />
                    </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default WebcamComponent;
