import { useCallback, useEffect, useState } from 'react';
import { decodeJwt } from 'jose';
import { useMemo } from 'react';
import {
  type ReceivedChatMessage,
  type TextStreamData,
  useChat,
  useRoomContext,
  useTranscriptions,
} from '@livekit/components-react';
import { transcriptionToChatMessage } from '@/lib/utils';
import { apiRequest } from '@/lib/query-client';
import { type AssistantDetails } from '@/types/constants';

const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;

export function useAssistantDetails() {
  const [assistantDetails, setAssistantDetails] = useState<AssistantDetails | null>(null);

  const fetchAssistantDetails = useCallback(async () => {
    setAssistantDetails(null);

    let data: AssistantDetails;
    try {
      const res = await apiRequest("GET", `/portfolio-agent/token?identity=user`);
      data = await res.json();
    } catch (error) {
      console.error('Error fetching connection details:', error);
      throw new Error('Error fetching connection details!');
    }

    setAssistantDetails(data);
    return data;
  }, []);

  useEffect(() => {
    fetchAssistantDetails();
  }, [fetchAssistantDetails]);

  const isAssistantDetailsExpired = useCallback(() => {
    const token = assistantDetails?.token;
    if (!token) {
      return true;
    }

    const jwtPayload = decodeJwt(token);
    if (!jwtPayload.exp) {
      return true;
    }
    const expiresAt = new Date(jwtPayload.exp * 1000 - ONE_MINUTE_IN_MILLISECONDS);

    const now = new Date();
    return expiresAt <= now;
  }, [assistantDetails?.token]);

  const existingOrRefreshAssistantDetails = useCallback(async () => {
    if (isAssistantDetailsExpired() || !assistantDetails) {
      return fetchAssistantDetails();
    } else {
      return assistantDetails;
    }
  }, [assistantDetails, fetchAssistantDetails, isAssistantDetailsExpired]);

  return {
    assistantDetails,
    refreshAssistantDetails: fetchAssistantDetails,
    existingOrRefreshAssistantDetails,
  };
}

export function useChatAndTranscription() {
  const transcriptions: TextStreamData[] = useTranscriptions();
  const chat = useChat();
  const room = useRoomContext();

  const mergedTranscriptions = useMemo(() => {
    const merged: Array<ReceivedChatMessage> = [
      ...transcriptions.map((transcription) => transcriptionToChatMessage(transcription, room)),
      ...chat.chatMessages,
    ];
    return merged.sort((a, b) => a.timestamp - b.timestamp);
  }, [transcriptions, chat.chatMessages, room]);

  return { messages: mergedTranscriptions, send: chat.send };
}
