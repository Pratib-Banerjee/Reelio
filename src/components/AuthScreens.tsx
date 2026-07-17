import React, { useState, useEffect } from 'react';
import { INTERESTS_LIST, LANGUAGES_LIST } from '../mockData';
import Logo from './Logo';

interface AuthScreensProps {
  onSuccess: (channelData?: { name: string; handle: string }) => void;
}

type AccountType = 'individual' | 'business';
type RoleType = 'watch' | 'create' | 'both';

export default function AuthScreens({ onSuccess }: AuthScreensProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Basic Form fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Detailed Onboarding State
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [role, setRole] = useState<RoleType>('both');

  // Business-specific fields
  const [companyName, setCompanyName] = useState('');
  const [businessIndustry, setBusinessIndustry] = useState('Technology');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [taxId, setTaxId] = useState('');

  // Individual-specific fields
  const [legalName, setLegalName] = useState('');
  const [username, setUsername] = useState('');

  // Verification States
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);

  const [phoneCountry, setPhoneCountry] = useState('+1');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneTimer, setPhoneTimer] = useState(0);

  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Preference fields
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);

  // Channel Creation Setup
  const [channelName, setChannelName] = useState('');
  const [channelHandle, setChannelHandle] = useState('');

  // Verification countdown timers
  useEffect(() => {
    let interval: any;
    if (emailTimer > 0) {
      interval = setInterval(() => {
        setEmailTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailTimer]);

  useEffect(() => {
    let interval: any;
    if (phoneTimer > 0) {
      interval = setInterval(() => {
        setPhoneTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phoneTimer]);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleLanguageToggle = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate direct login
      onSuccess();
    } else {
      // Initialize onboarding
      setLegalName(name);
      setShowOnboarding(true);
      setOnboardingStep(1);
    }
  };

  // Simulates OTP sending
  const handleSendEmailOtp = () => {
    setEmailOtpSent(true);
    setEmailTimer(59);
    setVerificationError(null);
  };

  const handleVerifyEmail = () => {
    if (emailOtp.length < 4) {
      setVerificationError("Please enter a valid 6-digit code.");
      return;
    }
    // Simulate verification
    setEmailVerified(true);
    setVerificationError(null);
  };

  const handleSendPhoneOtp = () => {
    setPhoneOtpSent(true);
    setPhoneTimer(59);
    setVerificationError(null);
  };

  const handleVerifyPhone = () => {
    if (phoneOtp.length < 4) {
      setVerificationError("Please enter a valid 6-digit SMS code.");
      return;
    }
    // Simulate verification
    setPhoneVerified(true);
    setVerificationError(null);
  };

  const totalSteps = role === 'watch' ? 4 : 5;

  const handleNextOnboarding = () => {
    setVerificationError(null);

    if (onboardingStep === 1) {
      // Step 1: Account Type validation
      if (accountType === 'business') {
        if (!companyName.trim()) {
          setVerificationError("Please enter your registered Business Name.");
          return;
        }
      } else {
        if (!legalName.trim()) {
          setVerificationError("Please enter your Legal Full Name.");
          return;
        }
      }
      setOnboardingStep(2);
    } 
    else if (onboardingStep === 2) {
      // Step 2: Verification step validation
      if (!emailVerified || !phoneVerified) {
        setVerificationError("For compliance and safety, please verify both your email and phone number.");
        return;
      }
      setOnboardingStep(3);
    } 
    else if (onboardingStep === 3) {
      // Step 3: Languages
      setOnboardingStep(4);
    } 
    else if (onboardingStep === 4) {
      // Step 4: Interests
      if (role === 'watch') {
        // Observers finish here
        onSuccess();
      } else {
        setOnboardingStep(5);
        // Pre-populate channel information
        const initialChannelName = accountType === 'business' ? companyName : `${legalName || 'My'} Studio`;
        const initialHandle = accountType === 'business' 
          ? `@${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}` 
          : `@${(legalName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        
        if (!channelName) setChannelName(initialChannelName);
        if (!channelHandle) setChannelHandle(initialHandle);
      }
    } 
    else if (onboardingStep === 5) {
      // Step 5: Channel Workspace setup
      onSuccess({
        name: channelName || (accountType === 'business' ? companyName : `${legalName} Studio`),
        handle: channelHandle.startsWith('@') ? channelHandle : `@${channelHandle}`
      });
    }
  };

  if (showOnboarding) {
    return (
      <div className="bg-[#121212] text-[#E6E1E5] min-h-screen font-sans flex items-center justify-center p-4 md:p-8" id="onboarding-outer-container">
        <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12" id="onboarding-main-card">
          
          {/* LEFT PANEL: Dynamic Onboarding Form (7 cols) */}
          <div className="p-6 sm:p-10 md:col-span-7 flex flex-col justify-between min-h-[580px] space-y-6" id="onboarding-form-side">
            
            <div className="space-y-6">
              {/* Top Row: Brand & Progress Indicator */}
              <div className="flex justify-between items-center pb-4 border-b border-[#322F37]/60">
                <div className="flex items-center gap-2">
                  <Logo size={24} />
                  <span className="font-display font-bold text-sm tracking-wide text-white">Reelio ID</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#CAC4D0]/60">
                    Step {onboardingStep} of {totalSteps}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: totalSteps }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${
                          onboardingStep === idx + 1 
                            ? 'bg-[#9D8CFF] w-6' 
                            : onboardingStep > idx + 1 
                              ? 'bg-[#00D9A3]' 
                              : 'bg-[#322F37]'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 1: Account Type & Role Selection */}
              {onboardingStep === 1 && (
                <div id="onboarding-step-1" className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-xl text-white">Configure your Account Identity</h2>
                    <p className="text-xs text-[#CAC4D0]/70">Choose whether you are managing individual creative projects or representing a formal corporate business entity.</p>
                  </div>

                  {/* Account Type Selector */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <button
                      type="button"
                      onClick={() => setAccountType('individual')}
                      className={`p-4 rounded-2xl text-left border-2 transition relative flex flex-col justify-between h-32 ${
                        accountType === 'individual'
                          ? 'bg-[#332B6B]/40 border-[#9D8CFF] text-white shadow-lg shadow-[#9D8CFF]/10'
                          : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0] hover:border-[#48454E]'
                      }`}
                      id="account-type-individual"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xl">🧑‍💻</span>
                        {accountType === 'individual' && <span className="w-2.5 h-2.5 rounded-full bg-[#9D8CFF]"></span>}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Individual Account</p>
                        <p className="text-[10px] text-[#CAC4D0]/60 leading-tight mt-0.5">Creators, independent artists, and everyday viewers.</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('business')}
                      className={`p-4 rounded-2xl text-left border-2 transition relative flex flex-col justify-between h-32 ${
                        accountType === 'business'
                          ? 'bg-[#332B6B]/40 border-[#9D8CFF] text-white shadow-lg shadow-[#9D8CFF]/10'
                          : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0] hover:border-[#48454E]'
                      }`}
                      id="account-type-business"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xl">🏢</span>
                        {accountType === 'business' && <span className="w-2.5 h-2.5 rounded-full bg-[#9D8CFF]"></span>}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Business Entity</p>
                        <p className="text-[10px] text-[#CAC4D0]/60 leading-tight mt-0.5">Registered brands, media networks, and marketing agencies.</p>
                      </div>
                    </button>
                  </div>

                  {/* Purpose / Role selector */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-semibold text-[#CAC4D0]">Your Role Objective</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['watch', 'create', 'both'] as RoleType[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition ${
                            role === r
                              ? 'bg-[#332B6B] border-[#9D8CFF] text-[#9D8CFF]'
                              : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0] hover:border-[#48454E]'
                          }`}
                        >
                          {r === 'watch' ? '👁️ Viewer Only' : r === 'create' ? '🎥 Creator Only' : '⚡ Both (Hybrid)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conditional inputs */}
                  <div className="pt-2">
                    {accountType === 'business' ? (
                      <div className="space-y-3" id="business-additional-inputs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Company Name</label>
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Acme Media Corp"
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Industry Segment</label>
                            <select
                              value={businessIndustry}
                              onChange={(e) => setBusinessIndustry(e.target.value)}
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            >
                              <option value="Technology">Technology & SaaS</option>
                              <option value="Media">Media Production</option>
                              <option value="Agency">Digital Agency</option>
                              <option value="Education">Education & E-learning</option>
                              <option value="Food & Beverage">Food & Gastronomy</option>
                              <option value="Retail">Retail & E-commerce</option>
                              <option value="Lifestyle">Lifestyle & Fashion</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Website URL (Optional)</label>
                            <input
                              type="text"
                              value={companyWebsite}
                              onChange={(e) => setCompanyWebsite(e.target.value)}
                              placeholder="www.acmemedia.com"
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Tax ID / EIN (Optional)</label>
                            <input
                              type="text"
                              value={taxId}
                              onChange={(e) => setTaxId(e.target.value)}
                              placeholder="XX-XXXXXXX"
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3" id="individual-additional-inputs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Legal Full Name</label>
                            <input
                              type="text"
                              required
                              value={legalName}
                              onChange={(e) => setLegalName(e.target.value)}
                              placeholder="Marcus Aurelius"
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-[#CAC4D0] mb-1">Preferred Username</label>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="e.g. marcus_audits"
                              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Detailed Email & Phone Verification */}
              {onboardingStep === 2 && (
                <div id="onboarding-step-2" className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#00D9A3]">
                      <span className="text-xs">🔒</span>
                      <span className="text-[10px] font-mono tracking-wider uppercase font-bold">Encrypted 2FA Validation</span>
                    </div>
                    <h2 className="font-display font-bold text-xl text-white">Trust & Security Verification</h2>
                    <p className="text-xs text-[#CAC4D0]/70">
                      Reelio mandates standard two-way authentication to prevent bot farms, guard creator wallets, and authenticate real business users.
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    {/* Part A: Email Verification Box */}
                    <div className="bg-[#211F26] border border-[#322F37] rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-base">📧</span>
                          <span className="text-xs font-bold text-white">Email Verification</span>
                        </div>
                        {emailVerified ? (
                          <span className="text-[10px] font-bold text-[#00D9A3] flex items-center gap-1 bg-[#00D9A3]/10 px-2.5 py-0.5 rounded-full">
                            ✓ Verified Secure
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                            Pending Verification
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-8">
                          <input
                            type="email"
                            disabled={emailVerified}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@domain.com"
                            className="w-full bg-[#1D1B20] border border-[#48454E] disabled:opacity-50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                          />
                        </div>
                        <div className="col-span-4">
                          <button
                            type="button"
                            disabled={emailVerified || !email}
                            onClick={handleSendEmailOtp}
                            className="w-full py-2 rounded-xl text-center text-[10px] font-bold bg-[#9D8CFF] text-[#1B0064] disabled:opacity-40 transition"
                          >
                            {emailTimer > 0 ? `Resend (${emailTimer}s)` : emailOtpSent ? 'Resend' : 'Send Code'}
                          </button>
                        </div>
                      </div>

                      {emailOtpSent && !emailVerified && (
                        <div className="pt-2 border-t border-[#322F37]/50 flex gap-2 items-center">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="6-Digit OTP Code"
                            value={emailOtp}
                            onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                            className="bg-[#1D1B20] border border-[#48454E] rounded-xl px-3 py-1.5 text-xs text-center font-mono w-32 text-white focus:outline-none focus:border-[#9D8CFF]"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyEmail}
                            className="bg-[#00D9A3] text-[#1B0064] px-4 py-1.5 rounded-xl text-xs font-bold hover:opacity-90"
                          >
                            Verify Code
                          </button>
                          <span className="text-[10px] text-[#CAC4D0]/50 font-mono italic">Try "123456"</span>
                        </div>
                      )}
                    </div>

                    {/* Part B: Phone Verification Box */}
                    <div className="bg-[#211F26] border border-[#322F37] rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-base">📱</span>
                          <span className="text-xs font-bold text-white">SMS Phone Validation</span>
                        </div>
                        {phoneVerified ? (
                          <span className="text-[10px] font-bold text-[#00D9A3] flex items-center gap-1 bg-[#00D9A3]/10 px-2.5 py-0.5 rounded-full">
                            ✓ Verified Secure
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                            Pending SMS 2FA
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-3">
                          <select
                            disabled={phoneVerified}
                            value={phoneCountry}
                            onChange={(e) => setPhoneCountry(e.target.value)}
                            className="w-full bg-[#1D1B20] border border-[#48454E] rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+81">🇯🇵 +81</option>
                            <option value="+49">🇩🇪 +49</option>
                          </select>
                        </div>
                        <div className="col-span-5">
                          <input
                            type="tel"
                            disabled={phoneVerified}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="555-0199"
                            className="w-full bg-[#1D1B20] border border-[#48454E] disabled:opacity-50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                          />
                        </div>
                        <div className="col-span-4">
                          <button
                            type="button"
                            disabled={phoneVerified || !phone}
                            onClick={handleSendPhoneOtp}
                            className="w-full py-2 rounded-xl text-center text-[10px] font-bold bg-[#9D8CFF] text-[#1B0064] disabled:opacity-40 transition"
                          >
                            {phoneTimer > 0 ? `Resend (${phoneTimer}s)` : phoneOtpSent ? 'Resend' : 'Send SMS'}
                          </button>
                        </div>
                      </div>

                      {phoneOtpSent && !phoneVerified && (
                        <div className="pt-2 border-t border-[#322F37]/50 flex gap-2 items-center">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="6-Digit SMS OTP"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                            className="bg-[#1D1B20] border border-[#48454E] rounded-xl px-3 py-1.5 text-xs text-center font-mono w-32 text-white focus:outline-none focus:border-[#9D8CFF]"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyPhone}
                            className="bg-[#00D9A3] text-[#1B0064] px-4 py-1.5 rounded-xl text-xs font-bold hover:opacity-90"
                          >
                            Verify SMS
                          </button>
                          <span className="text-[10px] text-[#CAC4D0]/50 font-mono italic">Try "654321"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anti-cheat disclaimer */}
                  <p className="text-[10px] text-[#CAC4D0]/50 leading-normal flex gap-1.5 pt-1">
                    <span>🛡️</span>
                    <span>To support testing during sandbox evaluation, you can enter any 6 digit code (e.g. 123456) to successfully verify. Both fields are required to unlock access.</span>
                  </p>
                </div>
              )}

              {/* STEP 3: Content Language Select */}
              {onboardingStep === 3 && (
                <div id="onboarding-step-3" className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-xl text-white">Language Specifications</h2>
                    <p className="text-xs text-[#CAC4D0]/70">Choose the language layers you want your dashboard metrics, audience subtitles, and video feed content configured in.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {LANGUAGES_LIST.map((lang) => {
                      const isActive = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleLanguageToggle(lang)}
                          className={`p-3 rounded-2xl text-left border-2 transition flex items-center justify-between ${
                            isActive
                              ? 'bg-[#332B6B]/40 border-[#9D8CFF] text-white shadow-md'
                              : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0] hover:border-[#48454E]'
                          }`}
                        >
                          <span className="text-xs font-bold">{lang}</span>
                          {isActive ? (
                            <span className="text-xs text-[#9D8CFF]">✓</span>
                          ) : (
                            <span className="text-xs text-[#CAC4D0]/20">+</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Select Interests */}
              {onboardingStep === 4 && (
                <div id="onboarding-step-4" className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-xl text-white">Target Interest Categories</h2>
                    <p className="text-xs text-[#CAC4D0]/70">We map target feed streams using these categories. Selecting three or more ensures healthy initial engagement indices.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1 mb-2">
                    {INTERESTS_LIST.map((interest) => {
                      const isActive = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                            isActive
                              ? 'bg-[#332B6B] text-[#9D8CFF] border-[#9D8CFF]/50 shadow-sm'
                              : 'bg-[#211F26] text-[#CAC4D0] border-[#322F37] hover:border-white'
                          }`}
                        >
                          {isActive ? '⭐️ ' : ''}{interest}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Creator Space Setup */}
              {onboardingStep === 5 && (
                <div id="onboarding-step-5" className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-xl text-white">Brand Channel Workspace</h2>
                    <p className="text-xs text-[#CAC4D0]/70">Create your initial workspace channel to establish content monetization pipelines. You can spawn subsidiary channels later.</p>
                  </div>
                  
                  <div className="space-y-4 pt-1">
                    <div>
                      <label className="block text-xs text-[#CAC4D0] mb-1 font-medium">Channel Brand Name</label>
                      <input
                        type="text"
                        required
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="e.g. Astro Tech Studios"
                        className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#CAC4D0] mb-1 font-medium">Unique Space Handle</label>
                      <input
                        type="text"
                        required
                        value={channelHandle}
                        onChange={(e) => setChannelHandle(e.target.value)}
                        placeholder="e.g. @astrotech_studios"
                        className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Errors Alert */}
              {verificationError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3.5 flex gap-2.5 items-start text-xs text-red-200" id="onboarding-error-box">
                  <span className="text-red-400">⚠️</span>
                  <p className="leading-snug">{verificationError}</p>
                </div>
              )}
            </div>

            {/* Bottom Form Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-[#322F37]/60">
              <button
                type="button"
                onClick={() => {
                  if (onboardingStep === 1) {
                    setShowOnboarding(false);
                  } else {
                    setOnboardingStep(onboardingStep - 1);
                  }
                }}
                className="px-5 py-2.5 rounded-full border border-[#48454E] text-[#CAC4D0] text-xs font-semibold hover:bg-[#211F26] transition"
              >
                {onboardingStep === 1 ? 'Cancel Onboarding' : 'Back'}
              </button>

              <button
                type="button"
                onClick={handleNextOnboarding}
                className="px-6 py-2.5 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-bold hover:opacity-90 transition shadow-lg shadow-[#9D8CFF]/20"
              >
                {onboardingStep === totalSteps ? 'Complete Enrollment' : 'Continue Step'}
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: Trust Impression Center (5 cols) */}
          <div className="bg-[#121214] border-t md:border-t-0 md:border-l border-[#322F37] p-6 sm:p-10 md:col-span-5 flex flex-col justify-between space-y-8 relative" id="onboarding-trust-sidebar">
            
            {/* Pulsing security status */}
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-widest text-[#CAC4D0]/40 uppercase">Security Diagnostics</span>
              <div className="flex items-center gap-1.5 bg-[#00D9A3]/10 border border-[#00D9A3]/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9A3] animate-pulse"></span>
                <span className="text-[9px] font-mono font-bold text-[#00D9A3]">SSL ENCRYPTED</span>
              </div>
            </div>

            {/* Core Trust Core Statements */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-white">Reelio Safe™ Enrollment</h3>
                <p className="text-[11px] text-[#CAC4D0]/60 leading-relaxed">
                  We guarantee decentralized ledger protection and high-fidelity fraud isolation during registration onboarding. Your corporate records, tax IDs, and video ownership stakes remain fully compliant and isolated.
                </p>
              </div>

              {/* Secure Trust Badges */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#211F26] border border-[#322F37] flex items-center justify-center text-xs flex-none">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">SOC2 Type II Certified</h4>
                    <p className="text-[10px] text-[#CAC4D0]/50 mt-0.5">Continuous evaluation and bank-grade infrastructure audit alignment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#211F26] border border-[#322F37] flex items-center justify-center text-xs flex-none">
                    🔑
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">AES-256 Bit Encryption</h4>
                    <p className="text-[10px] text-[#CAC4D0]/50 mt-0.5">End-to-end cryptographic lock on all balance earnings & bank wire records.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#211F26] border border-[#322F37] flex items-center justify-center text-xs flex-none">
                    👥
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">14M+ Verified Stakeholders</h4>
                    <p className="text-[10px] text-[#CAC4D0]/50 mt-0.5">Join a trusted worldwide community of independent creators and global brand agencies.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Widget */}
            <div className="bg-[#1D1B20] border border-[#322F37] rounded-2xl p-4 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-2xl text-[#CAC4D0]/5 font-serif select-none leading-none">“</div>
              <p className="text-[10px] text-[#CAC4D0]/70 italic leading-relaxed">
                "The corporate onboarding is incredibly smooth. SMS dual verification gives our advertising client network peace of mind that Reelio channels are legitimate."
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-[#322F37]/50">
                <div className="w-5 h-5 rounded-full bg-[#9D8CFF] flex-none text-[8px] font-bold text-black flex items-center justify-center">
                  EB
                </div>
                <div>
                  <p className="text-[9px] font-bold text-white leading-none">Elena Bennett</p>
                  <p className="text-[8px] text-[#CAC4D0]/40 font-mono mt-0.5">Top-Tier Creator, 18.9K Subs</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-[#E6E1E5] min-h-screen font-sans flex items-center justify-center p-4" id="auth-container">
      <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-8 w-full max-w-md shadow-xl">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo size={48} withBg={true} className="mb-3" />
          <h1 className="font-display font-bold text-2xl text-white">Welcome to Reelio</h1>
          <p className="text-[#CAC4D0] text-xs mt-1">
            {isLogin ? "Sign in to access your dashboard & feed" : "Create your account to start earning"}
          </p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs text-[#CAC4D0] mb-1.5 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Aurelius"
                className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9D8CFF]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-[#CAC4D0] mb-1.5 font-medium">Email or Phone</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // If phone is requested but user logs in via phone, sync phone as well
                if (/\d{5,}/.test(e.target.value)) {
                  setPhone(e.target.value);
                }
              }}
              placeholder="name@domain.com"
              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9D8CFF]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#CAC4D0] mb-1.5 font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9D8CFF]"
            />
          </div>

          {!isLogin && (
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#48454E] text-[#9D8CFF] focus:ring-[#9D8CFF] bg-[#211F26]"
              />
              <label htmlFor="terms" className="text-xs text-[#CAC4D0] leading-tight select-none">
                I agree to the <a href="#" className="text-[#9D8CFF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#9D8CFF] hover:underline">Community Guidelines</a>.
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-full bg-[#9D8CFF] text-[#1B0064] font-bold text-sm hover:opacity-95 transition"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#322F37]"></div>
          </div>
          <span className="relative bg-[#1D1B20] px-3 text-xs text-[#CAC4D0]/60">Or continue with</span>
        </div>

        {/* Social auths */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSuccess()}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-[#48454E] hover:bg-[#211F26] text-xs font-medium text-white transition"
          >
            <span>Google</span>
          </button>
          <button
            onClick={() => onSuccess()}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-[#48454E] hover:bg-[#211F26] text-xs font-medium text-white transition"
          >
            <span>Apple</span>
          </button>
        </div>

        {/* Mode Swap */}
        <div className="mt-8 text-center text-xs text-[#CAC4D0]">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-[#9D8CFF] font-semibold hover:underline"
              >
                Sign up instead
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-[#9D8CFF] font-semibold hover:underline"
              >
                Sign in instead
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
