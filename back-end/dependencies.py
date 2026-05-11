from fastapi import Header
from security import verify_token

def get_current_user_id(authorization: str = Header()) -> int:
    """
    Retrieves user_id from the authorization header
    """
    token = authorization.removeprefix("Bearer ")
    payload = verify_token(token)
    return int(payload["sub"])