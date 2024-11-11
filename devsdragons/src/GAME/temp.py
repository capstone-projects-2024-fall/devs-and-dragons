# All imports
import pygame
from pygame.time import Clock
import random

import button

# Define colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
white = (255, 255, 255)
black = (0, 0, 0)

# Initialize py game
pygame.init()

# Define fonts
font = pygame.font.SysFont('Times New Roman', 26)

# Set screen
width = 1536
height = 600
screen = pygame.display.set_mode((width, height))

# Load assets
# Background image
background_image = pygame.image.load('img/Backgrounds/Moonlight Forest.png').convert_alpha()
# Scale the image to fit the screen
background_image = pygame.transform.scale(background_image, (width, height))
restart_img = pygame.image.load('img/Icons/restart.png').convert_alpha()
# Load victory and defeat images
victory_img = pygame.image.load('img/Icons/victory.png').convert_alpha()
defeat_img = pygame.image.load('img/Icons/defeat.png').convert_alpha()

clock = Clock()
fps = 60
TILE_SIZE = 128

# All Utility Functions - START
# Create function for drawing text
def draw_text(text, _font, text_col, x, y):
    img = _font.render(text, True, text_col)
    screen.blit(img, (x, y))
# Function for drawing background
def draw_background():
    screen.blit(background_image, (0, 0))
# Function for drawing speech bubbles
def draw_speech_bubble(_screen, text, text_colour, bg_colour, pos, size):
    _font = pygame.font.SysFont(None, size)
    text_surface = _font.render(text, True, text_colour)
    text_rect = text_surface.get_rect(midbottom=pos)
    # background
    bg_rect = text_rect.copy()
    bg_rect.inflate_ip(10, 10)
    # Frame
    frame_rect = bg_rect.copy()
    frame_rect.inflate_ip(4, 4)
    pygame.draw.rect(_screen, text_colour, frame_rect)
    pygame.draw.rect(_screen, bg_colour, bg_rect)
    screen.blit(text_surface, text_rect)
# Read image utility function
def read_image(path, w=None, h=None):
    img = pygame.image.load(path)
    if (w is None) and (h is None):
        pass
    elif h is None:
        scale = w / img.get_width()
        h = scale * img.get_height()
        img = pygame.transform.scale(img, (int(w), int(h)))
    elif w is None:
        scale = h / img.get_height()
        w = scale * img.get_width()
        img = pygame.transform.scale(img, (int(w), int(h)))
    else:
        img = pygame.transform.scale(img, (int(w), int(h)))
    return img
# All Utility Functions - END

# All Classes - START
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
            img = pygame.image.load(f'img/{self.name}/Idle/{i}.png').convert_alpha()
            self.image = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with, img.get_height() * factor_to_scale_with))
            temp_list.append(self.image)
        self.animation_list.append(temp_list)
        # Load attack images
        temp_list = []
        for i in range(8):
            img = pygame.image.load(f'img/{self.name}/Attack/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with, img.get_height() * factor_to_scale_with))
            temp_list.append(self.img)
        self.animation_list.append(temp_list)
        # Load hurt images
        temp_list = []
        for i in range(2):
            img = pygame.image.load(f'img/{self.name}/Hurt/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with, img.get_height() * factor_to_scale_with))
            temp_list.append(self.img)
        self.animation_list.append(temp_list)
        # Load death images
        temp_list = []
        for i in range(1):
            img = pygame.image.load(f'img/{self.name}/Death/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with, img.get_height() * factor_to_scale_with))
            temp_list.append(self.img)
        self.animation_list.append(temp_list)
        self.image = self.animation_list[self.action][self.frame_index]
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)

    def update(self, should_display_text=False, text="Hello",):
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
        if should_display_text:
            self.display_text(text)

    def idle(self):
        # The idle animation as a function along with the variables
        self.action = 0
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

    def draw(self):
        screen.blit(self.image, self.rect)

    def display_text(self, text):
        draw_speech_bubble(screen, text, (255, 255, 255), (0, 0, 0), self.rect.midtop, 25)

    def attack(self, _target):
        # deal damage to enemy
        rand = random.randint(-5, 5)
        damage = self.strength + rand
        _target.hp -= damage
        # run enemy hurt animation
        _target.hurt()
        # check if target has died
        if _target.hp < 1:
            _target.hp = 0
            _target.alive = False
            _target.death()
        damage_text = DamageText(_target.rect.centerx, _target.rect.y, str(damage), red)
        damage_text_group.add(damage_text)
        # set variables to attack animation
        self.action = 1
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

    def hurt(self):
        # set variables to hurt animation
        self.action = 2
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

    def death(self):
        # set variables to death animation
        self.action = 3
        self.frame_index = 0
        self.update_time = pygame.time.get_ticks()

class DamageText(pygame.sprite.Sprite):
    def __init__(self, x, y, damage, colour):
        pygame.sprite.Sprite.__init__(self)
        self.image = font.render(damage, True, colour)
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.counter = 0

    def update(self):
        #move damage text up
        self.rect.y -= 1
        self.counter += 1
        self.counter += 1
        self.counter += 1
        if self.counter > 30:
            self.kill()

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

class DamageText(pygame.sprite.Sprite):
    def __init__(self, x, y, damage, colour):
        pygame.sprite.Sprite.__init__(self)
        self.image = font.render(damage, True, colour)
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.counter = 0

    def update(self):
        #move damage text up
        self.rect.y -= 1
        self.counter += 1
        self.counter += 1
        self.counter += 1
        if self.counter > 30:
            self.kill()
# ALL Classes - END

# Game constants
# Define game variables before loop
current_fighter = 1 # Always devs turn first
action_cooldown = 0
action_wait_time = 90
attack = False
game_over = 0


if __name__ == '__main__':
    pygame.display.set_caption("Battle!")
    damage_text_group = pygame.sprite.Group()

    # Game over 1 if dev wins, -1 if dragon wins

    # Instantiate components
    dev = Fighter(520, (520 * 0.9), 'Dev', 40, 10, 3)
    dragon = Fighter(1016, (520 * 0.9), 'Dragon', 40, 10, 1)
    # Create health bars
    dev_health_bar = HealthBar(448, 100, dev.hp, dev.max_hp)
    dragon_health_bar = HealthBar(946, 100, dragon.hp, dragon.max_hp)
    # Create buttons
    restart_button = button.Button(screen, 330, 120, restart_img, 120, 30)


    # Set the start time when the game starts
    start_time = pygame.time.get_ticks()

    # Questions and answers
    question_one = "What is the time complexity for an insertion on a hash map?"
    answer_one = "Constant"
    question_two = "What is the time complexity for a traversal on a linked list?"
    answer_two = "Linear"
    question_three = "What is the time complexity when searching for an element on a balanced BST?"
    answer_three = "Logarithmic"
    question_four = "What is the time complexity for any 2 loops where one is nested in another?"
    answer_four = "Quadratic"

    question_list = [question_one, question_two, question_three, question_four]
    answer_list = [answer_one, answer_two, answer_three, answer_four]

    while dev.hp != 0 or dragon.hp != 0:
        if dev.hp == 0:
            dev.alive = False
            screen.blit(defeat_img, (290, 50))
            game_over =

        if dragon.hp == 0:
            dragon.alive = False
            screen.blit(victory_img, (250, 50))

        # Calculate the elapsed time (in milliseconds)
        elapsed_time = pygame.time.get_ticks() - start_time

        # Convert to seconds if needed
        elapsed_seconds = elapsed_time / 1000

        # Display elapsed time on the screen (optional)
        draw_text(f"Time: {elapsed_seconds:.2f} s", font, white, 50, 50)
        pygame.display.update()


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

        # Draw damage text
        damage_text_group.update()
        damage_text_group.draw(screen)

        # Control player actions and reset them as needed
        attack = False
        target = None
        start_declaration = True

        if elapsed_seconds < 5:
            draw_text("QUEST START", font, red, 675, 250)
            start_declaration = False
        else:
            game_over = 0

        if current_fighter == 1: # Player's turn
            if dev.alive:
                dev.attack(dragon)
                current_fighter = 2

        if current_fighter == 2: # Dragon's turn
            if dragon.alive:
                dragon.attack(dev)
                current_fighter = 1

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        # VERY IMPORTANT LINE BELOW, DO NOT CHANGE
        pygame.display.update()

    pygame.quit()