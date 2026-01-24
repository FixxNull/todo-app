from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from app.models.user_model import User
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.schemas.auth_schema import TokenPayload
from pydantic import ValidationError
from app.services.user_service import UserService


reusable_oauth = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login/", scheme_name="JWT")

async def get_current_user(token: str = Depends(reusable_oauth)) -> User:
    # This function would typically decode the JWT token and retrieve the user
    # For brevity, the implementation is omitted
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Token has expired", 
                headers={"WWW-Authenticate": "Bearer"}
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Could not validate credentials", 
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    user = await UserService.get_user_by_id(token_data.sub)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Could not find user"
        )

    return user
