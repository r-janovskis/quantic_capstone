from fastapi import Header, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from security import verify_token


bearer_schema = HTTPBearer()

def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(bearer_schema)) -> int:
    """
    Retrieves user_id from the authorization header
    """
    payload = verify_token(credentials.credentials)
    return int(payload["sub"])