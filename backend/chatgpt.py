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


def randomProblem():
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.7,
        messages=[
            {"role": "system", "content": "You return programming problems for school students. You send a JSON in the format such \
                as question first, then array named examples of 3 elements each containing (input, output, explanation)"},
            {"role": "user", "content": f"Give the JSON format of the problem"}
        ]
    )
    print(response['choices'][0]['message']['content'])
    return response


def getErrorExplanation(error):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.5,
        messages=[
            {"role": "system", "content": "You answer to school students who are learning programming. You get a message with errors\
                during compilation. You rewrite that errors so that learners can get what the error is. And you give hints on what \
                    the potential solution could be. Be concise."},
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


randomProblem()