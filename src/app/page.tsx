'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaClock, FaShoppingCart, FaCalendarCheck } from 'react-icons/fa';

export default function LandingPage() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentWeek = [
    { day: 'Jan 15', meals: [{ emoji: '🍗', name: 'Prep Chicken', time: '7:00 PM', duration: '45m' }] },
    { day: 'Jan 16', meals: [{ emoji: '🍜', name: 'Chicken Bowl', time: '12:30 PM', duration: '450 cal' }] },
    { day: 'Jan 17', meals: [{ emoji: '🥗', name: 'Prep Veggie Bowl', time: '6:30 PM', duration: '60m' }] },
    { day: 'Jan 18', meals: [{ emoji: '🥘', name: 'Veggie Bowl', time: '12:00 PM', duration: '380 cal' }] },
    { day: 'Jan 19', meals: [{ emoji: '🐟', name: 'Prep Salmon', time: '7:30 PM', duration: '30m' }] },
    { day: 'Jan 20', meals: [{ emoji: '🍣', name: 'Salmon Dinner', time: '6:00 PM', duration: '520 cal' }] },
    { day: 'Jan 21', meals: [{ emoji: '🍳', name: 'Weekly Prep', time: '2:00 PM', duration: '120m' }] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="px-6 py-4 md:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥘</span>
            <h1 className="text-xl font-semibold text-gray-800">MealPrep Pro</h1>
          </div>
          <Link 
            href="/app"
            className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium text-sm"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-8 pt-16 pb-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-orange-500 font-medium mb-4 flex items-center justify-center gap-2">
            <span className="text-lg">👨‍🍳</span> For Busy Professionals
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Week, <span className="text-orange-500">Planned</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop wondering "what's for lunch?" every day. See your entire week of healthy meals planned, prepped, and ready to go.
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-gray-700">5 minutes to plan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🍳</span>
              <span className="text-gray-700">2 hours to prep</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-gray-700">7 days sorted</span>
            </div>
          </div>
        </motion.div>

        {/* Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Your Week at a Glance</h3>
              <p className="text-sm text-gray-500">Click any meal to start planning your own week</p>
            </div>
            
            <div className="bg-orange-500 text-white p-3 rounded-t-lg flex items-center justify-between">
              <span className="font-medium flex items-center gap-2">
                <span>📅</span> January 15-21, 2024
              </span>
              <span className="text-sm bg-orange-600 px-3 py-1 rounded-full">Interactive Preview</span>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {weekDays.map((day, index) => (
                <div key={day} className="bg-gray-50 p-3 text-center">
                  <div className="font-medium text-gray-700">{day}</div>
                  <div className="text-sm text-gray-500">{currentWeek[index].day}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {currentWeek.map((day, index) => (
                <div key={index} className="bg-white p-4 min-h-[120px]">
                  {day.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="text-center">
                      <div className="text-2xl mb-1">{meal.emoji}</div>
                      <div className="text-xs font-medium text-gray-700">{meal.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{meal.time}</div>
                      <div className="text-xs text-orange-500 font-medium mt-1">
                        {meal.duration.includes('m') ? '⏱️ ' : '🔥 '}{meal.duration}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <Link
            href="/app"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
          >
            <span>▶️</span> Start Planning My Week
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">Free forever • No credit card required • 2 minutes to set up</p>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 md:px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaClock className="text-3xl" />,
                title: "Save 5+ Hours Weekly",
                description: "No more daily \"what should I eat?\" decisions. Plan once, eat well all week.",
                color: "text-orange-500"
              },
              {
                icon: <FaShoppingCart className="text-3xl" />,
                title: "Smart Grocery Lists",
                description: "Automatically generated shopping lists organized by store sections. Never forget ingredients again.",
                color: "text-green-500"
              },
              {
                icon: <FaCalendarCheck className="text-3xl" />,
                title: "Batch Prep Made Easy",
                description: "Optimized prep schedules that maximize freshness and minimize kitchen time.",
                color: "text-blue-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`${benefit.color} mb-4 flex justify-center`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-8 py-8 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2024 MealPrep Pro. Built with 💚 for meal preppers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}