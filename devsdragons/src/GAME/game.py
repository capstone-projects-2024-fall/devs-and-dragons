import pygame
from pygame.time import Clock
from clacks import Clacks

import random
# import button NEED TO FIX

# Game Window, when we incorporate the bottom panel
bottom_panel = 0 # Right now 0 before we add the editor keyboard (might not be here)
screen_width = 1536
screen_height = 600 + bottom_panel

# Keep screen width and screen height as these represent a 20 to 9 aspect ratio which is smaller than
# 1024 by 768 (to accommodate all devices)

# Wallpaper dimensions are all 2400 by 1080, 20:9 aspect ratio
# For devices of 1024 by 768, use 960 by 432
# For devices of 1280 by 720, use 1200 by 540
# For devices of 1920 by 1080, use 1536 by 600 | which is currently being used

pygame.init() # Might not need this line

clacks = Clacks()
clacks.clock = Clock()

# Part 1: Import initial setup for the game
from modes.LogoOne import LogOne

current_screen = LogOne(clacks, (screen_width, screen_height))

screens = {
    "Logo": current_screen
}


# Part 2: Load other Quest Stuff

# Part 3: Game/Battle Logic (Loop)


fps = 60

screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Battle")

# Define fonts
font = pygame.font.SysFont('Times New Roman', 26)

# Define colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)

# Load Images
# Background image
background_image = pygame.image.load('Backgrounds/Moonlight Forest.png').convert_alpha()

# Scale the image to fit the screen
background_image = pygame.transform.scale(background_image, (screen_width, screen_height - bottom_panel))

def draw_background():
    screen.blit(background_image, (0, 0))

class HealthBar:
    def __init__(self, x, y, hp, max_hp):
        self.x = x
        self.y = y
        self.hp = hp
        self.max_hp = max_hp

    def draw(self, hp):
        # Update with new health
        self.hp = hp
        # Calculate new health ratio
        ratio = self.hp / self.max_hp
        pygame.draw.rect(screen, red, (self.x, self.y, 150, 20))
        pygame.draw.rect(screen, green, (self.x, self.y, 150 * ratio, 20))

class Fighter:
    def __init__(self, x, y, name, max_hp, strength, potions):
        self.name = name
        self.max_hp = max_hp
        self.hp = max_hp
        self.strength = strength
        self.start_potions = potions
        self.potions = potions
        self.alive = True
        self.animation_list = []
        self.frame_index = 0
        # 0 indicating idle, 1 attack, 2 hurt, 3 dead
        self.action = 0
        self.update_time = pygame.time.get_ticks()
        # Load idle animation images
        temp_list = []
        factor_to_scale_with = 5
        for i in range(4):
            sprite_image = pygame.image.load(f'img/{self.name}/Idle/{i}.png').convert_alpha()
            original_width = sprite_image.get_width()
            original_height = sprite_image.get_height()
            self.image = pygame.transform.scale(sprite_image, (original_width * factor_to_scale_with,
                                                        original_height * factor_to_scale_with))
            temp_list.append(self.image)
        self.animation_list.append(temp_list)

        self.image = self.animation_list[self.action][self.frame_index]
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)

    def update(self):
        animation_cooldown = 100
        # Handle animation
        # Update image
        self.image = self.animation_list[self.action][self.frame_index]
        # Check if enough time has passed since the last update
        if pygame.time.get_ticks() - self.update_time > animation_cooldown:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        # If the animation has run out then reset back to start
        if self.frame_index >= len(self.animation_list[self.action]):
            if self.action == 3:
                self.frame_index = len(self.animation_list[self.action]) - 1
            else:
                self.idle()

    def idle(self):
        # The idle animation as a function along with the variables
        self.action = 0
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

    def draw(self):
        screen.blit(self.image, self.rect)

# Warning: Don't change the numbers
# But brief approximation, for every 1 increase in scale factor, decrease y by 10%

# How to change these numbers and position the character: FIGURED IT OUT!
dev = Fighter(520, (520 * 0.9), 'Dev', 30, 10, 3)
dragon = Fighter(1016, (520 * 0.9), 'Dragon', 20, 6, 1)

# Create health bars
dev_health_bar = HealthBar(448, 100, dev.hp, dev.max_hp)
dragon_health_bar = HealthBar(946, 100, dragon.hp, dragon.max_hp)


run = True
while run:
    clock.tick(fps)

    # Draw background
    draw_background()

    # Draw entities onto the screen
    # Player
    dev.update()
    dev.draw()
    # Player health bar
    dev_health_bar.draw(dev.hp)

    # Villain
    dragon.update()
    dragon.draw()
    # Villain health bar
    dragon_health_bar.draw(dragon.hp)

    # Event handler
    for event in pygame.event.get():
        # Some event that would cause the py game to quit,
        # Eventually this event will become a health bar reaching 0
        if event.type == pygame.quit:
            run = False

    # Update the display which the screen sees
    pygame.display.update()

pygame.quit()