from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"

class UserTier(str, Enum):
    FREE = "free"
    PRO = "pro"
    PRO_PLUS = "pro+"