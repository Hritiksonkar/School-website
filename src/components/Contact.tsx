import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  // Prefer env vars (Vite): VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY
  const EMAILJS_SERVICE_ID =
    (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID ?? 'service_r0jzha3';
  const EMAILJS_TEMPLATE_ID =
    (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID ?? 'template_5n7y3i7';
  const EMAILJS_PUBLIC_KEY =
    (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY ?? 'PDNzmKjP6dUm2Y0oe';

  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Initialize EmailJS on mount (fixes 412 Precondition Failed error)
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  function assertEmailJsConfig() {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('Missing EmailJS config (service/template/public key).');
    }
  }

  function toTemplateParams(form: HTMLFormElement) {
    const fd = new FormData(form);
    const get = (key: string) => String(fd.get(key) ?? '').trim();

    // Keep keys aligned with your EmailJS template variables.
    return {
      from_name: get('name'),
      from_email: get('email'),
      email: get('email'), // Send both to be safe against template variations
      from_phone: get('phone'),
      subject: get('subject'),
      message: get('message'),
    };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      assertEmailJsConfig();
      setStatus('sending');
      setErrorMsg('');

      const params = toTemplateParams(formRef.current);
      console.log('Sending EmailJS...', params);

      // Using the 4th argument (Public Key) as requested in the user's snippet
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        params,
        EMAILJS_PUBLIC_KEY
      );

      formRef.current.reset();
      setStatus('sent');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send.';
      console.error('EmailJS Error:', err);
      setErrorMsg(msg);
      setStatus('error');
    }
  }

  return (
    <section className="py-20 bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any inquiries, admission information, or
            feedback. We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="text-blue-900" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    Munner Ram Inter College
                    <br />
                    Sarikhwaja jaunpur, Uttar Pradesh
                    <br />
                    PIN Code, 222001(BAZAR BHAKURA MODE)
                    NEAR: VEER BAHDUR SHING PURVANCHAL UNIVERSITY JAUNPUR(VBSPU)


                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="text-blue-900" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+91 </p>
                  <p className="text-gray-600">+91 9721185193</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-300 p-3 rounded-full mr-4">
                  <Mail className="text-blue-900" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@munnerramcollege.edu.in</p>
                  <p className="text-gray-600">
                    admission@munnerramcollege.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="text-blue-900" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Office Hours
                  </h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            <form ref={formRef} className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Write your message here..."
                />
              </div>

              {status === 'sent' && (
                <p className="text-sm text-green-700">Message sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-700">
                  Failed to send. {errorMsg ? <span className="break-words">{errorMsg}</span> : 'Please try again later.'}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-64">
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Map Location Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
