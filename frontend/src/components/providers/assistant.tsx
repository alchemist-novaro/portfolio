import { useState, useMemo, useEffect, createContext } from "react";
import { Mic, X, Send, MicOff } from "lucide-react";
import { Room, RoomEvent } from "livekit-client";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAssistantDetails, useChatAndTranscription } from "@/hooks/use-assistant";
import { RoomContext, RoomAudioRenderer, StartAudio, type ReceivedChatMessage } from "@livekit/components-react";
import { Input } from "@/components/ui/input";
import type { VoiceAssistantProps } from "@/types/props";

const VoiceAssistantContext = createContext<null>(null);

function VoiceAssistant({ open, setOpen, room }: VoiceAssistantProps) {
    const [micEnabled, setMicEnabled] = useState(room.localParticipant.isMicrophoneEnabled);
    const [inputText, setInputText] = useState('');
    const { messages, send } = useChatAndTranscription();

    const toggleMic = async () => {
        const newState = !micEnabled;
        await room.localParticipant.setMicrophoneEnabled(newState);
        setMicEnabled(room.localParticipant.isMicrophoneEnabled);
    };

    const handleSendMessage = () => {
        if (inputText.trim()) {
            send(inputText.trim());
            setInputText('');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mb-2 h-[50vh] w-full max-w-xs rounded-lg border bg-background shadow-lg p-4 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-lg">Voice Assistant</span>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>

                        {/* Chat messages */}
                        <ScrollArea className="flex-1 mb-2" autoScrollDown>
                            <div className="flex flex-col gap-2">
                                {messages
                                    .slice()
                                    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                    .map((msg: ReceivedChatMessage, idx: number) => (
                                        <div
                                            key={msg.id || idx}
                                            className={cn(
                                                "p-2 rounded-md max-w-[80%]",
                                                msg.from?.identity?.startsWith("agent-")
                                                    ? "bg-primary text-primary-foreground self-start"
                                                    : "bg-muted text-muted-foreground self-end"
                                            )}
                                        >
                                            <span className="text-sm whitespace-pre-wrap">{msg.message}</span>
                                        </div>
                                    ))}
                            </div>
                        </ScrollArea>

                        {/* Control bar */}
                        <div className="flex items-center gap-2 mt-2">
                            <Button size="icon" variant="outline" onClick={toggleMic}>
                                {micEnabled ? (
                                    <Mic className="h-5 w-5" />
                                ) : (
                                    <MicOff className="h-5 w-5 text-red-500" />
                                )}
                                <span className="sr-only">Toggle Microphone</span>
                            </Button>

                            <Input
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                className="flex-1 resize-none"
                            />

                            <Button size="icon" onClick={handleSendMessage}>
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating mic button */}
            <Button
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
                )}
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? <X className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                <span className="sr-only">Open Voice Assistant</span>
            </Button>
        </div>
    )
}

export default function VoiceAssistantProvider({ children }: { children: React.ReactNode }) {
    const room = useMemo(() => new Room(), []);
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const { refreshAssistantDetails, existingOrRefreshAssistantDetails } = useAssistantDetails();

    useEffect(() => {
        const onDisconnected = () => {
            refreshAssistantDetails();
        };
        const onMediaDevicesError = (error: Error) => {
            toast({
                title: 'Error',
                description: `${error.name}: ${error.message}`,
                variant: "destructive"
            });
        };
        room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
        room.on(RoomEvent.Disconnected, onDisconnected);
        return () => {
            room.off(RoomEvent.Disconnected, onDisconnected);
            room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
        };
    }, [room, existingOrRefreshAssistantDetails]);

    useEffect(() => {
        let aborted = false;
        if (open && room.state === 'disconnected') {
            Promise.all([
                room.localParticipant.setMicrophoneEnabled(true, undefined, { preConnectBuffer: true }),
                existingOrRefreshAssistantDetails().then((connectionDetails) =>
                    room.connect(connectionDetails.server_url, connectionDetails.token)
                ),
            ]).catch((error) => {
                if (aborted) return;
                toast({
                    title: 'Error',
                    description: `${error.name}: ${error.message}`,
                    variant: "destructive"
                });
            });
        } else if (!open && room.state === 'connected') {
            room.disconnect();
        }
        return () => {
            aborted = true;
            room.disconnect();
        };
    }, [room, open]);

    return (
        <VoiceAssistantContext.Provider value={null}>
            <RoomContext.Provider value={room}>
                <RoomAudioRenderer />
                <StartAudio label="Start Audio" />

                {children}

                <VoiceAssistant
                    open={open}
                    setOpen={setOpen}
                    room={room}
                />
            </RoomContext.Provider>
        </VoiceAssistantContext.Provider>
    );
}
