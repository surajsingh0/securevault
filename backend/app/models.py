from app import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Password(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    website = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255))
    notes = db.Column(db.Text)

    def __repr__(self):
        return f"Password(website='{self.website}', password='{self.password}', category='{self.category}', notes='{self.notes}')"
