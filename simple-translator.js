// Простой переводчик
document.addEventListener('DOMContentLoaded', function() {
    // Получаем селектор языка
    const languageSelector = document.querySelector('.language-selector select');
    
    // Сохраняем оригинальные тексты при загрузке страницы
    const originalTexts = new Map();
    
    // Функция для сохранения оригинального текста
    function saveOriginalText(element) {
        if (!originalTexts.has(element)) {
            originalTexts.set(element, element.textContent);
        }
    }
    
    // Сохраняем оригинальные тексты для всех элементов
    function saveAllOriginalTexts() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, label, button, option, small');
        textElements.forEach(saveOriginalText);
        
        const inputElements = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputElements.forEach(element => {
            if (!originalTexts.has(element)) {
                originalTexts.set(element, element.getAttribute('placeholder'));
            }
        });
    }
    
    // Сохраняем оригинальные тексты при загрузке
    saveAllOriginalTexts();
    
    // Добавляем обработчик события изменения языка
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            simpleTranslate(selectedLanguage);
        });
    }
    
    // Функция простого перевода
    function simpleTranslate(language) {
        // Словарь для перевода с русского на английский
        const ruToEn = {
            'Услуги': 'Services',
            'Портфолио': 'Portfolio',
            'О нас': 'About Us',
            'Контакты': 'Contact',
            'Вакансии': 'Vacancies',
            'Заказать услугу': 'Order Service',
            'Расскажите о вашем проекте': 'Tell us about your project',
            'Ваше имя': 'Your name',
            'Номер телефона': 'Phone number',
            'Email': 'Email',
            'Тип услуги': 'Service type',
            'Выберите услугу': 'Select service',
            'Чат-боты': 'Chatbots',
            'Разработка игр': 'Game Development',
            'Веб-разработка': 'Web Development',
            'Видеомонтаж': 'Video Editing',
            'Бюджет проекта': 'Project budget',
            'Выберите бюджет': 'Select budget',
            'До 100,000 ₸': 'Up to 100,000 ₸',
            '100,000 - 500,000 ₸': '100,000 - 500,000 ₸',
            '500,000 - 1,000,000 ₸': '500,000 - 1,000,000 ₸',
            'Более 1,000,000 ₸': 'More than 1,000,000 ₸',
            'Желаемый срок выполнения': 'Desired completion time',
            'Выберите срок': 'Select deadline',
            'Срочно (до 1 месяца)': 'Urgent (up to 1 month)',
            'Стандартно (1-3 месяца)': 'Standard (1-3 months)',
            'Гибкий (3+ месяца)': 'Flexible (3+ months)',
            'Описание проекта': 'Project description',
            'Отправить заявку': 'Submit request',
            'Почему выбирают нас?': 'Why choose us?',
            'Профессиональный подход': 'Professional approach',
            'Мы используем современные технологии и лучшие практики в разработке': 'We use modern technologies and best practices in development',
            'Соблюдение сроков': 'Meeting deadlines',
            'Мы всегда выполняем проекты в оговоренные сроки': 'We always complete projects on time',
            'Прозрачное общение': 'Transparent communication',
            'Мы держим вас в курсе всех этапов разработки': 'We keep you informed of all development stages',
            'Гарантия качества': 'Quality guarantee',
            'Мы предоставляем гарантию на все наши работы': 'We provide a warranty for all our work',
            'Остались вопросы?': 'Have questions?',
            'Свяжитесь с нами напрямую:': 'Contact us directly:',
            'Все права защищены.': 'All rights reserved.'
        };
        
        // Словарь для перевода с русского на казахский
        const ruToKz = {
            'Услуги': 'Қызметтер',
            'Портфолио': 'Портфолио',
            'О нас': 'Біз туралы',
            'Контакты': 'Байланыс',
            'Вакансии': 'Бос орындар',
            'Заказать услугу': 'Қызмет тапсырысы',
            'Расскажите о вашем проекте': 'Жобаңыз туралы айтыңыз',
            'Ваше имя': 'Атыңыз',
            'Номер телефона': 'Телефон нөірі',
            'Email': 'Email',
            'Тип услуги': 'Қызмет түрі',
            'Выберите услугу': 'Қызметті таңдаңыз',
            'Чат-боты': 'Чат-боттар',
            'Разработка игр': 'Ойындарды әзірлеу',
            'Веб-разработка': 'Веб-әзірлеу',
            'Видеомонтаж': 'Бейне монтаж',
            'Бюджет проекта': 'Жоба бюджеті',
            'Выберите бюджет': 'Бюджетті таңдаңыз',
            'До 100,000 ₸': '100,000 ₸ дейін',
            '100,000 - 500,000 ₸': '100,000 - 500,000 ₸',
            '500,000 - 1,000,000 ₸': '500,000 - 1,000,000 ₸',
            'Более 1,000,000 ₸': '1,000,000 ₸ дан жоғары',
            'Желаемый срок выполнения': 'Аяқтау мерзімі',
            'Выберите срок': 'Мерзімді таңдаңыз',
            'Срочно (до 1 месяца)': 'Жаппай (1 айға дейін)',
            'Стандартно (1-3 месяца)': 'Стандартты (1-3 ай)',
            'Гибкий (3+ месяца)': 'Икемді (3+ ай)',
            'Описание проекта': 'Жоба сипаттамасы',
            'Отправить заявку': 'Сұранысты жіберу',
            'Почему выбирают нас?': 'Неліктен бізді таңдау керек?',
            'Профессиональный подход': 'Кәсіби көзқарас',
            'Мы используем современные технологии и лучшие практики в разработке': 'Біз әзірлеуде заманауи технологиялар мен ең жақсы тәжірибелерді қолданамыз',
            'Соблюдение сроков': 'Мерзімдерді сақтау',
            'Мы всегда выполняем проекты в оговоренные сроки': 'Біз әрқашан жобаларды уақытында аяқтаймыз',
            'Прозрачное общение': 'Шағын байланыс',
            'Мы держим вас в курсе всех этапов разработки': 'Біз сізді әзірлеудің барлық кезеңдері туралы хабардар етеміз',
            'Гарантия качества': 'Сапа кепілі',
            'Мы предоставляем гарантию на все наши работы': 'Біз барлық жұмыстарға кепілдік береміз',
            'Остались вопросы?': 'Сұрақтарыңыз бар ма?',
            'Свяжитесь с нами напрямую:': 'Бізбен тікелей байланысыңыз:',
            'Все права защищены.': 'Барлық құқықтар қорғалған.'
        };
        
        // Выбираем нужный словарь в зависимости от выбранного языка
        let dictionary;
        if (language === 'en') {
            dictionary = ruToEn;
        } else if (language === 'kz') {
            dictionary = ruToKz;
        } else {
            // Если выбран русский язык, возвращаем оригинальные тексты
            restoreOriginalTexts();
            return;
        }
        
        // Переводим все текстовые элементы на странице
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, label, button, option, small');
        
        textElements.forEach(element => {
            const originalText = originalTexts.get(element);
            if (!originalText) return;
            
            let translatedText = originalText;
            for (const [ruText, translatedValue] of Object.entries(dictionary)) {
                if (originalText.includes(ruText)) {
                    translatedText = translatedText.replace(ruText, translatedValue);
                }
            }
            element.textContent = translatedText;
        });
        
        // Переводим placeholder для input и textarea
        const inputElements = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        
        inputElements.forEach(element => {
            const originalPlaceholder = originalTexts.get(element);
            if (!originalPlaceholder) return;
            
            let translatedPlaceholder = originalPlaceholder;
            for (const [ruText, translatedValue] of Object.entries(dictionary)) {
                if (originalPlaceholder.includes(ruText)) {
                    translatedPlaceholder = translatedPlaceholder.replace(ruText, translatedValue);
                }
            }
            element.setAttribute('placeholder', translatedPlaceholder);
        });
    }
    
    // Функция для восстановления оригинальных текстов
    function restoreOriginalTexts() {
        originalTexts.forEach((originalText, element) => {
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', originalText);
            } else {
                element.textContent = originalText;
            }
        });
    }
}); 