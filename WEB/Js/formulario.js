const API_URL = 'http://localhost:8080/api/voluntarios';


async function cadastroVoluntarios(event){
    event.preventDefault();

    const voluntario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        interesse: document.getElementById('interesse').value
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voluntario)
    });
    if(res.ok){
        alert('Cadastro realizado com sucesso!');
        const form = document.getElementById('formulario');
        if (form) form.reset();
        if(typeof listarVoluntarios === 'function') listarVoluntarios();
    }else{
        alert('Erro ao cadastrar voluntário. Tente novamente.');
    }
}

async function listarVoluntarios(){
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Falha ao buscar voluntários');
        const voluntarios = await res.json();
        const tabela = document.getElementById('tabela-voluntarios');
        if (!tabela) return; // página diferente
        tabela.innerHTML = "";

        voluntarios.forEach(v => {
            tabela.innerHTML += `   <tr>
                    <td>${v.id}</td>
                    <td>${v.nome}</td>
                    <td>${v.email}</td>
                    <td>${v.telefone}</td>
                    <td>${v.interesse}</td>
                    <td>
                        <span class="material-icons edit" onclick="editar(${v.id})">edit</span>
                        <span class="material-icons delete" onclick="deletarVoluntario(${v.id})">delete</span>
                    </td>
                </tr>
            `;
        });
    } catch (e) {
        console.error(e);
        alert('Não foi possível carregar a lista de voluntários.');
    }
}

async function deletarVoluntario(id){
    if(confirm('Tem certeza que deseja deletar este voluntário?')){
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert('Voluntário deletado com sucesso.');
            if(typeof listarVoluntarios === 'function') listarVoluntarios();
        } else {
            alert('Erro ao deletar voluntário.');
        }
    }
}

async function editar(id) {
    // Redireciona para a página de formulário no modo edição
    window.location.href = "formulario.html?id=" + id;
}


async function atualizarVoluntario(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    const voluntario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        interesse: document.getElementById("interesse").value
    };

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voluntario)
    });

    if (response.ok) {
        alert("Voluntário atualizado com sucesso!");
        const form = document.getElementById("formulario");
        if (form) form.reset();
        const btnSalvar = document.getElementById("btnSalvar");
        const btnAtualizar = document.getElementById("btnAtualizar");
        if (btnSalvar) btnSalvar.style.display = "inline-block";
        if (btnAtualizar) btnAtualizar.style.display = "none";
        // Opcional: voltar para a lista
        // window.location.href = 'verificar.html';
    } else {
        alert('Erro ao atualizar voluntário.');
    }
}

// Inicializações por página
document.addEventListener('DOMContentLoaded', async () => {
    // Se estiver na página do formulário, conecta o submit e trata modo edição
    const form = document.getElementById('formulario');
    if (form) {
        form.addEventListener('submit', cadastroVoluntarios);

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            // Modo edição: carrega dados e troca botões
            try {
                const res = await fetch(`${API_URL}/${id}`);
                if (res.ok) {
                    const v = await res.json();
                    document.getElementById('id').value = v.id ?? id;
                    document.getElementById('nome').value = v.nome ?? '';
                    document.getElementById('email').value = v.email ?? '';
                    document.getElementById('telefone').value = v.telefone ?? '';
                    document.getElementById('interesse').value = v.interesse ?? '';
                }
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar os dados do voluntário.');
            }
            const btnSalvar = document.getElementById('btnSalvar');
            const btnAtualizar = document.getElementById('btnAtualizar');
            if (btnSalvar) btnSalvar.style.display = 'none';
            if (btnAtualizar) btnAtualizar.style.display = 'inline-block';
        }
    }

    // Se estiver na página de verificação (tabela existe), carrega a lista
    const tabela = document.getElementById('tabela-voluntarios');
    if (tabela && typeof listarVoluntarios === 'function') {
        listarVoluntarios();
    }
});
