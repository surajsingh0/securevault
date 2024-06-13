from flask import jsonify, request
from app import app, db, bcrypt
from app.models import Password, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .password_encryption import encrypt_password, decrypt_password 

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/passwords', methods=['POST'])
@jwt_required()
def add_password():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    encrypted_password = encrypt_password(data['password'])
    new_password = Password(user_id=user.id, website=data['website'], password=encrypted_password, category=data.get('category'), notes=data.get('notes'))
    db.session.add(new_password)
    db.session.commit()

    response_data = {
        'message': 'Password added successfully',
        'password': {
            'id': new_password.id,
            'user_id': new_password.user_id,
            'website': new_password.website,
            'password': decrypt_password(new_password.password),
            'category': new_password.category,
            'notes': new_password.notes
        }
    }
    return jsonify(response_data), 201

@app.route('/api/passwords', methods=['GET'])
@jwt_required()
def get_passwords():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    passwords = Password.query.filter_by(user_id=user.id).all()
    passwords_list = [{'id': p.id, 'website': p.website, 'password': decrypt_password(p.password), 'category': p.category, 'notes': p.notes} for p in passwords]
    return jsonify(passwords_list), 200

@app.route('/api/passwords/<int:password_id>', methods=['DELETE'])
@jwt_required()
def delete_password(password_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    password = Password.query.filter_by(id=password_id, user_id=user.id).first()

    if not password:
        return jsonify({'message': 'Password not found'}), 404

    db.session.delete(password)
    db.session.commit()

    return jsonify({'message': 'Password deleted successfully'}), 200

@app.route('/api/passwords/<int:password_id>', methods=['PUT'])
@jwt_required()
def update_password(password_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    password = Password.query.filter_by(id=password_id, user_id=user.id).first()

    if not password:
        return jsonify({'message': 'Password not found'}), 404

    password.website = data.get('website', password.website)
    password.password = data.get('password', password.password)
    password.category = data.get('category', password.category)
    password.notes = data.get('notes', password.notes)
    
    db.session.commit()

    response_data = {
        'message': 'Password updated successfully',
        'password': {
            'id': password.id,
            'user_id': password.user_id,
            'website': password.website,
            'password': password.password,
            'category': password.category,
            'notes': password.notes
        }
    }
    return jsonify(response_data), 200