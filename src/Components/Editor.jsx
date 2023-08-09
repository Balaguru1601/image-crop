// import { BubbleMenu } from "@tiptap/react";
// import React from "react";

// const SelectionMenu = ({ editor, selectionType, setSelectionType }) => {
// 	switch (selectionType) {
// 		case null:
// 			return (
// 				<>
// 					<button
// 						type="button"
// 						data-test-id="mark-bold"
// 						className={clsx({
// 							active: editor.isActive("bold"),
// 						})}
// 						onClick={() => editor.chain().toggleBold().run()}
// 					>
// 						<BoldIcon />
// 					</button>
// 					<button
// 						type="button"
// 						data-test-id="mark-italic"
// 						className={clsx({
// 							active: editor.isActive("italic"),
// 						})}
// 						onClick={() => editor.chain().toggleItalic().run()}
// 					>
// 						<ItalicIcon />
// 					</button>
// 					<button
// 						type="button"
// 						data-test-id="mark-underline"
// 						className={clsx({
// 							active: editor.isActive("underline"),
// 						})}
// 						onClick={() => editor.chain().toggleUnderline().run()}
// 					>
// 						<UnderlineIcon />
// 					</button>
// 					<button
// 						type="button"
// 						data-test-id="mark-strike"
// 						className={clsx({
// 							active: editor.isActive("strike"),
// 						})}
// 						onClick={() => editor.chain().toggleStrike().run()}
// 					>
// 						<StrikeIcon />
// 					</button>
// 					<button
// 						type="button"
// 						data-test-id="mark-link"
// 						className={clsx({
// 							active: editor.isActive("link"),
// 						})}
// 						onClick={() => {
// 							setSelectionType("link");
// 						}}
// 					>
// 						<LinkIcon />
// 					</button>
// 				</>
// 			);
// 		case "link":
// 			return (
// 				<div className="insert-link-box">
// 					<input
// 						data-test-id="insert-link-value"
// 						autoFocus
// 						type="text"
// 						placeholder="Insert link address"
// 						onKeyDown={(event) => {
// 							if (event.key === "Enter") {
// 								editor
// 									.chain()
// 									.focus()
// 									.setLink({
// 										href: event.target.value,
// 										target: "_blank",
// 									})
// 									.run();
// 								setSelectionType(null);
// 							}
// 						}}
// 					/>
// 				</div>
// 			);
// 	}
// };

// export const Menu = ({ editor, containerRef }) => {
// 	const [selectionType, setSelectionType] = useState(null);
// 	useEffect(() => {
// 		if (selectionType !== "link") setSelectionType(null);
// 	}, []);
// 	if (!editor || !containerRef.current) return null;
// 	return (
// 		<BubbleMenu
// 			pluginKey="bubbleMenu"
// 			editor={editor}
// 			tippyOptions={{
// 				appendTo: containerRef.current,
// 			}}
// 		>
// 			<SelectionMenu
// 				editor={editor}
// 				selectionType={selectionType}
// 				setSelectionType={setSelectionType}
// 			/>
// 		</BubbleMenu>
// 	);
// };

// const Editor = () => {
// 	return (
// 		<div>
// 			Editor
// 			<Menu />
// 		</div>
// 	);
// };

// export default Editor;

import {
	BubbleMenu,
	EditorContent,
	FloatingMenu,
	useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export default () => {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
	});

	return (
		<>
			{editor && (
				<BubbleMenu
					className="bubble-menu"
					tippyOptions={{ duration: 100 }}
					editor={editor}
				>
					<button
						onClick={() =>
							editor.chain().focus().toggleBold().run()
						}
						className={editor.isActive("bold") ? "is-active" : ""}
					>
						Bold
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleItalic().run()
						}
						className={editor.isActive("italic") ? "is-active" : ""}
					>
						Italic
					</button>
					<button
						className={
							editor.isActive("underline") ? "is-active" : ""
						}
						onClick={() => editor.chain().toggleUnderline().run()}
					>
						Underline
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleStrike().run()
						}
						className={editor.isActive("strike") ? "is-active" : ""}
					>
						Strike
					</button>
				</BubbleMenu>
			)}

			{editor && (
				<FloatingMenu
					className="floating-menu"
					tippyOptions={{ duration: 100 }}
					editor={editor}
				>
					<button
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run()
						}
						className={
							editor.isActive("heading", { level: 1 })
								? "is-active"
								: ""
						}
					>
						H1
					</button>
					<button
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run()
						}
						className={
							editor.isActive("heading", { level: 2 })
								? "is-active"
								: ""
						}
					>
						H2
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleBulletList().run()
						}
						className={
							editor.isActive("bulletList") ? "is-active" : ""
						}
					>
						Bullet List
					</button>
				</FloatingMenu>
			)}

			<EditorContent editor={editor} />
		</>
	);
};
