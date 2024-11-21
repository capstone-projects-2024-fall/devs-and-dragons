export default function initKnightAnimation() {
    const canvas = document.getElementById("playerCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class Knight {
        constructor(canvasWidth, canvasHeight, imageID, max) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 6;
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width) / 2;
            this.y = (canvasHeight - this.height) / 2;
            this.tickCount = 0;
            this.ticksPerFrame = 10;
            this.changeAnimation('playerIdle', 7); // Set default animation to idle
        }

        changeAnimation(state, frames) {
            this.image = document.getElementById(state);
            this.maxFrame = frames;
            this.frameIndex = 0;
            this.playOnce = state !== 'playerIdle'; // Only play once if not idle
        }

        draw(context) {
            let sx = 16 + this.frameIndex * 96;
            let sy = 16;
            context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex >= this.maxFrame - 1 && this.playOnce) {
                    this.changeAnimation('playerIdle', 7); // Revert to idle after playing once
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.maxFrame;  // Cycle through frames
                }
            }
        }
    }

    const knight = new Knight(canvas.width, canvas.height, "playerIdle", 7);

    document.getElementById("idle").addEventListener("click", () => {
        knight.changeAnimation('playerIdle', 7);
    });
    document.getElementById("attack").addEventListener("click", () => {
        knight.changeAnimation('playerAttack1', 6);
    });
    document.getElementById("hurt").addEventListener("click", () => {
        knight.changeAnimation('playerHurt', 4);
    });
    document.getElementById("death").addEventListener("click", () => {
        knight.changeAnimation('playerDeath', 12);
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        knight.draw(ctx);
        knight.update();
        requestAnimationFrame(animate);
    }

    animate();
}
