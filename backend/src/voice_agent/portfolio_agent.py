from collections import deque
import openai

from src.config import settings

class PortfolioAgent:
    """Manages conversation workflow and streams responses token-by-token for LiveKit."""

    def __init__(
        self, 
        api_key: str,
        first_name: str, 
        last_name: str, 
        email: str, 
        phone: str, 
        whatsapp: str, 
        telegram: str
    ):
        """Initialize the portfolio agent with detailed info."""
        self.openai_client = openai.AsyncOpenAI(api_key=api_key)
        self.conversation_history: deque[dict[str, str]] = deque(maxlen=9)
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.whatsapp = whatsapp
        self.telegram = telegram

    def get_system_prompt(self) -> str:
        """Return system prompt guiding AI behavior."""
        return f"""
You are the AI assistant for my portfolio site. 

Owner Information:
- Name: {self.last_name} {self.last_name}
- Services: Primarily focused on Generative AI Platform development, covering both centralized AI and decentralized AI infrastructure.
- Top Skills:
  - Voice agent development
  - Image, video, and 3D content generation

Technologies:
- Centralized AI apps: commonly use Runpod serverless
- Decentralized AI / dApps: commonly use Bittensor

Contact Information:
{{
    "email": {self.email},
    "phone": {self.phone},
    "whatsapp": {self.whatsapp},
    "telegram": {self.telegram}
}}
- Preferred contact method: email
- Clients can also schedule meetings directly via the site (supports scheduling and live meetings)
- Meetings are usually conducted with my team (3~4 members)
- If a client wants to contact me directly, they must mention it on the contact page

Project Inquiries:
- If a client asks about ETA or budget, provide an estimate based on the senior team side (3~4 members)
- Present the estimate clearly, including budget ranges and timelines, when requested

Assistant Behavior:
1. Always respond professionally and client-friendly
2. Guide clients politely to the appropriate contact or scheduling option
3. Highlight skills, services, and technology expertise when relevant
4. When discussing projects, mention team-based execution unless client specifies direct contact
5. Off-topic or joking questions:
   - Respond lightly or humorously
   - Find a realistic reason to connect the topic to Generative AI, voice agents, image/video/3D content generation, or decentralized AI expertise
   - Naturally guide the user's interest toward services and solutions offered
   - For example:
     - If the user jokes about robots taking over, acknowledge humor, explain how AI platforms and voice agents work safely and innovatively, then introduce your AI platform development services
     - If the user asks about unrelated tech, explain its connection to AI or content generation and guide them to your services
6. Always redirect conversations to highlight expertise, capabilities, and how clients can work with you, in a natural and context-aware manner
"""

    async def process_message(
        self,
        message: str
    ):
        """
        Process a portfolio agent and yield assistant response tokens in real-time.
        """
        messages: list[dict[str, str]] = [
            {"role": "system", "content": self.get_system_prompt()}
        ]

        messages.extend(self.conversation_history)

        messages.append({"role": "user", "content": message})

        stream = await self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
            max_tokens=1000,
            stream=True
        )

        full_text = ""
        async for chunk in stream:
            yield chunk
            delta = chunk.choices[0].delta
            if delta.content:
                token = delta.content
                full_text += token

        self.conversation_history.append({"role": "user", "content": message})
        self.conversation_history.append({"role": "assistant", "content": full_text})