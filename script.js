// Alternar visibilidade da senha
function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Exibir nome do arquivo selecionado
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
        const fileName = this.files[0] ? this.files[0].name : 'Nenhum arquivo selecionado';
        const nameLabel = document.getElementById(`${this.id}_name`);
        if (nameLabel) {
            nameLabel.textContent = fileName;
        }
    });
});

// Exibir/ocultar campos específicos conforme categoria
document.querySelectorAll('input[name="categoria"]').forEach(radio => {
    radio.addEventListener('change', function () {
        const rgContainer = document.getElementById('rg_container');
        const anttContainer = document.getElementById('antt_container');

        if (this.value === 'Ajudante') {
            rgContainer.classList.remove('hidden');
            document.getElementById('rg').required = true;
        } else {
            rgContainer.classList.add('hidden');
            document.getElementById('rg').required = false;
        }

        if (this.value === 'Motorista Agregado') {
            anttContainer.classList.remove('hidden');
            document.getElementById('antt').required = true;
        } else {
            anttContainer.classList.add('hidden');
            document.getElementById('antt').required = false;
        }
    });
});

// Drag and drop para arquivos
document.querySelectorAll('.file-input-label').forEach(label => {
    label.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    label.addEventListener('dragleave', function () {
        this.classList.remove('dragover');
    });

    label.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('dragover');

        const input = this.previousElementSibling;
        input.files = e.dataTransfer.files;

        const event = new Event('change');
        input.dispatchEvent(event);
    });
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 3) value = value.substring(0, 3) + '.' + value.substring(3);
    if (value.length > 7) value = value.substring(0, 7) + '.' + value.substring(7);
    if (value.length > 11) value = value.substring(0, 11) + '-' + value.substring(11);
    if (value.length > 14) value = value.substring(0, 14);

    e.target.value = value;
});
