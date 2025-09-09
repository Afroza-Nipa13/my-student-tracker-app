import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import bannerImg from "../assets/toolkit.jpg";
import printedBg from '../assets/leaf-bg.jpg';
import { FaMoneyBillWave, FaMoneyCheckAlt, FaPiggyBank, FaChartPie, FaChartBar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import IncomeExpenses from './IncomeExpenses';
import FinancialOverview from './FinancialOverview';
import TransactionTable from './TransactionTable';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const BudgetPlan = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        type: 'income',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate totals
    const incomeTotal = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const expensesTotal = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const savingsTotal = incomeTotal - expensesTotal;

    // Prepare data for charts
    const expenseCategories = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            if (!acc[t.category]) acc[t.category] = 0;
            acc[t.category] += parseFloat(t.amount);
            return acc;
        }, {});

    const pieChartData = Object.keys(expenseCategories).map(key => ({
        name: key,
        value: expenseCategories[key]
    }));

    const barChartData = [
        { name: 'Income', amount: incomeTotal },
        { name: 'Expenses', amount: expensesTotal },
        { name: 'Savings', amount: savingsTotal }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    // Load transactions from database
    useEffect(() => {
        if (user?.email) {
            fetchTransactions();
        }
    }, [user]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/budget/transactions?email=${user.email}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load your transactions. Please try again.',
                confirmButtonColor: '#3085d6',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.category || !formData.amount || formData.amount <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please fill all fields with valid values.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        try {
            const transactionData = {
                ...formData,
                amount: parseFloat(formData.amount),
                userEmail: user.email,
                createdAt: new Date()
            };

            const response = await axiosSecure.post('/budget/transactions', transactionData);
            
            if (response.data.insertedId) {
                setTransactions([...transactions, { ...transactionData, _id: response.data.insertedId }]);
                
                setFormData({
                    type: 'income',
                    category: '',
                    amount: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0]
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Added!',
                    text: `${formData.type === 'income' ? 'Income' : 'Expense'} added successfully.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add transaction. Please try again.',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This transaction will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/budget/transactions/${id}`);
                    
                    if (response.data.deletedCount > 0) {
                        setTransactions(transactions.filter(t => t._id !== id));
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Transaction has been deleted successfully.',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    } else {
                        throw new Error('Transaction not found or already deleted');
                    }
                } catch (error) {
                    console.error("Error deleting transaction:", error);
                    
                    let errorMessage = "Failed to delete transaction. Please try again.";
                    if (error.response?.data?.error) {
                        errorMessage = error.response.data.error;
                    }
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorMessage,
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    };

    const resetBudget = () => {
        Swal.fire({
            title: 'Reset Everything?',
            text: "This will delete all your transactions and cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reset everything!',
            cancelButtonText: 'No, keep my data',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/budget/transactions?email=${user.email}`);
                    
                    if (response.data.deletedCount > 0) {
                        setTransactions([]);
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Reset Complete!',
                            text: 'All transactions have been cleared.',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                } catch (error) {
                    console.error("Error resetting budget:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to reset budget. Please try again.',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your budget data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-12">
            {/* Header Banner */}
            <div
                style={{
                    backgroundImage: `url(${printedBg})`,
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                }}
                className="flex flex-col lg:flex-row justify-between w-full mx-auto shadow-2xl border-4 border-gray-300 rounded-lg overflow-hidden"
            >
                <div className="bg-[#92a8d1] text-gray-100 lg:w-1/2 p-8 space-y-4 flex flex-col justify-center">
                    <h3 className="text-4xl font-bold">My Budget Plan</h3>
                    <p className="text-lg">Track your income, expenses, and savings all in one place</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-slate-700 text-white' : 'bg-slate-400 text-white'}`}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('transactions')}
                            className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-slate-700 text-white' : 'bg-slate-400 text-white'}`}
                        >
                            Transactions
                        </button>
                        <button 
                            onClick={() => setActiveTab('charts')}
                            className={`px-4 py-2 rounded ${activeTab === 'charts' ? 'bg-slate-700 text-white' : 'bg-slate-400 text-white'}`}
                        >
                            Charts
                        </button>
                        <button 
                            onClick={resetBudget}
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            Reset All
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2 h-64 lg:h-auto">
                    <img
                        className="w-full h-full object-cover"
                        src={bannerImg} 
                        alt="Budget planning" 
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 mt-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className="bg-green-100 p-4 rounded-full mr-4">
                            <FaMoneyBillWave className="text-green-600 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-gray-500">Total Income</h3>
                            <p className="text-2xl font-bold text-green-600">${incomeTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className="bg-red-100 p-4 rounded-full mr-4">
                            <FaMoneyCheckAlt className="text-red-600 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-gray-500">Total Expenses</h3>
                            <p className="text-2xl font-bold text-red-600">${expensesTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className="bg-blue-100 p-4 rounded-full mr-4">
                            <FaPiggyBank className="text-blue-600 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-gray-500">Total Savings</h3>
                            <p className={`text-2xl font-bold ${savingsTotal >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                ${savingsTotal.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transaction Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select Category</option>
                                {formData.type === 'income' ? (
                                    <>
                                        <option value="Allowance">Allowance</option>
                                        <option value="Part-time Job">Part-time Job</option>
                                        <option value="Scholarship">Scholarship</option>
                                        <option value="Gift">Gift</option>
                                        <option value="Other Income">Other Income</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Books">Books & Supplies</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Utilities">Utilities</option>
                                        <option value="Other Expense">Other Expense</option>
                                    </>
                                )}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                placeholder="Short description"
                            />
                        </div>
                        
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Add Transaction
                            </button>
                        </div>
                    </form>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                    // financialOverview page
                    <FinancialOverview savingsTotal={savingsTotal}
                    transactions={transactions}></FinancialOverview>
                )}

                {activeTab === 'transactions' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
                        {/* transaction table */}
                        {transactions.length > 0 ? (
                            <TransactionTable transactions={transactions}
                            handleDelete={handleDelete}
                            ></TransactionTable>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No transactions yet. Add your first transaction using the form above.</p>
                        )}
                    </div>
                )}

                {activeTab === 'charts' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaChartPie className="mr-2" /> Financial Charts
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-center">Expense Distribution</h3>
                                {pieChartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pieChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-500 text-center py-12">No expense data available. Add some expenses to see the chart.</p>
                                )}
                            </div>
                            
                        <IncomeExpenses barChartData={barChartData}></IncomeExpenses>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetPlan;