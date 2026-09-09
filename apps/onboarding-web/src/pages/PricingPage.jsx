import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "₹799" : "₹999",
      period: isAnnual ? "/month" : "/month",
      annualPrice: "₹9,588/year",
      description: "Perfect for independent pharmacies getting started with digital operations.",
      features: [
        { name: "Monthly Transactions", included: "Up to 500" },
        { name: "Inventory Management", included: "Basic" },
        { name: "Prescription Tracking", included: "✓" },
        { name: "Support", included: "Email" },
        { name: "Mobile App Access", included: "✓" },
        { name: "User Accounts", included: "1 user" },
        { name: "AI Forecasting", included: "—" },
        { name: "Analytics Dashboard", included: "—" },
      ],
      buttonText: "Start Free Trial",
      buttonClass: "border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:bg-teal-50",
      popular: false,
      highlight: false,
      savings: false,
      icon: "storefront"
    },
    {
      name: "Professional",
      price: isAnnual ? "₹1,999" : "₹2,499",
      period: isAnnual ? "/month" : "/month",
      annualPrice: "₹23,988/year",
      description: "Ideal for growing pharmacies with advanced needs and higher volumes.",
      features: [
        { name: "Monthly Transactions", included: "Up to 5,000" },
        { name: "Inventory Management", included: "Advanced AI" },
        { name: "Prescription Tracking", included: "✓" },
        { name: "Support", included: "Priority" },
        { name: "Mobile App Access", included: "✓" },
        { name: "User Accounts", included: "Up to 5" },
        { name: "AI Forecasting", included: "✓" },
        { name: "Analytics Dashboard", included: "Advanced" },
      ],
      buttonText: "Start Free Trial",
      buttonClass: "bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:shadow-xl hover:-translate-y-0.5",
      popular: true,
      highlight: true,
      savings: isAnnual ? "Save ₹6,000/year" : false,
      icon: "rocket_launch"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      annualPrice: "Contact for pricing",
      description: "For large pharmacy chains, distributors, and healthcare networks.",
      features: [
        { name: "Monthly Transactions", included: "Unlimited" },
        { name: "Inventory Management", included: "Custom AI" },
        { name: "Prescription Tracking", included: "✓" },
        { name: "Support", included: "24/7 Dedicated" },
        { name: "Mobile App Access", included: "✓" },
        { name: "User Accounts", included: "Unlimited" },
        { name: "AI Forecasting", included: "Custom" },
        { name: "Analytics Dashboard", included: "Enterprise" },
      ],
      buttonText: "Contact Sales",
      buttonClass: "border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:bg-teal-50",
      popular: false,
      highlight: false,
      savings: false,
      icon: "hub"
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. No penalties or hidden fees."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for any of our plans. You only pay for what you use. We believe in transparent pricing with no surprises."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), UPI, net banking, and bank transfers. All payments are processed securely."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to start. Experience the full features before committing."
    },
    {
      question: "Is there a contract or minimum commitment?",
      answer: "No long-term contracts. You can cancel anytime. For annual plans, we offer a pro-rata refund if you cancel before the year ends."
    },
    {
      question: "Can I add more users to my plan?",
      answer: "Yes, you can add additional users to any plan. Enterprise plans include unlimited users. Contact our sales team for custom user pricing."
    }
  ];

  const getFeatureValue = (featureName, planFeatures) => {
    const feature = planFeatures.find(f => f.name === featureName);
    return feature ? feature.included : "—";
  };

  const featureCategories = [
    "Monthly Transactions",
    "Inventory Management",
    "Prescription Tracking",
    "Support",
    "Mobile App Access",
    "User Accounts",
    "AI Forecasting",
    "Analytics Dashboard"
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | MEDORAX - Digital Pharmacy Infrastructure</title>
        <meta name="description" content="Choose the right pricing plan for your pharmacy business. Flexible plans for independent pharmacies, chains, and distributors." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <section className="bg-[#F8FAFC] text-[#131b2e] pt-20 sm:pt-24 md:pt-28 overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/2 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-100/80 to-blue-100/80 border border-teal-500/20 text-teal-700 mb-4 sm:mb-6 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]">sell</span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Simple & Transparent Pricing</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight">
              Choose the Plan That
              <span className="block bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent mt-1 sm:mt-2">
                Fits Your Pharmacy
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required. Cancel anytime.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <span className={`text-sm sm:text-base transition-colors ${!isAnnual ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 sm:w-16 h-8 sm:h-9 rounded-full transition-all duration-300 ${
                  isAnnual ? 'bg-gradient-to-r from-teal-500 to-blue-600' : 'bg-slate-300'
                }`}
                aria-label="Toggle billing period"
              >
                <div 
                  className={`absolute top-1 w-6 sm:w-7 h-6 sm:h-7 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    isAnnual ? 'left-[calc(100%-28px)] sm:left-[calc(100%-32px)]' : 'left-1'
                  }`}
                ></div>
              </button>
              <span className={`text-sm sm:text-base transition-colors flex items-center gap-2 ${
                isAnnual ? 'text-slate-900 font-bold' : 'text-slate-500'
              }`}>
                Annual
                <span className="text-[10px] sm:text-xs bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-2.5 py-0.5 rounded-full font-bold border border-teal-500/20">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {plans.map((plan, index) => (
                <div 
                  key={plan.name}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl border p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl flex flex-col ${
                    plan.highlight 
                      ? 'border-teal-500 shadow-xl shadow-teal-500/10 scale-100 md:scale-105 z-10 ring-2 ring-teal-500/20' 
                      : 'border-slate-200 hover:border-teal-300 hover:shadow-xl'
                  } ${index === 0 ? 'md:mt-4' : ''} ${index === 2 ? 'md:mt-4' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-teal-500/30 animate-pulse">
                      🚀 Most Popular
                    </div>
                  )}
                  
                  {plan.savings && (
                    <div className="absolute -top-3 right-4 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30">
                      {plan.savings}
                    </div>
                  )}
                  
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-2xl sm:text-3xl text-teal-600">
                        {plan.icon}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm sm:text-base text-slate-500">{plan.period}</span>
                      )}
                    </div>
                    {plan.annualPrice && (
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{plan.annualPrice}</p>
                    )}
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xs mx-auto">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between gap-3">
                        <span className="text-xs sm:text-sm text-slate-600">{feature.name}</span>
                        <span className={`text-xs sm:text-sm font-medium ${
                          feature.included === "—" ? 'text-slate-300' : 
                          feature.included.includes("✓") ? 'text-teal-600' : 
                          'text-slate-700'
                        }`}>
                          {feature.included}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to={plan.name === "Enterprise" ? "/contact" : "/onboarding"}
                    className={`block w-full text-center py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 active:scale-95 ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </Link>
                  
                  {plan.name !== "Enterprise" && (
                    <p className="text-center text-[10px] sm:text-xs text-slate-400 mt-3">
                      14-day free trial • No credit card required
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="text-center mt-12 sm:mt-16">
              <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-6">
                Trusted by 10,000+ pharmacies across India
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 items-center opacity-40">
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-400">PHARMA+</span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-400">MediConnect</span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-400">HealthBridge</span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-400">CareNet</span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-400">PharmaHub</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 sm:py-16 md:py-20 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-100/80 to-blue-100/80 border border-teal-500/20 text-teal-700 mb-4">
                <span className="material-symbols-outlined text-[16px]">compare</span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Compare Features</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Choose the Right Plan for You</h2>
              <p className="text-sm sm:text-base text-slate-600">See exactly what each plan includes</p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-50/80 to-blue-50/80 border-b-2 border-slate-200">
                    <th className="p-4 sm:p-6 text-left text-xs sm:text-sm font-bold text-slate-700">Feature</th>
                    <th className="p-4 sm:p-6 text-center text-xs sm:text-sm font-bold text-slate-600">Starter</th>
                    <th className="p-4 sm:p-6 text-center text-xs sm:text-sm font-bold text-teal-600 bg-gradient-to-r from-teal-100/30 to-blue-100/30">
                      Professional
                    </th>
                    <th className="p-4 sm:p-6 text-center text-xs sm:text-sm font-bold text-slate-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureCategories.map((feature, idx) => {
                    const starter = plans[0].features.find(f => f.name === feature);
                    const professional = plans[1].features.find(f => f.name === feature);
                    const enterprise = plans[2].features.find(f => f.name === feature);
                    
                    return (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-slate-50 transition-colors`}>
                        <td className="p-4 sm:p-6 text-xs sm:text-sm font-medium text-slate-700">{feature}</td>
                        <td className="p-4 sm:p-6 text-center text-xs sm:text-sm">
                          {starter && starter.included === "—" ? (
                            <span className="text-slate-300">—</span>
                          ) : (
                            <span className="text-slate-600">{starter ? starter.included : "—"}</span>
                          )}
                        </td>
                        <td className="p-4 sm:p-6 text-center text-xs sm:text-sm font-medium text-teal-600">
                          {professional ? professional.included : "—"}
                        </td>
                        <td className="p-4 sm:p-6 text-center text-xs sm:text-sm font-medium text-blue-600">
                          {enterprise ? enterprise.included : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-100/80 to-blue-100/80 border border-teal-500/20 text-teal-700 mb-4">
                <span className="material-symbols-outlined text-[16px]">help</span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Got Questions?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base text-slate-600">Everything you need to know about our pricing</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-teal-600 text-base sm:text-lg">question_mark</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 group-hover:text-teal-600 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, #ffffff 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase border border-white/20">
                  <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                  Start Your Journey Today
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to Transform Your Pharmacy?
                </h2>
                
                <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
                  Join 10,000+ pharmacies already transforming their operations with MEDORAX.
                  <span className="block text-sm mt-2 font-medium">14-day free trial • No credit card required</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                  <Link
                    to="/onboarding"
                    className="bg-white text-teal-600 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">play_arrow</span>
                    Start 14-Day Free Trial
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">contact_support</span>
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}