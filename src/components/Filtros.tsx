import { categorias } from '../types'
import type { Categoria, Tipo } from '../types'
interface Props {
  categoria: Categoria | 'todas'
  tipo: Tipo | 'todos'
  onCategoria: (categoria: Categoria | 'todas') => void
  onTipo: (tipo: Tipo | 'todos') => void
}
export default function Filtros({ categoria, tipo, onCategoria, onTipo }: Props) {
  return <div className="grid gap-3 sm:grid-cols-2">
    <label className="text-sm font-medium">Categoria<select className="mt-1 w-full rounded-lg border border-slate-300 p-2" value={categoria} onChange={e => onCategoria(e.target.value as Categoria | 'todas')}><option value="todas">Todas</option>{categorias.map(item => <option key={item}>{item}</option>)}</select></label>
    <label className="text-sm font-medium">Tipo<select className="mt-1 w-full rounded-lg border border-slate-300 p-2" value={tipo} onChange={e => onTipo(e.target.value as Tipo | 'todos')}><option value="todos">Todos</option><option value="receita">Receitas</option><option value="despesa">Despesas</option></select></label>
  </div>
}
