// --- MÁSCARA DE CPF ---
// Adiciona o evento de digitação no campo CPF
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        
        // Adiciona os pontos e traço
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        
        e.target.value = value; // Atualiza o campo
    });
}

// --- FUNÇÕES DE ARMAZENAMENTO ---

function saveToLocalStorage(person) {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
}

function loadFromLocalStorage() {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    const userList = document.getElementById('user-list');

    if (!userList) return; 

    userList.innerHTML = '';

    if (people.length === 0) {
        userList.innerHTML = '<li style="text-align:center; padding:20px; background:none; border:none;">Nenhum usuário cadastrado.</li>';
        return;
    }

    people.forEach((person, index) => {
        const listItem = document.createElement('li');
        // Layout da lista de consulta
        listItem.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:5px;">
                <strong><i class="fas fa-user"></i> ${person.name}</strong>
                <span style="font-size:13px; color:#666;"><i class="fas fa-envelope"></i> ${person.email}</span>
                <span style="font-size:13px; color:#666;"><i class="fas fa-id-card"></i> CPF: ${person.cpf || 'Não informado'}</span>
            </div>
            <div class="actions">
                <button class="edit-button" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="delete-button" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        userList.appendChild(listItem);
    });
}

// Editar Usuário
function editUser(index) {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    const newName = prompt('Novo nome:', people[index].name);
    const newEmail = prompt('Novo e-mail:', people[index].email);

    if (newName && newEmail) {
        people[index].name = newName;
        people[index].email = newEmail;
        localStorage.setItem('people', JSON.stringify(people));
        loadFromLocalStorage();
    }
}

// Excluir Usuário
function deleteUser(index) {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    if (confirm('Tem certeza que deseja excluir?')) {
        people.splice(index, 1);
        localStorage.setItem('people', JSON.stringify(people));
        loadFromLocalStorage();
    }
}

// --- EVENTOS ---

// Envio do formulário
if (document.getElementById('form')) {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Coleta de dados
        const data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            cpf: document.getElementById('cpf').value,
            rg: document.getElementById('rg').value,
            birthdate: document.getElementById('birthdate').value,
            gender: document.getElementById('gender').value,
            nationality: document.getElementById('nationality').value,
            state: document.getElementById('state').value,
            address: document.getElementById('address').value
        };

        if (data.name && data.email) {
            saveToLocalStorage(data);
            alert('Cadastro realizado com sucesso!');
            document.getElementById('form').reset();
        } else {
            alert('Preencha os campos obrigatórios!');
        }
    });
}

// Inicialização e Botões
document.addEventListener('DOMContentLoaded', function () {
    loadFromLocalStorage();

    const viewUsersBtn = document.getElementById('view-users');
    if (viewUsersBtn) {
        viewUsersBtn.addEventListener('click', () => window.location.href = 'consulta.html');
    }

    const backBtn = document.getElementById('back-button');
    if (backBtn) {
        backBtn.addEventListener('click', () => window.location.href = 'index.html');
    }

    if (document.getElementById('user-list')) {
        document.getElementById('user-list').addEventListener('click', function (event) {
            // Verifica se o clique foi no botão ou no ícone dentro do botão
            const target = event.target.closest('button'); 
            if (!target) return;

            const index = target.dataset.index;
            if (target.classList.contains('edit-button')) editUser(index);
            if (target.classList.contains('delete-button')) deleteUser(index);
        });
    }
});