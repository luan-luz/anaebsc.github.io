// Credenciais de teste
const TEST_USERNAME = 'admin';
const TEST_PASSWORD = 'admin';

// Estado da aplicação
let isLoggedIn = false;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Garantir que apenas o formulário de login esteja visível
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('addDateTimeModal').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// Função de login
function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
        isLoggedIn = true;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadSchedules();
    } else {
        alert('Usuário ou senha incorretos! Use admin/admin');
    }
}

// Função de logout
function handleLogout() {
    isLoggedIn = false;
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('schedulesList').classList.add('hidden');
    document.getElementById('addDateTimeModal').classList.add('hidden');
}

// Carregar agendamentos
function loadSchedules() {
    if (!isLoggedIn) return;

    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    const schedulesList = document.getElementById('schedulesList');
    schedulesList.innerHTML = '';
    schedulesList.classList.remove('hidden');

    if (schedules.length === 0) {
        schedulesList.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
        return;
    }

    schedules.forEach((schedule, index) => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.innerHTML = `
            <p>Nome: ${schedule.name}</p>
            <p>Email: ${schedule.email}</p>
            <p>Telefone: ${schedule.phone}</p>
            <p>Data: ${formatDate(schedule.date)} às ${schedule.time}</p>
            <p>Status: <span class="status-${schedule.status}">${schedule.status}</span></p>
            <button onclick="confirmSchedule(${index})">Confirmar</button>
            <button onclick="sendWhatsApp('${schedule.phone}', '${schedule.date}', '${schedule.time}')">
                Enviar WhatsApp
            </button>
        `;
        schedulesList.appendChild(div);
    });
}

// Funções auxiliares
function showAddDateTimeModal() {
    if (!isLoggedIn) {
        alert('Você precisa estar logado para adicionar horários!');
        return;
    }
    document.getElementById('addDateTimeModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('addDateTimeModal').classList.add('hidden');
}

function confirmSchedule(index) {
    if (!isLoggedIn) return;
    
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    schedules[index].status = 'confirmed';
    localStorage.setItem('schedules', JSON.stringify(schedules));
    loadSchedules();
}

function sendWhatsApp(phone, date, time) {
    if (!isLoggedIn) return;
    
    const message = `Seu agendamento para ${formatDate(date)} às ${time} foi confirmado!`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('pt-BR');
}

function addDateTime() {
    if (!isLoggedIn) {
        alert('Você precisa estar logado para adicionar horários!');
        return;
    }

    const date = document.getElementById('newDate').value;
    const time = document.getElementById('newTime').value;

    if (!date || !time) {
        alert('Por favor, preencha a data e o horário');
        return;
    }

    const availableTimes = JSON.parse(localStorage.getItem('availableTimes') || '[]');
    availableTimes.push({ date, time });
    localStorage.setItem('availableTimes', JSON.stringify(availableTimes));
    
    alert('Horário adicionado com sucesso!');
    closeModal();
} 