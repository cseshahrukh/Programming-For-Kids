import openai

openai.api_key = "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"

def getHints1(question, code):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.3,
    messages=[
            {"role": "system", "content": f"You answer to school students who are learning programming. You go over their code and \
            give hints where they made an error. You never explicitly return the code nor do you explicitly point out the incorrect \
            line. You provide a gentle nudge to help students without giving away too much. Provide encouragement too."},
            {"role": "user", "content": f"The Programming Problem is - {question} The student's code is - {code}"}
        ]
    )
    return response['choices'][0]['message']['content']

def getHints2(question, code):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.7,
    messages=[
            {"role": "system", "content": f"You answer to school students who are learning programming. You go over their code and \
            give hints where they made an error. You never explicitly return the full code. You only point out the incorrect line \
            in the code and provide a gentle nudge to help students without giving away too much. Provide encouragement too."},
            {"role": "user", "content": f"The Programming Problem is - {question} The student's code is - {code}"}
        ]
    )
    return response['choices'][0]['message']['content']

def getHints3(question, code):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.7,
    messages=[
            {"role": "system", "content": f"You answer to school students who are learning programming. You go over their code and \
            give hints where they made an error. You give the corrected version of the code snippet of the incorrect part only. \
            Provide encouragement too."},
            {"role": "user", "content": f"The Programming Problem is - {question} The student's code is - {code}"}
        ]
    )
    return response['choices'][0]['message']['content']


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

def getErrorExplanation(error):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0.5,
    messages=[
            {"role": "system", "content": "You answer to school students who are learning programming. You get a message with errors\
                during compilation. You rewrite that errors so that learners can get what the error is. You don't use the word \
                    'error message' in your reply"},
            {"role": "user", "content": f"The error during compilation is - {error}"}
        ]
    )
    return response['choices'][0]['message']['content']

def getHints(n, question, code):
    if n == 1:
        return getHints1(question, code)
    elif n == 2:
        return getHints2(question, code)
    elif n == 3:
        return getHints3(question, code)
    else:
        print("Invalid option")

# question = "Create a simple game where the computer thinks of a random number between 1 and 100, and the player has to guess it. The computer should provide hints if the player's guess is too high or too low. The player continues guessing until they correctly guess the number."
# code = '''
# import random

# def guess_the_number():
#     target_number = random.randint(1, 100)
#     attempts = 0
    
#     print("Welcome to the Guess the Number game!")
#     print("I'm thinking of a number between 1 and 100.")
    
#     while True:
#         player_guess = input("Take a wild guess: ")
#         player_guess = int(player_guess)  # Convert input to integer
        
#         if player_guess == target_number:
#             attempts += 1
#             print("Congratulations! You guessed the number in", attempts, "attempts.")
#             break
#         elif player_guess < target_number:
#             print("Your guess is too high! Try a lower number.")
#         else:
#             print("Your guess is too low! Try a higher number.")
        
#         attempts -= 1  # Decrement attempts (oops, this is incorrect!)
    
#     print("Thanks for playing!")

# guess_the_number()

# '''

# print(getHints2(question, code))
