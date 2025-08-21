import { useQuery } from "@tanstack/react-query";
import { type PortfolioData } from "@/types/packets";
import { apiRequest } from "@/lib/query-client";

const PORTFOLIO_DATA_KEY = 'portfolio-data';

async function fetchPortfolioData() {
  try {
    const domain = window.location.host.split(":")[0];
    const response = await apiRequest("GET", `/data?domain=${domain}`, {
      useToken: false
    });
    if (response.status === 200) {
      return await response.json();
    }
  }
  catch {
    return {
      domain: "john-doe.portfolio-app.online",
      icon: "https://pic.onlinewebfonts.com/thumbnails/icons_340575.svg",
      first_name: "John",
      last_name: "Doe",
      email: "john-doe@example.com",
      location: "California, US",
      avatar: "https://i.ibb.co/zHTsJZyF/photo-2025-08-05-07-52-15.jpg",
      phone: "+1 201 123 1234",
      github: "https://www.github.com/john-doe",
      linkedin: "https://www.linkedin.com/in/john-doe-123a45b6c7",
      twitter: "https://x.com/JohnDoe",
      instagram: "https://www.instagram.com/john-doe",
      facebook: "https://www.facebook.com/john-doe"
    };
  }
}

export const usePortfolioData = () => {
  const { data: portfolioData, isLoading, error } = useQuery<PortfolioData>({
    queryKey: [PORTFOLIO_DATA_KEY],
    queryFn: fetchPortfolioData,
    retry: false,
    staleTime: Infinity
  });

  return {
    portfolioData,
    isLoading,
    error
  };
}