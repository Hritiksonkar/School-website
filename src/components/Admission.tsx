import { Calendar, FileText, CheckCircle, ClipboardList } from 'lucide-react';

export default function Admission({ topImage }: { topImage?: string }) {
  const steps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Fill out the admission form with accurate details',
    },
    {
      icon: ClipboardList,
      title: 'Document Verification',
      description: 'Submit required documents for verification',
    },
    {
      icon: CheckCircle,
      title: 'Entrance Test',
      description: 'Appear for the entrance assessment (if applicable)',
    },
    {
      icon: Calendar,
      title: 'Final Admission',
      description: 'Complete fee payment and confirm enrollment',
    },
  ];

  const requirements = [
    'Birth Certificate',
    'Transfer Certificate (TC) from previous school',
    'Mark sheets of previous classes',
    'Passport size photographs (4 copies)',
    'Aadhar Card copy (Student and Parents)',
    'Caste Certificate (if applicable)',
    'Income Certificate (if applicable)',
  ];

  return (
    <>
      {/* top banner if provided */}
      {topImage && (
        <div className="w-full h-[500px] md:h-[500px] relative">
          <img
            src={"image.png"}
            alt="Admission banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl text-white font-bold tracking-tight">
              Admission
            </h1>
          </div>
        </div>
      )}

      <section className="py-20 bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Admission Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our institution and be part of a community dedicated to
              excellence. Follow these simple steps for admission.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg mb-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Admissions Open!</h3>
            <p className="text-xl mb-2">Academic Session 2025-2026</p>
            <p className="text-blue-200">
              Limited seats available - Apply now to secure your spot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="bg-blue-100 p-6 rounded-full">
                        <Icon className="text-blue-900" size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Required Documents
              </h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle
                      className="text-green-600 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Important Dates
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="font-semibold text-gray-900">
                    Application Start Date
                  </p>
                  <p className="text-gray-600">March 1, 2025</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="font-semibold text-gray-900">
                    Application End Date
                  </p>
                  <p className="text-gray-600">April 30, 2025</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="font-semibold text-gray-900">Entrance Test</p>
                  <p className="text-gray-600">May 15-20, 2025</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="font-semibold text-gray-900">Result Declaration</p>
                  <p className="text-gray-600">May 25, 2025</p>
                </div>
                <div className="border-l-4 border-blue-900 pl-4">
                  <p className="font-semibold text-gray-900">Session Starts</p>
                  <p className="text-gray-600">July 1, 2025</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border-l-4 border-blue-900 p-6 rounded">
            <h4 className="font-bold text-gray-900 mb-2">Note:</h4>
            <p className="text-gray-700">
              For more information about the admission process, fee structure, or
              any queries, please visit our office or contact us through the
              contact section. Our admission team is ready to assist you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
