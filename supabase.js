// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsd3ZnanVjandkbXJ0em5jZmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk3NTksImV4cCI6MjA3MDA5NTc1OX0.KKO-8QvN5bnwocKv77ZSpmYtGjZv-Vr5oGA_weOgIu0'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsd3ZnanVjandkbXJ0em5jZmtoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDUxOTc1OSwiZXhwIjoyMDcwMDk1NzU5fQ.a6wiaMs5iJv1YYizJtV1M1hEggDOcd1Su1ssXhdAwg4'
export const supabase = createClient(supabaseUrl, supabaseKey)
// admin.js
import { supabase } from './supabase.js'

async function carregarCadastros() {
  const { data, error } = await supabase.from('cadastros').select('*')
  const tabela = document.getElementById('tabela-cadastros')
  tabela.innerHTML = ''

  data.forEach((cadastro) => {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td>${cadastro.nome}</td>
      <td>${cadastro.email}</td>
      <td>${cadastro.status}</td>
      <td>
        <button onclick="atualizarStatus('${cadastro.id}', 'Aprovado')">Aprovar</button>
        <button onclick="atualizarStatus('${cadastro.id}', 'Reprovado')">Reprovar</button>
        <button onclick="atualizarStatus('${cadastro.id}', 'Revisar Documento')">Solicitar Reenvio</button>
      </td>
    `

    tabela.appendChild(tr)
  })
}

window.atualizarStatus = async (id, status) => {
  await supabase.from('cadastros').update({ status }).eq('id', id)
  carregarCadastros()
}

carregarCadastros()


// status.js
import { supabase } from './supabase.js'

async function verificarStatus() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    document.getElementById('mensagem-status').textContent = 'Você precisa estar logado.'
    return
  }

  const { data, error } = await supabase
    .from('cadastros')
    .select('status')
    .eq('email', user.email)
    .single()

  if (error || !data) {
    document.getElementById('mensagem-status').textContent = 'Cadastro não encontrado.'
  } else {
    document.getElementById('mensagem-status').textContent = `Status: ${data.status}`
  }
}

verificarStatus()
