class Controls {
    constructor() {
        this.forward = false;
        this.right = false;
        this.left = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        });
    }
}

export { Controls };
