import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t, isHindi } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'beekeeper',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = isHindi ? 'कृपया अपना नाम दर्ज करें' : 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = isHindi ? 'वैध ईमेल पता दर्ज करें' : 'Valid email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = isHindi ? '10 अंकों का मोबाइल नंबर दर्ज करें' : 'Valid 10-digit phone number is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = isHindi ? 'संदेश कम से कम 10 अक्षरों का होना चाहिए' : 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'beekeeper',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
          {t('contact.title')}
        </h1>
        <p className="text-sm text-chocolate-600 dark:text-chocolate-300 leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-6">
          <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
            {t('contact.formTitle')}
          </h3>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{t('contact.successMsg')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rajesh Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-ivory-50 dark:bg-charcoal-900 focus:outline-none text-xs sm:text-sm ${
                    errors.name ? 'border-rose-500' : 'border-chocolate-200 dark:border-chocolate-700 focus:border-amber-500'
                  }`}
                />
                {errors.name && <span className="text-rose-500 text-[11px] mt-0.5 block">{errors.name}</span>}
              </div>

              <div>
                <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-ivory-50 dark:bg-charcoal-900 focus:outline-none text-xs sm:text-sm ${
                    errors.email ? 'border-rose-500' : 'border-chocolate-200 dark:border-chocolate-700 focus:border-amber-500'
                  }`}
                />
                {errors.email && <span className="text-rose-500 text-[11px] mt-0.5 block">{errors.email}</span>}
              </div>

              <div>
                <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {t('contact.phone')} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-ivory-50 dark:bg-charcoal-900 focus:outline-none text-xs sm:text-sm ${
                    errors.phone ? 'border-rose-500' : 'border-chocolate-200 dark:border-chocolate-700 focus:border-amber-500'
                  }`}
                />
                {errors.phone && <span className="text-rose-500 text-[11px] mt-0.5 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {t('contact.role')}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500 text-xs sm:text-sm"
                >
                  <option value="beekeeper">{t('contact.roles.beekeeper')}</option>
                  <option value="consumer">{t('contact.roles.consumer')}</option>
                  <option value="coop">{t('contact.roles.coop')}</option>
                  <option value="processor">{t('contact.roles.processor')}</option>
                  <option value="researcher">{t('contact.roles.researcher')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={isHindi ? 'उदा: छत्ते में बीमारी का संदेह अथवा IoT सेटअप' : 'e.g., Query regarding ESP32 installation or batch verification'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                {t('contact.message')} *
              </label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isHindi ? 'अपना विस्तृत संदेश यहां लिखें...' : 'Type your detailed inquiry or advisory request...'}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-ivory-50 dark:bg-charcoal-900 focus:outline-none text-xs sm:text-sm ${
                  errors.message ? 'border-rose-500' : 'border-chocolate-200 dark:border-chocolate-700 focus:border-amber-500'
                }`}
              ></textarea>
              {errors.message && <span className="text-rose-500 text-[11px] mt-0.5 block">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{t('contact.sendBtn')}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Toll-free Helpline & Official Links */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-chocolate-900 text-ivory-100 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-white">
              {t('contact.helplineTitle')}
            </h3>

            <p className="text-2xl font-extrabold text-amber-400 font-mono tracking-wide">
              {t('contact.helplineNumber')}
            </p>

            <div className="flex items-center space-x-2 text-xs text-chocolate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t('contact.helplineTiming')}</span>
            </div>

            <p className="text-xs text-chocolate-300 pt-2 border-t border-chocolate-800 leading-relaxed">
              {isHindi
                ? 'मधुमक्खी पालकों के लिए निःशुल्क सहायता एवं विशेषज्ञ परामर्श केंद्र।'
                : 'Dedicated toll-free helpline for rural beekeepers, disease emergency alerts, and apiary onboarding.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
              Government Portals & Affiliations
            </h4>

            <div className="space-y-2">
              <a
                href="https://nbhm.gov.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-900 hover:bg-amber-50 text-chocolate-800 dark:text-ivory-200 transition-colors"
              >
                <span>National Beekeeping & Honey Mission (NBHM)</span>
                <ExternalLink className="w-3.5 h-3.5 text-chocolate-400" />
              </a>

              <a
                href="https://madhukranti.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-900 hover:bg-amber-50 text-chocolate-800 dark:text-ivory-200 transition-colors"
              >
                <span>Madhukranti Beekeeper & Honey Registry</span>
                <ExternalLink className="w-3.5 h-3.5 text-chocolate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
