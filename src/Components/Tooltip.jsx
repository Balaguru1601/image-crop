import React from "react";
import classes from "./Tooltip.module.css";

const Tooltip = (props) => {
	return (
		<div className={classes.tooltip}>
			{props.children}
			<span
				className={classes.content}
				style={{
					visibility: props.visible ? "visible" : "hidden",
					...props.style,
				}}
			>
				{props.content}
			</span>
		</div>
	);
};

export default Tooltip;
