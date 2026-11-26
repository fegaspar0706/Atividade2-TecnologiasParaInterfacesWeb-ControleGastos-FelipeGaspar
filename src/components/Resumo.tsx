import { moeda } from '../types'

interface Props { 
  receitas: number; 
  despesas: number; 
  saldo: number 
}

export default function Resumo({ receitas, despesas, saldo }: Props) {
  return <section aria-label="Resumo financeiro" className="grid gap-3 sm:grid-cols-3">
    <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Receitas</p><p className="mt-2 text-xl font-bold text-emerald-700 break-words">{moeda(receitas)}</p></div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Despesas</p><p className="mt-2 text-xl font-bold text-red-600 break-words">{moeda(despesas)}</p></div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Saldo</p><p className={`mt-2 text-xl font-bold break-words ${saldo < 0 ? 'text-red-600' : 'text-indigo-700'}`}>{moeda(saldo)}</p></div>
  </section>
}
