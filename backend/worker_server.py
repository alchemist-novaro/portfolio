from livekit.agents import (
    AgentSession,
    Agent,
    RoomInputOptions,
    JobContext,
    cli,
    WorkerOptions
)
from livekit.plugins import (
    deepgram,
    silero,
    noise_cancellation
)
from livekit.plugins.turn_detector.multilingual import MultilingualModel

from src.voice_agent import PortfolioAgentPlugin
from src.config import settings


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(instructions="")


async def entrypoint(ctx: JobContext):
    session = AgentSession(
        stt=deepgram.STT(api_key=settings.DEEPGRAM_API_KEY),
        llm=PortfolioAgentPlugin(),
        tts=deepgram.TTS(api_key=settings.DEEPGRAM_API_KEY),
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await session.generate_reply(instructions="Please say welcome message")


if __name__ == "__main__":
    cli.run_app(WorkerOptions(
        entrypoint_fnc=entrypoint,
        api_key=settings.LIVEKIT_API_KEY,
        api_secret=settings.LIVEKIT_API_SECRET,
        ws_url=settings.LIVEKIT_URL
    ))