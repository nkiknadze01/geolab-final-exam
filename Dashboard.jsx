import { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { TransactionForm } from '../components/TransactionForm';
import { FinanceChart } from '../components/FinanceChart';
import { TrendingUp, TrendingDown, DollarSign, Trash2, Search } from 'lucide-react';

const initialTransactions = [
  { id: 1, title: 'ხელფასი', amount: 2500, type: 'income', category: 'ხელფასი', date: '10/11/2026' },
  { id: 2, title: 'სუპერმარკეტი', amount: 145.5, type: 'expense', category: 'კვება', date: '11/11/2026' },
  { id: 3, title: 'საწვავი', amount: 90, type: 'expense', category: 'ტრანსპორტი', date: '12/11/2026' },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const { income, expense, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'income') inc += Number(tx.amount);
      else exp += Number(tx.amount);
    });
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filterType === 'all' || tx.type === filterType;
      const matchesSearch =
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [transactions, filterType, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">მიმდინარე ბალანსი</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{balance.toFixed(2)} ₾</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">სულ შემოსავალი</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">+{income.toFixed(2)} ₾</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">სულ ხარჯი</p>
              <p className="text-2xl font-bold text-red-600 mt-1">-{expense.toFixed(2)} ₾</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl text-red-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Form & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm onAdd={handleAddTransaction} />
          <FinanceChart income={income} expense={expense} />
        </div>

        {/* Transactions History */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-800">ტრანზაქციების ისტორია</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="ძებნა..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="all">ყველა</option>
                <option value="income">მხოლოდ შემოსავალი</option>
                <option value="expense">მხოლოდ ხარჯი</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-200">
                  <th className="py-3.5 px-6">დასახელება</th>
                  <th className="py-3.5 px-6">კატეგორია</th>
                  <th className="py-3.5 px-6">თარიღი</th>
                  <th className="py-3.5 px-6">თანხა</th>
                  <th className="py-3.5 px-6 text-right">მოქმედება</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      ტრანზაქციები არ მოიძებნა
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-medium text-slate-800">{tx.title}</td>
                      <td className="py-4 px-6">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">{tx.date}</td>
                      <td
                        className={`py-4 px-6 font-semibold ${
                          tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '-'}
                        {Number(tx.amount).toFixed(2)} ₾
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteTransaction(tx.id)}
                          aria-label="Delete"
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
