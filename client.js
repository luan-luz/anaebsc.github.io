// Dados mockados para teste
const MOCK_AVAILABLE_TIMES = [
    { date: '2024-03-25', times: ['09:00', '10:00', '14:00', '15:00'] },
    { date: '2024-03-26', times: ['09:00', '11:00', '14:00', '16:00'] },
    { date: '2024-03-27', times: ['10:00', '11:00', '15:00', '16:00'] },
    { date: '2024-03-28', times: ['09:00', '10:00', '14:00', '15:00'] },
    { date: '2024-03-29', times: ['09:00', '11:00', '14:00', '16:00'] }
];

// Carrega as datas disponíveis ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    loadAvailableDates();
});

function loadAvailableDates() {
    const dateSelect = document.getElementById('dateSelect');
    dateSelect.innerHTML = '<option value="">Selecione uma data</option>';
    
    MOCK_AVAILABLE_TIMES.forEach(({ date }) => {
        dateSelect.innerHTML += `<option value="${date}">${formatDate(date)}</option>`;
    });
}

// Carregar horários quando uma data for selecionada
document.getElementById('dateSelect').addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const timeSelect = document.getElementById('timeSelect');
    timeSelect.innerHTML = '<option value="">Selecione um horário</option>';
    
    const availableTimes = MOCK_AVAILABLE_TIMES.find(item => item.date === selectedDate);
    if (availableTimes) {
        availableTimes.times.forEach(time => {
            timeSelect.innerHTML += `<option value="${time}">${time}</option>`;
        });
    }
});

function createScheduling() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('dateSelect').value;
    const time = document.getElementById('timeSelect').value;

    if (!name || !email || !phone || !date || !time) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    // Simular salvamento do agendamento
    const scheduling = {
        name,
        email,
        phone,
        date,
        time,
        status: 'pending'
    };

    // Salvar no localStorage para teste
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    schedules.push(scheduling);
    localStorage.setItem('schedules', JSON.stringify(schedules));

    // Mostrar mensagem de sucesso
    document.getElementById('schedulingForm').classList.add('hidden');
    document.getElementById('confirmationMessage').classList.remove('hidden');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('pt-BR');
}
