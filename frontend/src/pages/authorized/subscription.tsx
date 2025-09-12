import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    popular: false,
    features: [
      { name: '10 Demo Tries/Month', included: true },
      { name: 'Basic Portfolio Access', included: true },
      { name: 'Community Support', included: true },
      { name: 'Advanced Features', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Custom Projects', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals and small teams',
    popular: true,
    features: [
      { name: '100 Demo Tries/Month', included: true },
      { name: 'Full Portfolio Access', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Custom Projects', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'White-label Solutions', included: false }
    ]
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    price: '$99',
    period: '/month',
    description: 'For enterprises and advanced users',
    popular: false,
    features: [
      { name: 'Unlimited Demo Access', included: true },
      { name: 'White-label Solutions', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Enterprise Features', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'SLA Guarantee', included: true }
    ]
  }
];

export default function Subscription() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="pricing-title">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="pricing-description">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-2 border-primary shadow-lg scale-105' : 'border border-border'} transition-all hover:shadow-xl`}
              data-testid={`pricing-plan-${plan.id}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground" data-testid="most-popular-badge">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold" data-testid={`price-${plan.id}`}>
                    {plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center" 
                      data-testid={`feature-${plan.id}-${index}`}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? '' : 'variant-outline'}`} 
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  data-testid={`button-choose-${plan.id}`}
                >
                  {plan.id === 'free' ? 'Get Started' : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12" data-testid="faq-title">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-6" data-testid="faq-item-1">
              <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div className="border-b border-border pb-6" data-testid="faq-item-2">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            
            <div className="border-b border-border pb-6" data-testid="faq-item-3">
              <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Our Free plan gives you access to basic features. Pro and Pro+ plans come with a 14-day free trial.
              </p>
            </div>
            
            <div className="border-b border-border pb-6" data-testid="faq-item-4">
              <h3 className="text-lg font-semibold mb-2">Do you offer custom enterprise solutions?</h3>
              <p className="text-muted-foreground">
                Yes, we offer custom solutions for large enterprises. Contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4" data-testid="cta-title">Still have questions?</h2>
          <p className="text-muted-foreground mb-8" data-testid="cta-description">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <Button size="lg" data-testid="button-contact-sales">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
