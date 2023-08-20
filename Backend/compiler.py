import subprocess

def compile_python(code):
    try:
        completed_process = subprocess.run(
            ['python', '-c', code],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        stdout = completed_process.stdout
        stderr = completed_process.stderr
        status = True
    except subprocess.CalledProcessError as e:
        stdout = e.stdout
        stderr = e.stderr
        status = False

    return {
        'stdout': stdout,
        'stderr': stderr,
        'status': status
    }


def compile_c(code):
    try:
        completed_process = subprocess.run(
            ['gcc', '-o', 'compiled_code', '-x', 'c', '-'],
            input=code,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        stdout = completed_process.stdout
        stderr = completed_process.stderr
        status = True
        if completed_process.returncode != 0:
            status = False
    except subprocess.CalledProcessError as e:
        stdout = e.stdout
        stderr = e.stderr
        status = False

    return {
        'stdout': stdout,
        'stderr': stderr,
        'status': status
    }

def compile(code, language):
    if language == 'python':
        return compile_python(code)
    elif language == 'c_cpp':
        return compile_c(code)