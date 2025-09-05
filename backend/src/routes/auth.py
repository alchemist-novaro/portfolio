from fastapi import Request, APIRouter, Depends, HTTPException

from src.services import UserService, google_redirect, get_user_data_from_google_token
from src.schemas import UserLogin, UserData, UserBase, Token, UserPassword
from src.dependencies import get_user_service, get_current_user, get_verifying_user

auth_router = APIRouter()

@auth_router.post("/register")
async def register(
    user_data: UserBase,
    user_service: UserService = Depends(get_user_service)
):
    try:
        await user_service.send_verification_link(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.post("/repwd/email")
async def send_reset_password_email(
    user_data: UserBase,
    user_service: UserService = Depends(get_user_service)
):
    try:
        await user_service.send_verification_link(user_data, for_create=False)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.post("/verify", response_model=Token, status_code=201)
async def verify_email(
    user_service: UserService = Depends(get_user_service),
    user: UserData = Depends(get_verifying_user)
):
    try:
        return await user_service.verify_email(user)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )
    
@auth_router.post("/repwd")
async def reset_password(
    password: UserPassword,
    user_service: UserService = Depends(get_user_service),
    user: UserData = Depends(get_verifying_user)
):
    try:
        await user_service.reset_password(UserLogin(email=user.email, password=password.password))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.get("/")
async def get_user(
    user: UserData = Depends(get_current_user)
):
    return user

@auth_router.post("/login", response_model=Token)
async def login(
    user_data: UserLogin, 
    user_service: UserService = Depends(get_user_service)
):
    try:
        return await user_service.login_user(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.get("/google")
async def google_redirect(
    request: Request
):
    try:
        return await google_redirect(request)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.get("/google", response_model=Token)
async def get_user_by_google(
    request: Request,
    user_service: UserService = Depends(get_user_service)
):
    try:
        user_data = await get_user_data_from_google_token(request)
        token = await user_service.get_token_by_email(UserBase(email=user_data["email"]))
        return token
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )