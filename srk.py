# Create the API endpoint for retrieving problems based on criteria
@app.route('/courses/problems/<int:course_id>/<int:week_no>/<int:lesson_id>', methods=['GET'])
def get_problems(course_id, week_no, lesson_id):
    # Retrieve problems based on the provided criteria
    selected_problems = problems.query.filter_by(course_id=course_id, week_no=week_no, lesson_id=lesson_id).all()

    # Convert the list of problems to a list of dictionaries with examples
    problems_list = []
    for problem in selected_problems:
        print(problem.examples)
        examples = problem.examples.split('\n\n')
        print('Size of examples: ', len(examples))
        example_list = []
        print(examples)
        
        for i in range(0, len(examples), 3):
            input_value = examples[i].replace('Input:', '').strip()
            output_value = examples[i+1].replace('Output:', '').strip()
            explanation = examples[i+2].replace('Explanation:', '').strip()
            
            example_list.append({
                'Input': input_value,
                'Output': output_value,
                'Explanation': explanation
            })
        
        problems_list.append({
            'course_id': problem.course_id,
            'week_no': problem.week_no,
            'lesson_id': problem.lesson_id,
            'question': problem.question,
            'examples': example_list
        })

    return jsonify({'problems': problems_list})