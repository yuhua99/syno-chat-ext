// Global element getter

// chat area
export let chatMainMsgInputBox = () => document.querySelector(".tiptap.ProseMirror[contenteditable='true']") as HTMLDivElement;

// gadgets
export let chatRoomSearch = () => document.querySelector('.jump-to-button>button') as HTMLButtonElement;
export let chatRoomSearchInputBox = () => document.querySelector(".jump-dialog input") as HTMLInputElement;
