import React, { useEffect, useRef } from "react";
import { canvasPreview } from "./CanvasPreview";

const Preview = (props) => {
	const { imgref, previewRef, completeCrop } = props;
	const canvasref = useRef(null);
	useEffect(() => {
		canvasPreview(imgref.current, canvasref.current, completeCrop);
	}, []);

	return (
		<div className="preview">
			<canvas
				ref={canvasref}
				style={{
					border: "1px solid black",
					objectFit: "contain",
					width: "200px",
					aspectRatio: props.cropWidth / props.cropHeight,
				}}
			/>
		</div>
	);
};

export default Preview;
