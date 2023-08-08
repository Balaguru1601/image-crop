import React, { useState, useRef } from "react";
import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "./App.css";

import "react-image-crop/dist/ReactCrop.css";
import Preview from "./Preview";
import Card from "./Card";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	console.log(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		)
	);
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

export default function App() {
	const [imgSrc, setImgSrc] = useState("");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [showCompletedCrop, setShowCompletedCrop] = useState();
	const [showCrop, setShowCrop] = useState(false);
	const hiddenAnchorRef = useRef(null);
	const blobUrlRef = useRef("");
	const [preview, setPreview] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const aspect = 16 / 9;
	const inputRef = useRef(null);

	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgSrc(reader.result.toString() || "");
				setShowDialog(true);
			});
			reader.readAsDataURL(e.target.files[0]);
			// reader.readAsArrayBuffer(e.target.files[0]);
		}
	}

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	function onDownloadCropClick() {
		if (!previewCanvasRef.current) {
			throw new Error("Crop canvas does not exist");
		}

		previewCanvasRef.current.toBlob((blob) => {
			if (!blob) {
				throw new Error("Failed to create blob");
			}
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current);
			}
			blobUrlRef.current = URL.createObjectURL(blob);
			hiddenAnchorRef.current.href = URL.createObjectURL(blob);
			hiddenAnchorRef.current.click();
		});
	}

	useDebounceEffect(
		() => {
			if (
				showCompletedCrop &&
				showCompletedCrop.width &&
				showCompletedCrop.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					showCompletedCrop
				);
			}
		},
		100,
		[showCompletedCrop]
	);

	const saveImg = () => {
		setPreview(true);
		setCompletedCrop(completedCrop);
	};

	return (
		<div className="App">
			<dialog open={showDialog}>
				{!!imgSrc && (
					<ReactCrop
						crop={crop}
						onChange={(_, percentCrop) => {
							setCrop(percentCrop);
						}}
						onComplete={(c) => {
							setCompletedCrop(c);
							console.log("completed");
						}}
						aspect={aspect}
						className="crop"
					>
						<img
							ref={imgRef}
							alt="Crop me"
							src={imgSrc}
							onLoad={onImageLoad}
							style={{
								aspectRatio: imgRef.current
									? imgRef.current.naturalWidth /
									  imgRef.current.naturalHeight
									: "",
							}}
						/>
					</ReactCrop>
				)}
				<button
					onClick={() => {
						saveImg();
						setShowDialog(false);
						inputRef.current.value = "";
					}}
				>
					Save
				</button>
			</dialog>

			<div className="wrapper">
				<div className="Crop-Controls">
					<input
						type="file"
						accept="image/*"
						onChange={onSelectFile}
						ref={inputRef}
					/>
				</div>
				<button
					onClick={() => {
						setShowCrop(true);
						setShowCompletedCrop(completedCrop);
						console.log(previewCanvasRef.current);
					}}
				>
					{" "}
					Preview{" "}
				</button>
				{showCrop && (
					<>
						<div>
							<canvas
								ref={previewCanvasRef}
								style={{
									border: "1px solid black",
									objectFit: "contain",
									width: completedCrop.width,
									height: completedCrop.height,
								}}
							/>
						</div>
						<div>
							<button onClick={onDownloadCropClick}>
								Download Crop
							</button>
							<a
								ref={hiddenAnchorRef}
								download
								style={{
									position: "absolute",
									top: "-200vh",
									visibility: "hidden",
								}}
							>
								Hidden download
							</a>
						</div>
					</>
				)}
				<button onClick={saveImg}>Save</button>
			</div>
			{preview && (
				<Card
					cropWidth={completedCrop.width}
					imgref={imgRef}
					cropHeight={completedCrop.height}
					previewRef={previewCanvasRef}
					completeCrop={completedCrop}
				/>
			)}
		</div>
	);
}
