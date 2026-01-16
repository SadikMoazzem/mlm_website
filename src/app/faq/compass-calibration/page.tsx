'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, RotateCcw, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

const faqs = [
  {
    question: "How do I calibrate the Qibla compass?",
    answer: "Hold your phone flat (screen facing up), then move it in a figure-8 pattern several times by rotating your wrist to draw a figure-8 in the air. Repeat 3-5 times until the accuracy indicator shows 'Good' or 'Excellent'. For best results, do this outdoors away from metal objects and electronics."
  },
  {
    question: "What do the different accuracy levels mean?",
    answer: "Excellent means ±0-5° accuracy (highly reliable), Good means ±5-10° (reliable for prayer), Fair means ±10-15° (consider recalibrating), Poor means ±15-30° (calibration recommended), and Unstable/Uncalibrated means >30° accuracy (calibration required before use)."
  },
  {
    question: "Why is my compass inaccurate?",
    answer: "The compass uses your phone's magnetic sensor which can be affected by metal objects nearby (keys, watches, jewelry, belt buckles), electronic devices (laptops, tablets, speakers), being indoors (metal in walls, electrical wiring), or phone cases with magnets. Try moving away from these sources and recalibrating outdoors."
  },
  {
    question: "What are the best practices for accurate Qibla direction?",
    answer: "Go outdoors or near a window for initial calibration, remove magnetic cases before using the compass, step away from electronics and metal objects, keep your phone level when reading the direction, and recalibrate daily or when accuracy drops."
  }
];

const faqSchema = generateFAQSchema(faqs);

export default function CompassCalibrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white px-4">
        {/* Header */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl pt-24 pb-8"
      >
        <Link
          href="/faq"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to FAQ
        </Link>

        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            Qibla Compass Calibration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            How to calibrate your compass for accurate Qibla direction.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-3xl pb-16"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-8">
          {/* Quick Summary */}
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
              <Compass size={20} className="text-primary-600" />
              Quick Summary
            </h2>
            <p className="text-gray-700">
              Move your phone in a <strong>figure-8 pattern</strong> several times to calibrate. For best results,
              do this outdoors away from metal objects and electronics.
            </p>
          </div>

          {/* How to Calibrate */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <RotateCcw size={24} className="text-primary-600" />
              How to Calibrate
            </h2>
            <p className="text-gray-700 mb-4">
              When the app shows &quot;Calibration needed&quot; or accuracy is poor, follow these steps:
            </p>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <div>
                  <strong>Hold your phone flat</strong>
                  <p className="text-gray-600 text-sm">Screen facing up, like you&apos;re reading a message</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <div>
                  <strong>Move in a figure-8 pattern</strong>
                  <p className="text-gray-600 text-sm">Rotate your wrist to draw a figure-8 in the air, tilting the phone as you go</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <div>
                  <strong>Repeat 3-5 times</strong>
                  <p className="text-gray-600 text-sm">Continue until the accuracy indicator shows &quot;Good&quot; or &quot;Excellent&quot;</p>
                </div>
              </li>
            </ol>

            <div className="bg-gray-100 p-6 rounded-lg mt-6 text-center">
              <p className="text-6xl mb-2">∞</p>
              <p className="text-gray-600 text-sm">Move your phone in this pattern</p>
            </div>
          </section>

          {/* Accuracy Levels */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <CheckCircle size={24} className="text-primary-600" />
              Understanding Accuracy Levels
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <div>
                  <strong className="text-black">Excellent</strong>
                  <p className="text-gray-600 text-sm">±0-5° accuracy. Qibla direction is highly reliable.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <div>
                  <strong className="text-black">Good</strong>
                  <p className="text-gray-600 text-sm">±5-10° accuracy. Qibla direction is reliable for prayer.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                <div>
                  <strong className="text-black">Fair</strong>
                  <p className="text-gray-600 text-sm">±10-15° accuracy. Consider recalibrating for better results.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <div>
                  <strong className="text-black">Poor</strong>
                  <p className="text-gray-600 text-sm">±15-30° accuracy. Calibration recommended.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <div>
                  <strong className="text-black">Unstable / Uncalibrated</strong>
                  <p className="text-gray-600 text-sm">&gt;30° accuracy. Calibration required before use.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <AlertTriangle size={24} className="text-primary-600" />
              Why Compass May Be Inaccurate
            </h2>
            <p className="text-gray-700 mb-4">
              The compass uses your phone&apos;s magnetic sensor, which can be affected by:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Metal objects nearby</strong>
                  <p className="text-gray-600 text-sm">Keys, watches, jewelry, belt buckles, metal furniture</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Electronic devices</strong>
                  <p className="text-gray-600 text-sm">Laptops, tablets, speakers, TVs, refrigerators</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Being indoors</strong>
                  <p className="text-gray-600 text-sm">Metal in walls, electrical wiring, reinforced concrete</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Phone case with magnets</strong>
                  <p className="text-gray-600 text-sm">Magnetic mounts, wallet cases with magnetic closures</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Smartphone size={24} className="text-primary-600" />
              Tips for Best Results
            </h2>
            <div className="bg-green-50 p-5 rounded-lg border border-green-100">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Go outdoors</strong> or near a window for initial calibration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Remove magnetic cases</strong> before using the compass</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Step away</strong> from electronics and metal objects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Keep phone level</strong> when reading the direction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Recalibrate daily</strong> or when accuracy drops</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Back to FAQ */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to FAQ
          </Link>
        </div>
      </motion.article>
    </main>
    </>
  );
}
