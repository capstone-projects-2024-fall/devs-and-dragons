import pygame as pg, asyncio
import pygame.event
from pygame import MOUSEBUTTONDOWN
from pygame.time import Clock
import sys

import button

import random

from sympy.physics.units import action
from win32api import mouse_event

# Game Window, when we incorporate the bottom panel
bottom_panel = 0 # Right now 0 before we add the editor keyboard (might not be here)
screen_width = 1536
screen_height = 600 + bottom_panel
screen = pg.display.set_mode((screen_width, screen_height))

# Keep screen width and screen height as these represent a 20 to 9 aspect ratio which is smaller than
# 1024 by 768 (to accommodate all devices)

# Wallpaper dimensions are all 2400 by 1080, 20:9 aspect ratio
# For devices of 1024 by 768, use 960 by 432
# For devices of 1280 by 720, use 1200 by 540
# For devices of 1920 by 1080, use 1536 by 600 | which is currently being used

pg.init() # Might not need this line

clock = Clock()

fps = 60

pg.display.set_caption("Battle")


# Some Game Variables
current_fighter = 1 #Dev, 2 would be Bandit
action_cooldown = 0
#action_wait_time

# Define fonts
font = pg.font.SysFont('Times New Roman', 26)

# Define colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
white = (255, 255, 255)
black = (0, 0, 0)
BLACK = black
BLUE = (173, 216, 230)


# Load Images
# Background image
background_image = pg.image.load('Backgrounds/Moonlight Forest.png').convert_alpha()

damage_text_group = pygame.sprite.Group()

# Scale the image to fit the screen
background_image = pg.transform.scale(background_image, (screen_width, screen_height - bottom_panel))

pg.display.set_caption("Text Input Example")

# Input variables
user_text = ""  # Store the user input text
input_active = True  # Control when to capture input



def draw_speech_bubble(screen, text, text_colour, bg_colour, pos, size):

    font = pg.font.SysFont(None, size)
    text_surface = font.render(text, True, text_colour)
    text_rect = text_surface.get_rect(midbottom=pos)

    # background
    bg_rect = text_rect.copy()
    bg_rect.inflate_ip(10, 10)

    # Frame
    frame_rect = bg_rect.copy()
    frame_rect.inflate_ip(4, 4)

    pg.draw.rect(screen, text_colour, frame_rect)
    pg.draw.rect(screen, bg_colour, bg_rect)
    screen.blit(text_surface, text_rect)

# Read Image utility function
# Read image utility function
def read_image(path, w=None, h=None):
    img = pg.image.load(path)

    if (w == None) and (h == None):
        pass
    elif h == None:
        scale = w / img.get_width()
        h = scale * img.get_height()
        img = pg.transform.scale(img, (int(w), int(h)))
    elif w == None:
        scale = h / img.get_height()
        w = scale * img.get_width()
        img = pg.transform.scale(img, (int(w), int(h)))
    else:
        img = pg.transform.scale(img, (int(w), int(h)))

    return img



def draw_text(text, position, color=black):
    """Function to draw text on the screen at a given position."""
    text_surface = font.render(text, True, color)
    screen.blit(text_surface, position)

def draw_background():
    screen.blit(background_image, (0, 0))


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
		#delete the text after a few seconds
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
        pg.draw.rect(screen, red, (self.x, self.y, 150, 20))
        pg.draw.rect(screen, green, (self.x, self.y, 150 * ratio, 20))

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
        self.update_time = pg.time.get_ticks()
        # Load idle animation images
        temp_list = []
        factor_to_scale_with = 5
        for i in range(4):
            sprite_image = pg.image.load(f'img/{self.name}/Idle/{i}.png').convert_alpha()
            original_width = sprite_image.get_width()
            original_height = sprite_image.get_height()
            self.image = pg.transform.scale(sprite_image, (original_width * factor_to_scale_with,
                                                        original_height * factor_to_scale_with))
            temp_list.append(self.image)

        # load attack images
        temp_list = []
        for i in range(4):
            img = pygame.image.load(f'img/{self.name}/Attack/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with
                                               , img.get_height() * factor_to_scale_with))
            temp_list.append(self.img)
        self.animation_list.append(temp_list)

        # load hurt images
        temp_list = []
        for i in range(4):
            img = pygame.image.load(f'img/{self.name}/Hurt/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with,
                                                    img.get_height() * factor_to_scale_with))
            temp_list.append(self.img)
        self.animation_list.append(temp_list)

        # load death images
        temp_list = []
        for i in range(4):
            img = pygame.image.load(f'img/{self.name}/Death/{i}.png')
            self.img = pygame.transform.scale(img, (img.get_width() * factor_to_scale_with,
                                                    img.get_height() * factor_to_scale_with))
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
        if pg.time.get_ticks() - self.update_time > animation_cooldown:
            self.update_time = pg.time.get_ticks()
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
        self.update_time = pg.time.get_ticks()

    def draw(self):
        screen.blit(self.image, self.rect)

    def display_text(self, text):
        draw_speech_bubble(screen, text, (255, 255, 255), (0, 0, 0), self.rect.midtop, 25)

    def attack(self, target):
        # deal damage to enemy
        rand = random.randint(-5, 5)
        damage = self.strength + rand
        target.hp -= damage
        # run enemy hurt animation
        target.hurt()
        # check if target has died
        if target.hp < 1:
            target.hp = 0
            target.alive = False
            target.death()
        damage_text = DamageText(target.rect.centerx, target.rect.y, str(damage), red)
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

# Warning: Don't change the numbers
# But brief approximation, for every 1 increase in scale factor, decrease y by 10%

# How to change these numbers and position the character: FIGURED IT OUT!
dev = Fighter(520, (520 * 0.9), 'Dev', 30, 10, 3)
dragon = Fighter(1016, (520 * 0.9), 'Dragon', 20, 6, 1)

# Create health bars
dev_health_bar = HealthBar(448, 100, dev.hp, dev.max_hp)
dragon_health_bar = HealthBar(946, 100, dragon.hp, dragon.max_hp)

def draw_text_bubble(text, position, bubble_width=200, bubble_height=100, pointer_offset=20):
    """Draws a text bubble with the given text at the specified position."""
    x, y = position

    # Draw bubble rectangle with rounded corners
    bubble_rect = pg.Rect(x, y, bubble_width, bubble_height)
    pg.draw.rect(screen, BLUE, bubble_rect, border_radius=15)
    pg.draw.rect(screen, BLACK, bubble_rect, width=2, border_radius=15)  # Border

    # Draw pointer triangle
    pointer = [
        (x + pointer_offset, y + bubble_height),
        (x + pointer_offset + 15, y + bubble_height),
        (x + pointer_offset + 7, y + bubble_height + 15)
    ]
    pg.draw.polygon(screen, BLUE, pointer)
    pg.draw.polygon(screen, BLACK, pointer, width=2)  # Border for pointer

    # Render text and draw it inside the bubble
    text_surface = font.render(text, True, BLACK)
    text_rect = text_surface.get_rect(center=(x + bubble_width // 2, y + bubble_height // 2))
    screen.blit(text_surface, text_rect)

#run = dev_health_bar != 0 or dragon_health_bar != 0

#create buttons
#potion_button = button.Button(screen, 100, screen_height - bottom_panel + 70, potion_img, 64, 64)
restart_button = button.Button(screen, 330, 120, restart_img, 120, 30)

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

    # draw the damage text
    damage_text_group.update()
    damage_text_group.draw(screen)

    # control player actions
    # reset action variables
    attack = False
    potion = False
    target = None

    # Villain
    dragon.update()
    dragon.draw()
    # Villain health bar
    dragon_health_bar.draw(dragon.hp)

    attack = False
    potion = False
    target = None

    # Dragon asks first question
    dragon_first_question = "What's your name?"
    dragon_correct_ans_to_first_question = "Animish."

    # check if game is over
    if game_over != 0:
        if game_over == 1:
            screen.blit(victory_img, (250, 50))
        if game_over == -1:
            screen.blit(defeat_img, (290, 50))
        if restart_button.draw():
            knight.reset()
            for bandit in bandit_list:
                bandit.reset()
            current_fighter = 1
            action_cooldown
            game_over = 0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            clicked = True
        else:
            clicked = False

    #draw_text_bubble(f"HI ISHAN", (360, 250))  # Use this text in the game logic

    #for event in pg.event.get():
    #    if event.type == MOUSEBUTTONDOWN:


    # Event handler

    '''
    for event in pygame.event.get():
        #draw_text("GAME START", (500,500))
        #draw_text_bubble(f"User entered {user_text}", (360, 250))  # Use this text in the game logic

        
        
        # Some event that would cause the py game to quit,
        # Eventually this event will become a health bar reaching 0
        if event.type == pygame.quit:
            run = False
        # Draw text bubble
        elif event.type == pygame.KEYUP:
            draw_text_bubble(dragon_first_question, (980, 250))
        elif event.type == pygame.KEYDOWN:
            if input_active:
                if event.key == pygame.K_RETURN:  # Enter key finalizes the input
                    #print("User entered:", user_text)
                    #draw_text_bubble(f"User entered {user_text}", (360, 250))  # Use this text in the game logic
                    input_active = False  # Stop input (can set to True again to continue)
                elif event.key == pygame.K_BACKSPACE:
                    user_text = user_text[:-1]  # Remove the last character
                else:
                    # Append character to user_text
                    user_text += event.unicode  # Capture the character pressed


    # Draw the current text on the screen
    #draw_text("Enter your name:", (50, 50))
    #draw_text(user_text, (50, 100), color=white)
    
    '''

    # Update the display which the screen sees
    pg.display.update()

pg.quit()
sys.exit()