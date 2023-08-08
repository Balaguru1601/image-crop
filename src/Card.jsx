import React, { useEffect, useRef } from "react";
import { canvasPreview } from "./CanvasPreview";

const Card = (props) => {
	const { imgref, completeCrop } = props;
	const canvasref = useRef(null);
	useEffect(() => {
		canvasPreview(imgref.current, canvasref.current, completeCrop);
	}, []);
	return (
		<div className="card">
			<canvas
				ref={canvasref}
				style={{
					border: "1px solid black",
					objectFit: "contain",
					width: completeCrop.width,
					height: completeCrop.height,
					maxWidth: "100%",
					maxHeight: "100%",
				}}
			/>
		</div>
	);
};

export default Card;
