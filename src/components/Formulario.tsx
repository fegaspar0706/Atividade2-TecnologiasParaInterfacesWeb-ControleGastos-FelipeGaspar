import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { categorias } from '../types'
import type { Categoria, Tipo, DadosTransacao, Transacao } from '../types'

interface Props {
  edicao: Transacao | null
  onSalvar: (dados: DadosTransacao) => void
  onCancelar: () => void
}
const campo = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
export default function Formulario({ edicao, onSalvar, onCancelar }: Props) {
  const [descricao, setDescricao] = useState(edicao?.descricao ?? '')
  const [valor, setValor] = useState(edicao ? String(edicao.valor) : '')
  const [categoria, setCategoria] = useState<Categoria>(edicao?.categoria ?? 'outros')
  const [tipo, setTipo] = useState<Tipo>(edicao?.tipo ?? 'despesa')
  const [enviado, setEnviado] = useState(false)
  const erroDescricao = (descricao.match(/\p{L}/gu) ?? []).length < 3
  const numero = Number(valor)
  const erroValor = !Number.isFinite(numero) || numero <= 0

  function salvar(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault()
    setEnviado(true)
    if (erroDescricao || erroValor) {
      return
    }
    onSalvar({ descricao: descricao.trim(), valor: numero, categoria, tipo })
    setDescricao('')
    setValor('')
    setCategoria('outros')
    setTipo('despesa')
    setEnviado(false)
  }

  return <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold mb-5">{edicao ? 'Editar transação' : 'Nova transação'}</h2>
    
    <form onSubmit={salvar} noValidate className="space-y-4">
      <div><label htmlFor="descricao" className="block text-sm font-medium mb-1">Descrição</label><input id="descricao" className={campo} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex.: Ensaio da banda" />
      {enviado && erroDescricao && <p role="alert" className="text-red-600 text-sm mt-1">Digite pelo menos 3 letras.</p>}</div>
      <div><label htmlFor="valor" className="block text-sm font-medium mb-1">Valor (R$)</label><input id="valor" type="number" min="0.01" step="0.01" className={campo} value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" />
      {enviado && erroValor && <p role="alert" className="text-red-600 text-sm mt-1">Informe um valor maior que zero.</p>}</div>
      <div><label htmlFor="categoria" className="block text-sm font-medium mb-1">Categoria</label><select id="categoria" className={campo} value={categoria} onChange={e => setCategoria(e.target.value as Categoria)}>{categorias.map(item => <option key={item} value={item}>{item}</option>)}</select></div>
      <fieldset><legend className="text-sm font-medium mb-2">Tipo</legend><div className="flex gap-5">{(['receita', 'despesa'] as Tipo[]).map(item => <label key={item} className="flex items-center gap-2 capitalize"><input type="radio" name="tipo" checked={tipo === item} onChange={() => setTipo(item)} className="accent-indigo-600" />{item}</label>)}</div></fieldset>
      <button type="submit" className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">{edicao ? 'Salvar alterações' : 'Adicionar transação'}</button>
      {edicao && <button type="button" onClick={onCancelar} className="w-full rounded-lg border border-slate-300 py-2">Cancelar edição</button>}
    </form>
  </section>
}
