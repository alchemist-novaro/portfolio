import { useQuery } from "@tanstack/react-query";
import { Lock, Zap } from "lucide-react";
import type { DemoPacket } from "@/types/packets";
import type { DemoItem, DemoConfig } from "@/types/constants";
import { apiRequest } from "@/lib/query-client";
import { useAuth } from "./use-auth";

const DEMOS_KEY = 'demos';

const mockDemos: DemoPacket[] = [
    {
        id: 1,
        title: "AI Chatbot Assistant",
        description: "Interactive conversational AI with natural language understanding and context awareness.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        url: "https://huggingface.co/spaces/demo/chatbot",
        tier: "free",
        category: "text",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        title: "Image Generation Studio",
        description: "Advanced AI-powered image creation with custom prompts, styles, and artistic controls.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        url: "https://huggingface.co/spaces/demo/image-gen",
        tier: "pro",
        category: "image",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 3,
        title: "ML Training Platform",
        description: "Enterprise-grade machine learning model training and deployment with real-time monitoring.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        url: "https://huggingface.co/spaces/demo/ml-training",
        tier: "pro+",
        category: "3d",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

async function fetchDemos() {
    try {
        const response = await apiRequest("GET", "/demos", {
            useToken: false
        });
        if (response.status === 200) {
            return await response.json();
        }
    }
    catch {
        return mockDemos;
    }
}

export const useDemos = () => {
    const { data: demoPackets, isLoading, error } = useQuery<DemoPacket[]>({
        queryKey: [DEMOS_KEY],
        queryFn: fetchDemos,
        retry: false,
        staleTime: Infinity
    });

    const { user } = useAuth();

    const tierConfig = {
        free: {
            label: "FREE",
            color: "bg-green-500",
            icon: user ? Zap : Lock,
            button_text: user ? "Try Now" : "Login to Access",
            button_variant: user ? "default" : "secondary",
            disabled: !user
        } as DemoConfig,
        pro: {
            label: "PRO",
            color: "bg-yellow-500",
            icon: user?.tier === "pro" || user?.tier === "pro+" ? Zap : Lock,
            button_text: user?.tier === "pro" || user?.tier === "pro+" ? "Try Now" : user ? "Upgrade to Access" : "Login to Access",
            button_variant: user?.tier === "pro" || user?.tier === "pro+" ? "default" : "secondary",
            disabled: user?.tier !== "pro" && user?.tier !== "pro+"
        } as DemoConfig,
        "pro+": {
            label: "PRO+",
            color: "bg-purple-500",
            icon: user?.tier === "pro+" ? Zap : Lock,
            button_text: user?.tier === "pro+" ? "Try Now" : user ? "Upgrade to Access" : "Login to Access",
            button_variant: user?.tier === "pro+" ? "default" : "secondary",
            disabled: user?.tier !== "pro+"
        } as DemoConfig,
    };

    const demos: DemoItem[] | undefined = demoPackets?.map((demo) => ({
        ...demo,
        config: tierConfig[demo.tier as keyof typeof tierConfig]
    }));

    return {
        demos,
        isLoading,
        error
    };
}