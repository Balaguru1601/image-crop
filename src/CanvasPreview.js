export function canvasPreview(image, canvas, crop) {
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("No 2d context");
	}

	let height = 0;
	let width = 0;

	if (image.naturalWidth > 600 || image.naturalHeight > 600) {
		const aspect = image.naturalWidth / image.naturalHeight;
		if (image.naturalHeight > image.naturalWidth) {
			height = 600;
			width = aspect * height;
		} else {
			width = 600;
			height = width / aspect;
		}
	}

	const scaleX = image.naturalWidth / width;
	// image.naturalWidth > 600
	// 	? image.naturalWidth / 600
	// 	: image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / height;
	// image.naturalHeight > 600
	// 	? image.naturalHeight / 600
	// 	: image.naturalHeight / image.height;
	// devicePixelRatio slightly increases sharpness on retina devices
	// at the expense of slightly slower render times and needing to
	// size the image back down if you want to download/upload and be
	// true to the images natural size.
	const pixelRatio = window.devicePixelRatio;
	// const pixelRatio = 1

	canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
	canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = "high";

	const cropX = crop.x * scaleX;
	const cropY = crop.y * scaleY;

	const centerX = image.naturalWidth / 2;
	const centerY = image.naturalHeight / 2;

	ctx.save();

	// 5) Move the crop origin to the canvas origin (0,0)
	ctx.translate(-cropX, -cropY);
	// 4) Move the origin to the center of the original position
	ctx.translate(centerX, centerY);
	// 3) Rotate around the origin
	ctx.rotate(0);
	// 2) Scale the image
	ctx.scale(1, 1);
	// 1) Move the center of the image to the origin (0,0)
	ctx.translate(-centerX, -centerY);
	ctx.drawImage(
		image,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight
	);

	ctx.restore();
}
