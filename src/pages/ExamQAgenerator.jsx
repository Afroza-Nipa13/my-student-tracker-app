import React, { useState } from 'react';
import { FaQuestionCircle, FaGraduationCap, FaCheckCircle, FaSyncAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ExamQAGenerator = () => {
    const axiosSecure = useAxiosSecure(); // ✅ axios instance
    const [questions, setQuestions] = useState([]);
    const [settings, setSettings] = useState({
        subject: '',
        topic: '',
        difficulty: 'medium',
        questionType: 'mcq',
        numberOfQuestions: 5
    });
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: value
        });
    };

    const generateQuestions = async () => {
        if (!settings.subject || !settings.topic) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please select a subject and topic first.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        setIsLoading(true);

        try {
            //  axios 
            const res = await axiosSecure.get('/api/questions', {
                params: {
                    subject: settings.subject,
                    topic: settings.topic,
                    difficulty: settings.difficulty,
                    type: settings.questionType,
                    limit: settings.numberOfQuestions
                }
            });

            if (res.data.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'No Questions Available',
                    text: 'No questions found for the selected criteria. Please try different settings.',
                });
                setIsLoading(false);
                return;
            }

            setQuestions(res.data);
            setAnswers({});
            setResults({});
        } catch (error) {
            console.error("Error fetching questions:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Something went wrong while fetching questions!',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex, value) => {
        setAnswers({
            ...answers,
            [questionIndex]: value
        });
    };

    const checkAnswers = () => {
        const newResults = {};
        let correctCount = 0;

        questions.forEach((question, index) => {
            const userAnswer = answers[index] || '';
            const isCorrect = userAnswer.toString().toLowerCase() === question.answer.toString().toLowerCase();

            if (isCorrect) correctCount++;

            newResults[index] = {
                isCorrect,
                correctAnswer: question.answer,
                explanation: question.explanation
            };
        });

        setResults(newResults);

        Swal.fire({
            title: 'Results',
            html: `You got <b>${correctCount}</b> out of <b>${questions.length}</b> questions correct!`,
            icon: correctCount === questions.length ? 'success' :
                correctCount > questions.length / 2 ? 'info' : 'error',
            confirmButtonColor: '#3085d6',
        });
    };

    const resetQuiz = () => {
        setQuestions([]);
        setAnswers({});
        setResults({});
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaGraduationCap className="inline" /> Exam Q&A Generator
                    </h1>
                    <p className="mt-2">Generate practice questions to prepare for your exams</p>
                </div>
                
                <div className="p-6">
                    {/* Settings Panel */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FaQuestionCircle className="text-blue-500" /> Question Settings
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    name="subject"
                                    value={settings.subject}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select Subject</option>
                                    <option value="math">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="history">History</option>
                                    <option value="english">English</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                                <select
                                    name="topic"
                                    value={settings.topic}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select Topic</option>
                                    {settings.subject === 'math' && (
                                        <>
                                            <option value="algebra">Algebra</option>
                                            <option value="calculus">Calculus</option>
                                            <option value="geometry">Geometry</option>
                                        </>
                                    )}
                                    {settings.subject === 'science' && (
                                        <>
                                            <option value="physics">Physics</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="biology">Biology</option>
                                        </>
                                    )}
                                    {settings.subject === 'history' && (
                                        <>
                                            <option value="world">World History</option>
                                            <option value="european">European History</option>
                                        </>
                                    )}
                                    {settings.subject === 'english' && (
                                        <>
                                            <option value="grammar">Grammar</option>
                                            <option value="literature">Literature</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                                <select
                                    name="difficulty"
                                    value={settings.difficulty}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                                <select
                                    name="questionType"
                                    value={settings.questionType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="short">Short Answer</option>
                                    <option value="truefalse">True/False</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
                                <input
                                    type="number"
                                    name="numberOfQuestions"
                                    value={settings.numberOfQuestions}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="20"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            
                            <div className="flex items-end">
                                <button
                                    onClick={generateQuestions}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FaSyncAlt /> Generate Questions
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Questions Panel */}
                    {questions.length > 0 && (
                        <div className="bg-white border rounded-lg p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Practice Questions</h2>
                                <button
                                    onClick={resetQuiz}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Reset
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {questions.map((question, index) => (
                                    <div key={index} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-start mb-2">
                                            <span className="font-semibold mr-2">{index + 1}.</span>
                                            <p className="font-medium">{question.question}</p>
                                        </div>
                                        
                                        {question.type === 'mcq' && question.options && (
                                            <div className="ml-6 mt-2 space-y-2">
                                                {question.options.map((option, optIndex) => (
                                                    <div key={optIndex} className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id={`q${index}_opt${optIndex}`}
                                                            name={`question_${index}`}
                                                            value={option}
                                                            onChange={() => handleAnswerChange(index, option)}
                                                            checked={answers[index] === option}
                                                            className="mr-2"
                                                            disabled={results[index]}
                                                        />
                                                        <label htmlFor={`q${index}_opt${optIndex}`} className="cursor-pointer">
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {question.type === 'short' && (
                                            <div className="ml-6 mt-2">
                                                <input
                                                    type="text"
                                                    value={answers[index] || ''}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Type your answer here"
                                                    disabled={results[index]}
                                                />
                                            </div>
                                        )}
                                        
                                        {question.type === 'truefalse' && (
                                            <div className="ml-6 mt-2 flex gap-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`q${index}_true`}
                                                        name={`question_${index}`}
                                                        value="true"
                                                        onChange={() => handleAnswerChange(index, 'true')}
                                                        checked={answers[index] === 'true'}
                                                        className="mr-2"
                                                        disabled={results[index]}
                                                    />
                                                    <label htmlFor={`q${index}_true`} className="cursor-pointer">
                                                        True
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`q${index}_false`}
                                                        name={`question_${index}`}
                                                        value="false"
                                                        onChange={() => handleAnswerChange(index, 'false')}
                                                        checked={answers[index] === 'false'}
                                                        className="mr-2"
                                                        disabled={results[index]}
                                                    />
                                                    <label htmlFor={`q${index}_false`} className="cursor-pointer">
                                                        False
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Show results if available */}
                                        {results[index] && (
                                            <div className={`ml-6 mt-3 p-3 rounded-md ${results[index].isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                                                <div className="flex items-center font-medium">
                                                    {results[index].isCorrect ? (
                                                        <span className="text-green-600">✓ Correct</span>
                                                    ) : (
                                                        <span className="text-red-600">✗ Incorrect</span>
                                                    )}
                                                </div>
                                                {!results[index].isCorrect && (
                                                    <p className="mt-1 text-sm">
                                                        Correct answer: <span className="font-semibold">{results[index].correctAnswer}</span>
                                                    </p>
                                                )}
                                                <p className="mt-2 text-sm">{results[index].explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={checkAnswers}
                                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 flex items-center gap-2"
                                >
                                    <FaCheckCircle /> Check Answers
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Instructions */}
                    {questions.length === 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-3 text-blue-800">How to Use</h2>
                            <ol className="list-decimal list-inside space-y-2 text-blue-700">
                                <li>Select a subject and topic from the dropdown menus</li>
                                <li>Choose the difficulty level and question type</li>
                                <li>Specify how many questions you want to generate</li>
                                <li>Click "Generate Questions" to create your practice quiz</li>
                                <li>Answer the questions and click "Check Answers" to see your results</li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamQAGenerator;