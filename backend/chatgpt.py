import openai

openai.api_key = "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"

def getHints(question, code, count):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.0,
    messages=[
            {"role": "system", "content": f"You answer to school students who are learning programming. You go over their code and \
            give hints where they made an error. You never explicitly return the code nor do you explicitly point out the correct \
            change. You only give a hint how they might correct it. You give hints based on a scale from 1 to 3. 1 on the scale \
             means you give one simple hint without any line number mentioned, 2 on the scale means you give a hint with line number \
             mentioned and 3 means you point out the explicit change in the code. Currently, you are on {count} in the scale. \
             Strictly follow the scale and Give only the hint corresponding to where you are on the scale. Be as concise as you can."},
            {"role": "user", "content": f"The Programming Problem is - {question} The student's code is - {code}"}
        ]
    )
    return response


def checkCorrectness(question, code):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=2.0,
    messages=[
            {"role": "system", "content": "You are a competitive programming problem site judge. Check the submitted code against \
             the programming problem question for test cases and edge cases. Pick even minor faults too. Don't return code. Strcitly \
             return a single word - either CORRECT or INCORRECT as the final word of your response."},
            {"role": "user", "content": f"The Programming Problem is - {question} The code is - {code}"}
        ]
    )
    return response

question = "Create a simple game where the computer thinks of a random number between 1 and 100, and the player has to guess it. The computer should provide hints if the player's guess is too high or too low. The player continues guessing until they correctly guess the number."
code = '''
import random

def guess_the_number():
    target_number = random.randint(1, 100)
    attempts = 0
    
    print("Welcome to the Guess the Number game!")
    print("I'm thinking of a number between 1 and 100.")
    
    while True:
        player_guess = input("Take a wild guess: ")
        player_guess = int(player_guess)  # Convert input to integer
        
        if player_guess == target_number:
            attempts += 1
            print("Congratulations! You guessed the number in", attempts, "attempts.")
            break
        elif player_guess < target_number:
            print("Your guess is too high! Try a lower number.")
        else:
            print("Your guess is too low! Try a higher number.")
        
        attempts -= 1  # Decrement attempts (oops, this is incorrect!)
    
    print("Thanks for playing!")

guess_the_number()

'''

response = getHints(question, code, 2)
print(response['choices'][0]['message']['content'])