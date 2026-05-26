'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, TrendingUp, Users, FileText, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    value: number;
    category: string;
  }[];
  category: 'compliance' | 'recruitment' | 'performance' | 'culture' | 'technology';
}

const questions: Question[] = [
  {
    id: 'q1',
    question: 'How many employees does your organization currently have?',
    category: 'compliance',
    options: [
      { text: '1-10 employees', value: 1, category: 'size' },
      { text: '11-50 employees', value: 2, category: 'size' },
      { text: '51-150 employees', value: 3, category: 'size' },
      { text: '150+ employees', value: 4, category: 'size' }
    ]
  },
  {
    id: 'q2',
    question: 'How confident are you in your current HR compliance practices?',
    category: 'compliance',
    options: [
      { text: 'Very confident - we have everything covered', value: 4, category: 'compliance' },
      { text: 'Somewhat confident - but unsure about some areas', value: 3, category: 'compliance' },
      { text: 'Not very confident - we need help', value: 2, category: 'compliance' },
      { text: 'Not confident at all - we\'re at risk', value: 1, category: 'compliance' }
    ]
  },
  {
    id: 'q3',
    question: 'How do you currently manage employee records and documentation?',
    category: 'technology',
    options: [
      { text: 'Modern HR software with cloud storage', value: 4, category: 'technology' },
      { text: 'Basic digital files and spreadsheets', value: 3, category: 'technology' },
      { text: 'Mix of paper and digital files', value: 2, category: 'technology' },
      { text: 'Mostly paper-based filing', value: 1, category: 'technology' }
    ]
  },
  {
    id: 'q4',
    question: 'How long does your typical hiring process take from posting to offer?',
    category: 'recruitment',
    options: [
      { text: 'Less than 2 weeks', value: 4, category: 'recruitment' },
      { text: '2-4 weeks', value: 3, category: 'recruitment' },
      { text: '1-2 months', value: 2, category: 'recruitment' },
      { text: 'More than 2 months', value: 1, category: 'recruitment' }
    ]
  },
  {
    id: 'q5',
    question: 'Do you have a structured performance review process?',
    category: 'performance',
    options: [
      { text: 'Yes, with regular reviews and clear metrics', value: 4, category: 'performance' },
      { text: 'Yes, but it\'s informal or inconsistent', value: 3, category: 'performance' },
      { text: 'We do reviews occasionally', value: 2, category: 'performance' },
      { text: 'No formal review process', value: 1, category: 'performance' }
    ]
  },
  {
    id: 'q6',
    question: 'How would you rate your employee retention over the past year?',
    category: 'culture',
    options: [
      { text: 'Excellent - minimal turnover', value: 4, category: 'culture' },
      { text: 'Good - some expected turnover', value: 3, category: 'culture' },
      { text: 'Concerning - higher than we\'d like', value: 2, category: 'culture' },
      { text: 'Poor - significant retention issues', value: 1, category: 'culture' }
    ]
  },
  {
    id: 'q7',
    question: 'Do you have documented HR policies and an employee handbook?',
    category: 'compliance',
    options: [
      { text: 'Yes, comprehensive and up-to-date', value: 4, category: 'compliance' },
      { text: 'Yes, but they need updating', value: 3, category: 'compliance' },
      { text: 'We have some basic policies', value: 2, category: 'compliance' },
      { text: 'No formal policies or handbook', value: 1, category: 'compliance' }
    ]
  },
  {
    id: 'q8',
    question: 'How much time does your leadership team spend on HR issues weekly?',
    category: 'technology',
    options: [
      { text: 'Less than 5 hours - well managed', value: 4, category: 'technology' },
      { text: '5-10 hours - manageable', value: 3, category: 'technology' },
      { text: '10-20 hours - taking too much time', value: 2, category: 'technology' },
      { text: 'More than 20 hours - overwhelming', value: 1, category: 'technology' }
    ]
  }
];

interface Results {
  overallScore: number;
  categoryScores: {
    compliance: number;
    recruitment: number;
    performance: number;
    culture: number;
    technology: number;
  };
  companySize: number;
}

export function HRAssessmentQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: number, category: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate results
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, number>) => {
    const categoryScores = {
      compliance: 0,
      recruitment: 0,
      performance: 0,
      culture: 0,
      technology: 0
    };

    const categoryCounts = {
      compliance: 0,
      recruitment: 0,
      performance: 0,
      culture: 0,
      technology: 0
    };

    let totalScore = 0;
    let totalQuestions = 0;
    let companySize = 1;

    questions.forEach((q) => {
      const answer = finalAnswers[q.id];
      if (answer !== undefined) {
        if (q.id === 'q1') {
          companySize = answer;
        }
        totalScore += answer;
        totalQuestions++;
        categoryScores[q.category] += answer;
        categoryCounts[q.category]++;
      }
    });

    // Average scores per category
    Object.keys(categoryScores).forEach((key) => {
      const cat = key as keyof typeof categoryScores;
      if (categoryCounts[cat] > 0) {
        categoryScores[cat] = (categoryScores[cat] / categoryCounts[cat]) * 25;
      }
    });

    const overallScore = (totalScore / (totalQuestions * 4)) * 100;

    setResults({
      overallScore,
      categoryScores,
      companySize
    });
    setShowResults(true);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Moderate';
    return 'Needs Attention';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="w-5 h-5" />;
      case 'recruitment': return <Users className="w-5 h-5" />;
      case 'performance': return <TrendingUp className="w-5 h-5" />;
      case 'culture': return <CheckCircle2 className="w-5 h-5" />;
      case 'technology': return <FileText className="w-5 h-5" />;
      default: return null;
    }
  };

  const getRecommendations = () => {
    if (!results) return [];

    const recommendations = [];

    if (results.categoryScores.compliance < 75) {
      recommendations.push({
        title: 'Compliance & Risk Management',
        description: 'Your compliance practices need strengthening. We can help you avoid costly legal issues with proper documentation, policies, and training.',
        priority: results.categoryScores.compliance < 50 ? 'high' : 'medium'
      });
    }

    if (results.categoryScores.technology < 75) {
      recommendations.push({
        title: 'HR Technology & Automation',
        description: 'Modernizing your HR systems can save significant time and reduce errors. Our software solutions streamline employee management.',
        priority: results.categoryScores.technology < 50 ? 'high' : 'medium'
      });
    }

    if (results.categoryScores.recruitment < 75) {
      recommendations.push({
        title: 'Recruitment & Onboarding',
        description: 'A faster, more efficient hiring process helps you secure top talent. We can optimize your recruitment strategy and onboarding.',
        priority: results.categoryScores.recruitment < 50 ? 'high' : 'medium'
      });
    }

    if (results.categoryScores.performance < 75) {
      recommendations.push({
        title: 'Performance Management',
        description: 'Structured performance reviews drive employee growth and business results. Let us help you build an effective review system.',
        priority: results.categoryScores.performance < 50 ? 'high' : 'medium'
      });
    }

    if (results.categoryScores.culture < 75) {
      recommendations.push({
        title: 'Employee Retention & Culture',
        description: 'High turnover is costly. We can help you build a stronger culture and retention strategy to keep your best people.',
        priority: results.categoryScores.culture < 50 ? 'high' : 'medium'
      });
    }

    return recommendations.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return 0;
    });
  };

  if (showResults && results) {
    const recommendations = getRecommendations();

    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4"
              >
                <span className="text-3xl font-bold text-white">{Math.round(results.overallScore)}</span>
              </motion.div>
              <CardTitle className="text-3xl">Your HR Health Score</CardTitle>
              <p className="text-muted-foreground mt-2">
                Based on your responses, here's how your HR practices measure up
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Category Breakdown */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Category Breakdown</h3>
                {Object.entries(results.categoryScores).map(([category, score]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={getScoreColor(score)}>
                          {getCategoryIcon(category)}
                        </div>
                        <span className="font-medium capitalize">{category}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(score)}`}>
                        {Math.round(score)}% - {getScoreLabel(score)}
                      </span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </motion.div>
                ))}
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Recommended Focus Areas
                  </h3>
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          rec.priority === 'high'
                            ? 'bg-red-50 border-red-500'
                            : 'bg-yellow-50 border-yellow-500'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {rec.priority === 'high' && (
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-semibold">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6 border-t">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 text-center space-y-4">
                  <h3 className="font-bold text-xl">Ready to Improve Your HR?</h3>
                  <p className="text-muted-foreground">
                    Let's discuss how PreciseHR can help you address these areas and strengthen your HR operations.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => {
                      // Store results in sessionStorage for the contact form
                      sessionStorage.setItem('hrAssessmentScore', JSON.stringify(results));
                      navigate('/contact');
                    }}
                    className="w-full sm:w-auto"
                  >
                    Schedule Your Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No obligation • 30-minute consultation • Personalized recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.value, option.category)}
                  className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {currentQuestion > 0 && (
        <Button variant="outline" onClick={goBack} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous Question
        </Button>
      )}
    </div>
  );
}
