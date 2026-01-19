class Config():
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class LocalDevelopmentConfig(Config):
    # configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///lmsv2.sqlite3"
    DEBUG = True

    #config for security
    SECRET_KEY = "this-is-a-secretkey" #hash user creds in session
    SECURITY_PASSWORD_HASH = "bcrypt"   #mechanism for hashing pssword
    SECURITY_PASSWORD_SALT = "this-is-s-password-salt"  #it helps in hashing password
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = "Authentication-Token"
