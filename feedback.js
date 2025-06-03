document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const feedbackForm = document.getElementById('feedbackForm');

    // Функция для добавления сообщения в чат
    function addMessage(message, isAI = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAI ? 'ai-message' : 'user-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        messageContent.appendChild(messageText);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Прокрутка к последнему сообщению
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Функция для обработки ответа ИИ
    async function handleAIResponse(userMessage) {
        // Здесь можно добавить интеграцию с реальным API ИИ
        // Пока используем простые ответы
        const responses = {
            'привет': 'Здравствуйте! Чем могу помочь?',
            'как дела': 'У меня всё хорошо, спасибо! Как я могу вам помочь?',
            'помощь': 'Я могу помочь вам с вопросами о наших услугах, ценах и процессе работы. Что именно вас интересует?',
            'услуги': 'Мы предоставляем следующие услуги:\n1. Разработка чат-ботов\n2. Разработка игр\n3. Веб-разработка\n4. Видеомонтаж\n\nКакая услуга вас интересует?',
            'цены': 'Цены зависят от сложности проекта и требуемых функций. Давайте обсудим ваш проект подробнее, чтобы я мог дать более точную оценку.',
            'контакты': 'Вы можете связаться с нами через форму обратной связи справа или по следующим контактам:\n- Telegram: @internat\n- WhatsApp: +7 (XXX) XXX-XX-XX\n- Email: info@internat.com'
        };

        // Имитация задержки ответа
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Поиск подходящего ответа
        let response = 'Извините, я не совсем понял ваш вопрос. Можете переформулировать?';
        for (const [key, value] of Object.entries(responses)) {
            if (userMessage.toLowerCase().includes(key)) {
                response = value;
                break;
            }
        }

        addMessage(response, true);
    }

    // Обработчик отправки сообщения
    async function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message);
            userInput.value = '';
            await handleAIResponse(message);
        }
    }

    // Обработчики событий
    sendButton.addEventListener('click', handleSendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Обработка формы обратной связи
    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = feedbackForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const formData = new FormData(feedbackForm);
            const response = await fetch(feedbackForm.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                feedbackForm.reset();
                alert('Thank you for your feedback! We will contact you soon.');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred while sending the form. Please try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
        }
    });
}); 