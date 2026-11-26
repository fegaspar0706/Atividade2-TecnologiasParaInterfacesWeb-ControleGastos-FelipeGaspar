# Meu Financeiro

Atividade 2 — Tecnologias para Interfaces de Aplicações Web — IFTM.

Aplicação para controlar receitas e despesas de um mês, desenvolvida com React, TypeScript, Vite e Tailwind CSS.

## Executar

```bash
npm install
npm run dev
```

Para verificar a tipagem e gerar a versão de produção: `npm run build`.

## Funcionalidades

- Cadastro, edição e remoção de transações.
- Validação de descrição (mínimo de três letras) e valor positivo.
- Categorias: salário, combustível, alimentação, música, estudos e outros.
- Filtros combinados por categoria e tipo.
- Resumo de receitas, despesas e saldo, calculado a partir das transações completas.
- Formatação em reais e layout responsivo.

## Organização

- `App.tsx`: estado elevado, operações imutáveis e cálculos derivados.
- `types.ts`: tipos, categorias e formatação monetária.
- `Formulario.tsx`: formulário controlado e validação.
- `Resumo.tsx`: totais.
- `Filtros.tsx`: seleção dos filtros.
- `Lista.tsx`: exibição e ações das transações.

Os registros ficam na memória durante a sessão. Atualizar a página reinicia a lista. O localStorage não foi implementado.
