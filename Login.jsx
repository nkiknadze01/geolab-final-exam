import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

const loginSchema = yup.object({
  email: yup.string().email('არასწორი ელ-ფოსტის ფორმატი').required('ელ-ფოსტა სავალდებულოა'),
  password: yup.string().min(6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს').required('პაროლი სავალდებულოა'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data.email);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-indigo-600 p-3 rounded-2xl">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">სისტემაში შესვლა</h1>
          <p className="text-sm text-slate-500">მართეთ თქვენი შემოსავლები და ხარჯები მარტივად</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ელ-ფოსტა</label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">პაროლი</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            შესვლა
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          არ გაქვთ ანგარიში?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            რეგისტრაცია
          </Link>
        </p>
      </div>
    </div>
  );
}
