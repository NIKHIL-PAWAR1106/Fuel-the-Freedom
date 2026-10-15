import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone, Clock, FileText } from 'lucide-react';

interface ContactPageProps {
  onToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'editorial',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide message details or story pitch.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onToast('Please fix the highlighted form errors.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      onToast('Message logged with the Throttle Culture editorial dispatch.');
      setFormData({
        name: '',
        email: '',
        subject: 'editorial',
        message: '',
      });
      setErrors({});
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl border-b border-[#222222] pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold mb-3">
            <span>Dispatch & Communications</span>
            <span className="text-[#555555]">/</span>
            <span>Worldwide Fleet Inquiries</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight">
            CONTACT & DISPATCH
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#A0A0A0] font-light leading-relaxed">
            Have a breaking motorcycle scoop, press bike delivery, custom bike build submission, or
            advertising partnership inquiry? Send your dispatch directly to our editorial team.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#131313] border border-[#222222] p-6 sm:p-10">
              <h2 className="text-2xl font-display font-bold text-white uppercase mb-2">
                SEND AN EDITORIAL TRANSMISSION
              </h2>
              <p className="text-xs text-[#888888] mb-6">
                Fill in the details below. Our desk reviews incoming pitches every weekday morning.
              </p>

              {submittedData ? (
                <div className="p-6 bg-[#161616] border border-[#10B981]/50 text-left space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2.5 text-[#10B981]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-display font-bold text-base uppercase">
                      Transmission Received
                    </span>
                  </div>
                  <p className="text-xs text-[#CCCCCC] leading-relaxed">
                    Thank you, <strong className="text-white">{submittedData.name}</strong>. Your inquiry regarding{' '}
                    <span className="text-[#FF5A1F] uppercase font-mono">
                      {submittedData.subject}
                    </span>{' '}
                    has been logged with our editorial team at{' '}
                    <span className="text-white">{submittedData.email}</span>.
                  </p>
                  <div className="p-3 bg-[#0E0E0E] border border-[#262626] text-[11px] font-mono text-[#888888]">
                    Note: Form submissions are simulated for preview demonstration. For active press
                    releases and test-bike delivery bookings, use press@throttleculture.magazine.
                  </div>
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-xs font-bold text-[#FF5A1F] uppercase tracking-wider transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full bg-[#181818] border ${
                        errors.name ? 'border-[#EF4444]' : 'border-[#2D2D2D]'
                      } px-4 py-3 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#FF5A1F] transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="rider@example.com"
                      className={`w-full bg-[#181818] border ${
                        errors.email ? 'border-[#EF4444]' : 'border-[#2D2D2D]'
                      } px-4 py-3 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#FF5A1F] transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5 font-semibold">
                      Subject Department *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2D2D2D] px-4 py-3 text-xs sm:text-sm text-[#F5F5F5] focus:outline-none focus:border-[#FF5A1F] transition-colors cursor-pointer"
                    >
                      <option value="editorial">Editorial Pitch or Story Submission</option>
                      <option value="press-fleet">Manufacturer Press Fleet & Test Bike Loan</option>
                      <option value="advertising">Commercial Sponsorship & Brand Partnership</option>
                      <option value="custom-build">Feature My Custom Motorcycle Build</option>
                      <option value="general">General Question or Rider Feedback</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5 font-semibold">
                      Message / Pitch Details *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Outline your story pitch, bike specs, or collaboration goals..."
                      className={`w-full bg-[#181818] border ${
                        errors.message ? 'border-[#EF4444]' : 'border-[#2D2D2D]'
                      } p-4 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#FF5A1F] transition-colors`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FF5A1F] hover:bg-[#E04812] text-black font-display font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}</span>
                  </button>

                  <p className="text-[11px] text-[#666666] text-center font-mono">
                    Protected by reCAPTCHA & Throttle Culture Editorial Charter.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Desk Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Editorial Desk Info */}
            <div className="bg-[#131313] border border-[#222222] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-bold">
                HEADQUARTERS & TEST WORKSHOP
              </h3>
              <div className="space-y-3 text-xs text-[#A0A0A0]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Throttle Culture Garage & Studio</span>
                    <span>1400 Speedwell Avenue, Bay 4</span>
                    <span className="block">Portland, OR 97201 · USA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#202020]">
                  <Mail className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Direct Department Inboxes</span>
                    <span className="block font-mono text-[#D0D0D0]">editorial@throttleculture.magazine</span>
                    <span className="block font-mono text-[#D0D0D0]">pressfleet@throttleculture.magazine</span>
                    <span className="block font-mono text-[#D0D0D0]">advertising@throttleculture.magazine</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#202020]">
                  <Clock className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Operating Rhythm</span>
                    <span>Mon–Fri: 08:00 – 18:00 PST</span>
                    <span className="block text-[#707070]">Weekends: On the racetrack and trail passes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Writer & Contributor Pitch Guidelines */}
            <div className="bg-[#131313] border border-[#222222] p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase font-bold">
                <FileText className="w-4 h-4" />
                <span>PITCHING GUIDELINES</span>
              </div>
              <p className="text-xs text-[#B0B0B0] leading-relaxed">
                We accept freelance submissions from certified riders, rally competitors, and
                mechanical specialists. Pitches must include:
              </p>
              <ul className="text-xs text-[#8E8E8E] space-y-1.5 list-disc list-inside">
                <li>Specific machine make, model year, and technical telemetry</li>
                <li>High-resolution raw or TIFF photography sample</li>
                <li>First-person experiential angle emphasizing rider skill or safety</li>
              </ul>
            </div>

            {/* Social channels */}
            <div className="bg-[#131313] border border-[#222222] p-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3">
                FOLLOW OUR LIVE DISPATCHES
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Throttle Culture on Instagram"
                  className="p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#262626] text-[#C0C0C0] hover:text-[#FF5A1F] text-center transition-colors cursor-pointer block"
                >
                  Instagram @ThrottleCulture
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Throttle Culture on YouTube"
                  className="p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#262626] text-[#C0C0C0] hover:text-[#FF5A1F] text-center transition-colors cursor-pointer block"
                >
                  YouTube /ThrottleCulture
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Throttle Culture on X Twitter"
                  className="p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#262626] text-[#C0C0C0] hover:text-[#FF5A1F] text-center transition-colors cursor-pointer block"
                >
                  X @ThrottleMoto
                </a>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Throttle Culture Moto Racing Club on Strava"
                  className="p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#262626] text-[#C0C0C0] hover:text-[#FF5A1F] text-center transition-colors cursor-pointer block"
                >
                  Strava Moto Racing Club
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
