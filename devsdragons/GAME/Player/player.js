export default function initKnightAnimation() {
    const canvas = document.getElementById("playerCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;


    class Knight {
        constructor (canvasWidth, canvasHeight, imageID, max){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 6;
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width) / 2;
            this.y = (canvasHeight - this.height) /2;
            this.minFrame = 0;
            this.maxFrame = max;
            this.frameIndex = 0;
            // this.frameX = 1;
            this.tickCount = 0;
            this.ticksPerFrame = 10;
        }

        draw(context) {
            let sx = 16 + this.frameIndex * 96;
            // let sx =16+96+96+96;
            let sy = 16;
            let sWidth = 64;
            let sHeight = 64;
            context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            // context.drawImage(this.image, 0, 0);
        }
        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                this.frameIndex = (this.frameIndex + 1) % this.maxFrame;  // Cycle through frames
            }
        }
        setAnimation(newMax, newimageID){
            this.maxFrame = newMax;
            this.image = document.getElementById(newimageID);
        }
    }

    // imageID: "playerIdle" --- max: 7
    // imageID: "playerAttack1" --- max: 6
    // imageID: "playerAttack2" --- max: 5
    // imageID: "playerAttack3" --- max: 6
    // imageID: "playerDeath" --- max: 12
    // imageID: "playerHurt" --- max: 4
    const knight = new Knight(canvas.width, canvas.height, "playerIdle", 7);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        knight.draw(ctx);
        knight.update();
        requestAnimationFrame(animate);
    }
    
    animate();

    const idle = document.getElementById("idle");
    idle.addEventListener("click", () => {
        knight.setAnimation(7, "playerIdle");
    });

    const attack = document.getElementById("attack");
    attack.addEventListener("click", () => {
        knight.setAnimation(6, "playerAttack1");
    });

    const hurt = document.getElementById("hurt");
    hurt.addEventListener("click", () => {
        knight.setAnimation(4, "playerHurt");
    });

    const death = document.getElementById("death");
    death.addEventListener("click", () => {
        knight.setAnimation(12, "playerDeath");
    });
}