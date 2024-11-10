import pygame

import random
# import button NEED TO FIX

pygame.init()

clock = pygame.time.Clock()
fps = 60

# Game Window
bottom_panel = 150
screen_width = 800
screen_height = 400 + bottom_panel

screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Battle")

# Load Images
# Background image
background_image = pygame.image.load('images.jpg').convert_alpha()

def draw_background():
    screen.blit(background_image, (0, 0))

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
        self.image = pygame.image.load(f'img/{self.name}/Idle/0.png')
        self.rect = self.image.get_rect()
        self.rect_center = (x, y)

    def draw(self):
        screen.blit(self.image, self.rect)

knight = Fighter(200, 260, 'Knight', 30, 10, 3)

run = True
while run:
    clock.tick(fps)
