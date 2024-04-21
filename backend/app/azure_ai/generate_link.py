# In future use special library for encryption and decryption!

def encrypt_number(number):
    number = number * 171 + 348
    return number


def decrypt_number(number):
    number = (number - 348) / 171
    return number


def get_test_link(token):
    # Super entcryption
    return "http://localhost:5173/test/" + str(encrypt_number(token))


def open_token(token):
    return decrypt_number(token)


