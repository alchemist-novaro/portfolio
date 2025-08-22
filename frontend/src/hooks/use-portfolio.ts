import { useQuery } from "@tanstack/react-query";
import type { PortfolioItem } from "@/types/packets";
import { apiRequest } from "@/lib/query-client";

const PORTFOLIO_KEY = 'portfolios';

const mockPortfolioItems: PortfolioItem[] = [
    {
        id: 1,
        title: "AI Image Recognition System",
        description: "Advanced computer vision system for real-time object detection and classification using TensorFlow and OpenCV.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["Computer Vision", "TensorFlow", "Python"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        title: "NLP Analytics Platform",
        description: "Sentiment analysis and text processing platform for enterprise applications with natural language understanding.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["NLP", "Transformers", "PyTorch"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 3,
        title: "AI Business Intelligence",
        description: "Predictive analytics platform with automated insights generation for data-driven decision making.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["Generative AI", "PyTorch", "React"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    }
];

async function fetchPortfolios() {
  try {
    const response = await apiRequest("GET", "/portfolio", {
      useToken: false
    });
    if (response.status === 200) {
      return await response.json();
    }
  }
  catch {
    return mockPortfolioItems;
  }
}

export const usePortfolio = () => {
  const { data: portfolios, isLoading, error } = useQuery<PortfolioItem[]>({
    queryKey: [PORTFOLIO_KEY],
    queryFn: fetchPortfolios,
    retry: false,
    staleTime: Infinity
  });

  return {
    portfolios,
    isLoading,
    error
  };
}