import { useState } from 'react'
import Formulario from './components/Formulario'
import Resumo from './components/Resumo'
import Filtros from './components/Filtros'
import Lista from './components/Lista'
import type { Transacao, DadosTransacao, Categoria, Tipo } from './types'

export default function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [edicao, setEdicao] = useState<Transacao | null>(null)
  const [categoria, setCategoria] = useState<Categoria | 'todas'>('todas')
  const [tipo, setTipo] = useState<Tipo | 'todos'>('todos')
  const receitas = transacoes.filter(item => item.tipo === 'receita').reduce((total, item) => total + item.valor, 0)
  const despesas = transacoes.filter(item => item.tipo === 'despesa').reduce((total, item) => total + item.valor, 0)
  const saldo = receitas - despesas
  const filtradas = transacoes.filter(item => (categoria === 'todas' || item.categoria === categoria) && (tipo === 'todos' || item.tipo === tipo))

  function salvar(dados: DadosTransacao) {
    if (edicao) {
      setTransacoes(anteriores => anteriores.map(item => {
        if (item.id === edicao.id) {
          return { ...dados, id: item.id }
        }
        return item
      }))
      setEdicao(null)
    } else {
      setTransacoes(anteriores => [...anteriores, { ...dados, id: crypto.randomUUID() }])
    }
  }
  function remover(id: string) {
    setTransacoes(anteriores => anteriores.filter(item => item.id !== id))
    if (edicao?.id === id) setEdicao(null)
  }
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">

    <header className="mb-8"><p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Controle de gastos</p>
    <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Atividade - Meu Financeiro</h1>
    <p className="mt-2 text-slate-500">Atividade de Tecnologias Para Interfaces De Aplicações Web - Felipe Gaspar</p>
    </header>

    <Resumo receitas={receitas} despesas={despesas} saldo={saldo} />

    <div className="mt-6 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
      <Formulario key={edicao?.id ?? 'novo'} edicao={edicao} onSalvar={salvar} onCancelar={() => setEdicao(null)} />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm min-w-0">
        <h2 className="mb-4 text-xl font-bold">Transações</h2>
        <Filtros categoria={categoria} tipo={tipo} onCategoria={setCategoria} onTipo={setTipo} />
        <p className="mt-5 mb-2 text-sm text-slate-500">{filtradas.length} de {transacoes.length} transações</p>
        <Lista transacoes={filtradas} onEditar={setEdicao} onRemover={remover} />
      </section>
    </div>

    <footer className="mt-8 text-center text-sm text-slate-500">Atividade 2 · Tecnologias para Interfaces de Aplicações Web</footer>
  </main>
}
