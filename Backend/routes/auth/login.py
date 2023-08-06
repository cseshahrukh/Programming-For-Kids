from app import *


@ app.route('/register/', methods=['GET', 'POST'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = form.password.data
        #hashed_password = bcrypt.generate_password_hash(form.password.data)
        #hashed_password = hashed_password.decode("utf-8", "ignore")
        
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template('register.html', form=form)


@app.route('/login/', methods=['GET', 'POST'])
def login():
    print('Inside login function')
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            #if bcrypt.check_password_hash(user.password, form.password.data):
            if user.password == form.password.data:
                login_user(user)
                return redirect(url_for('dashboard'))
    return render_template('login.html', form=form)


@app.route('/dashboard/', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('dashboard.html')


@app.route('/logout/', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))