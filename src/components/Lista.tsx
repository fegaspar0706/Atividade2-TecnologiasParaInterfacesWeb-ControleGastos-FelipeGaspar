import { moeda } from '../types'
import type { Transacao } from '../types'

interface Props { 
  transacoes: Transacao[]; 
  onEditar: (transacao: Transacao) => void; 
  onRemover: (id: string) => void 
}

export default function Lista({ transacoes, onEditar, onRemover }: Props) {

if (transacoes.length === 0) {
  return (
    <p className="rounded-lg bg-slate-50 p-8 text-center text-slate-500">
      Nenhuma transação encontrada.
    </p>
  )
} else {
  return (
    <ul className="divide-y divide-slate-200">
      {transacoes.map(item => {
        let cor = ''
        let sinal = ''

        if (item.tipo === 'receita') {
          cor = 'text-emerald-700'
          sinal = '+'
        } else {
          cor = 'text-red-600'
          sinal = '−'
        }

        return (
          <li
            key={item.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-semibold break-words">
                {item.descricao}
              </p>

              <p className="text-sm text-slate-500 capitalize">
                {item.categoria} · {item.tipo}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`font-bold ${cor}`}>
                {sinal} {moeda(item.valor)}
              </span>

              <button
                onClick={() => onEditar(item)}
                className="rounded-md bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-100"
              >
                Editar
              </button>

              <button
                onClick={() => onRemover(item.id)}
                className="rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
              >
                Remover
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
}
