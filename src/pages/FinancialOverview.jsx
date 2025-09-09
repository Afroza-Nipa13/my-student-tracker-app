import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const FinancialOverview = ({savingsTotal,transactions}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaChartBar className="mr-2" /> Financial Overview
                        </h2>
                        
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Current Balance</h3>
                            <div className={`text-3xl font-bold p-4 rounded-lg ${savingsTotal >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                ${savingsTotal.toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {savingsTotal >= 0 ? 'You are within budget!' : 'You are overspending!'}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
                                {transactions.length > 0 ? (
                                    <ul className="space-y-2">
                                        {transactions.slice(-5).reverse().map(transaction => (
                                            <li key={transaction._id} className="flex justify-between p-2 border-b">
                                                <div>
                                                    <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {transaction.category}
                                                    </span>
                                                    <p className="text-sm text-gray-500">{transaction.description}</p>
                                                </div>
                                                <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No transactions yet.</p>
                                )}
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Budget Tips</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Try to save at least 20% of your income</li>
                                    <li>Limit eating out to save money on food expenses</li>
                                    <li>Use student discounts whenever possible</li>
                                    <li>Track your small expenses - they add up quickly</li>
                                    <li>Set specific financial goals for each semester</li>
                                </ul>
                            </div>
                        </div>
                    </div>
    );
};

export default FinancialOverview;