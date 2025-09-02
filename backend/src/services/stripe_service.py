import stripe
from src.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

async def get_stripe_customer_id(email: str) -> str:
    customers = await stripe.Customer.list_async(email=email, limit=1)
    if customers.data:
        return customers.data[0].id
    else:
        customer = await stripe.Customer.create_async(email=email)
        return customer.id

async def get_stripe_client_secret(stripe_customer_id: str) -> str:
    setup_intent = await stripe.SetupIntent.create_async(
        customer=stripe_customer_id,
        payment_method_types=['card'],
        usage='on_session'
    )
    return setup_intent.client_secret

async def get_stripe_payment_method(payment_method_id: str):
    payment_method = await stripe.PaymentMethod.retrieve_async(payment_method_id)
    return payment_method