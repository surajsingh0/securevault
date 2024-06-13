from cryptography.fernet import Fernet

key = 'ngCFWYRiWMkFDj0ZBIZQ7ZQg4KrlonggFSCWooGt12E='
cipher_suite = Fernet(key)

def encrypt_password(password):
    return cipher_suite.encrypt(password.encode()).decode()

def decrypt_password(encrypted_password):
    try:
        return cipher_suite.decrypt(encrypted_password.encode()).decode()
    except:
        return encrypted_password