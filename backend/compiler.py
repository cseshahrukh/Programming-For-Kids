import subprocess

def compile_and_run_python(code, inputs):
    try:
        completed_process = subprocess.run(
            ['python', '-c', code],
            input=inputs, 
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


def compile_and_run_c(code, inputs):
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
        if status:
            run_process = subprocess.run(
                ['./compiled_code'],
                input=inputs,  # Encode inputs to bytes
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                check=True
            )
            stdout = run_process.stdout
            stderr = run_process.stderr
    except subprocess.CalledProcessError as e:
        stdout = e.stdout
        stderr = e.stderr
        status = False

    return {
        'stdout': stdout,
        'stderr': stderr,
        'status': status
    }

def compile_and_run(code, language, inputs):
    if language == 'python':
        return compile_and_run_python(code, inputs)
    elif language == 'c_cpp':
        return compile_and_run_c(code, inputs)
