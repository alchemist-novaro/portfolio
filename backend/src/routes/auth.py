from fastapi import Request, APIRouter, Depends, HTTPException, Request

from src.services import UserService, google_redirect, get_user_data_from_google_token, get_country_from_ip
from src.schemas import UserLogin, UserData, UserBase, Token, UserPassword, UserCreate
from src.dependencies import get_user_service, get_current_user, get_verifying_user

auth_router = APIRouter()

@auth_router.post("/register")
async def register(
    user_data: UserCreate,
    request: Request,
    user_service: UserService = Depends(get_user_service)
):
    try:
        ip = request.headers.get("X-Forwarded-For")
        if ip:
            ip = ip.split(",")[0].strip()
        country = get_country_from_ip(ip)
        await user_service.send_verification_link_for_create(user_data, country)
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
        await user_service.send_verification_link_for_repwd(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@auth_router.post("/verify", response_model=Token)
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

@auth_router.get("/user")
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

@auth_router.get("/google/redirect")
async def get_google_redirect(
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
        ip = request.headers.get("X-Forwarded-For")
        if ip:
            ip = ip.split(",")[0].strip()
        country = get_country_from_ip(ip)
        user_data = await get_user_data_from_google_token(request)
        token = await user_service.get_token_by_email(
            UserCreate(
                email=user_data["email"], 
                password="", 
                first_name=user_data["given_name"], 
                last_name=user_data["family_name"],
                avatar=user_data["picture"]
            ),
            country
        )
        return token
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )