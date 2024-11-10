import pygame
pygame.init()
screen = pygame.display.set_mode((800, 600))  # Window size
pygame.display.set_caption("2D Fighting Game")


running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Game updates go here

    pygame.display.flip()
pygame.quit()