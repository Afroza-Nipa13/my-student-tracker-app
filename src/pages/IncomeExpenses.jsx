import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenses = ({barChartData}) => {
    return (
        <div>
                                <h3 className="text-xl font-semibold mb-4 text-center">Income vs Expenses</h3>
                                {barChartData.some(item => item.amount > 0) ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={barChartData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                                            <Legend />
                                            <Bar dataKey="amount" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-500 text-center py-12">No financial data available. Add some transactions to see the chart.</p>
                                )}
                            </div>
    );
};

export default IncomeExpenses;