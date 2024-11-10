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

run = True
while run:
    clock.tick(fps)
