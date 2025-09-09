import requests

def get_country_from_ip(ip: str):
    try:
        res = requests.get(f"http://ip-api.com/json/{ip}?fields=country")
        return res.json().get("country")
    except Exception:
        return None