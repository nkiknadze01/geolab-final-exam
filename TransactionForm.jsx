import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PlusCircle } from 'lucide-react';

const schema = yup.object({
  title: yup.string().required('შეიყვანეთ დასახელება').min(2, 'მინიმუმ 2 სიმბოლო'),
  amount: yup
    .number()
    .typeError('თანხა უნდა იყოს რიცხვი')
    .positive('თანხა უნდა იყოს დადებითი')
    .required('შეიყვანეთ თანხა'),
  type: yup.string().oneOf(['income', 'expense']).required(),
  category: yup.string().required('აირჩიეთ კატეგორია'),
});

export const TransactionForm = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      category: 'კვება',
    },
  });

  const onSubmit = (data) => {
    onAdd({
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString('ka-GE'),
    });
    reset({ title: '', amount: '', type: data.type, category: data.category });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">ახალი ტრანზაქცია</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">დასახელება</label>
          <input
            type="text"
            placeholder="მაგ: ხელფასი, სუპერმარკეტი..."
            {...register('title')}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">თანხა (₾)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount')}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">ტიპი</label>
          <select
            {...register('type')}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="expense">ხარჯი (-)</option>
            <option value="income">შემოსავალი (+)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">კატეგორია</label>
          <select
            {...register('category')}
            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="კვება">კვება</option>
            <option value="ტრანსპორტი">ტრანსპორტი</option>
            <option value="კომუნალური">კომუნალური</option>
            <option value="ხელფასი">ხელფასი</option>
            <option value="გართობა">გართობა</option>
            <option value="სხვა">სხვა</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
      >
        <PlusCircle className="w-4 h-4" />
        <span>დამატება</span>
      </button>
    </form>
  );
};
