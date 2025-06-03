// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Language selector functionality
const languageSelector = document.querySelector('.language-selector select');
if (languageSelector) {
    languageSelector.addEventListener('change', function(e) {
        const selectedLanguage = e.target.value;
        // Here you would typically handle language switching
        console.log('Language changed to:', selectedLanguage);
    });
}

// Простой переводчик
document.addEventListener('DOMContentLoaded', function() {
    // Получаем селектор языка
    const languageSelector = document.querySelector('.language-selector select');
    
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
            'Подать заявку на вакансию': 'Apply for a job',
            'Расскажите о себе и своих навыках': 'Tell us about yourself and your skills',
            'Форма заявки': 'Application form',
            'Желаемая должность': 'Desired position',
            'Выберите должность': 'Select position',
            'Frontend Developer': 'Frontend Developer',
            'Backend Developer': 'Backend Developer',
            'UI/UX Designer': 'UI/UX Designer',
            'Project Manager': 'Project Manager',
            'Другое': 'Other',
            'Опыт работы': 'Work experience',
            'Выберите опыт': 'Select experience',
            'Без опыта': 'No experience',
            'До 1 года': 'Up to 1 year',
            '1-3 года': '1-3 years',
            '3+ года': '3+ years',
            'Навыки': 'Skills',
            'Расскажите о себе': 'Tell us about yourself',
            'Ссылка на портфолио (если есть)': 'Portfolio link (if any)',
            'Резюме': 'Resume',
            'Поддерживаемые форматы: PDF, DOC, DOCX': 'Supported formats: PDF, DOC, DOCX',
            'Почему стоит присоединиться к нам?': 'Why join us?',
            'Интересные проекты': 'Interesting projects',
            'Работа над современными технологиями и инновационными решениями': 'Work on modern technologies and innovative solutions',
            'Профессиональная команда': 'Professional team',
            'Возможность учиться у опытных разработчиков': 'Opportunity to learn from experienced developers',
            'Карьерный рост': 'Career growth',
            'Реальные возможности для развития и повышения квалификации': 'Real opportunities for development and qualification improvement',
            'Work-life balance': 'Work-life balance',
            'Гибкий график и возможность удаленной работы': 'Flexible schedule and remote work possibility',
            'Свяжитесь с нашим HR-менеджером:': 'Contact our HR manager:',
            'Создаем цифровое будущее': 'Creating the digital future',
            'Профессиональная разработка чат-ботов, игр, веб-сайтов и видеомонтаж': 'Professional development of chatbots, games, websites and video editing',
            'Наши услуги': 'Our services',
            'Разработка умных чат-ботов для автоматизации бизнес-процессов': 'Development of smart chatbots for business process automation',
            'Подробнее': 'More',
            'Создание увлекательных игровых проектов любой сложности': 'Creating exciting game projects of any complexity',
            'Современные и отзывчивые веб-сайты для вашего бизнеса': 'Modern and responsive websites for your business',
            'Профессиональная обработка и монтаж видео-контента': 'Professional processing and editing of video content',
            'Мы - команда профессионалов, готовых воплотить ваши идеи в реальность. Наш опыт и экспертиза позволяют создавать качественные digital-решения для бизнеса.': 'We are a team of professionals ready to turn your ideas into reality. Our experience and expertise allow us to create quality digital solutions for business.',
            'Свяжитесь с нами': 'Contact Us',
            'Ваше сообщение': 'Your message',
            'Отправить': 'Send',
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
            'Подать заявку на вакансию': 'Бос орынға өтініш беру',
            'Расскажите о себе и своих навыках': 'Өзіңіз және дағдыларыңыз туралы айтыңыз',
            'Форма заявки': 'Өтініш формасы',
            'Желаемая должность': 'Қалаған лауазым',
            'Выберите должность': 'Лауазымды таңдаңыз',
            'Frontend Developer': 'Frontend әзірлеуші',
            'Backend Developer': 'Backend әзірлеуші',
            'UI/UX Designer': 'UI/UX дизайнер',
            'Project Manager': 'Жоба жетекшісі',
            'Другое': 'Басқа',
            'Опыт работы': 'Жұмыс тәжірибесі',
            'Выберите опыт': 'Тәжірибені таңдаңыз',
            'Без опыта': 'Тәжірибесіз',
            'До 1 года': '1 жылға дейін',
            '1-3 года': '1-3 жыл',
            '3+ года': '3+ жыл',
            'Навыки': 'Дағдылар',
            'Расскажите о себе': 'Өзіңіз туралы айтыңыз',
            'Ссылка на портфолио (если есть)': 'Портфолио сілтемесі (бар болса)',
            'Резюме': 'Резюме',
            'Поддерживаемые форматы: PDF, DOC, DOCX': 'Қолданылатын форматтар: PDF, DOC, DOCX',
            'Почему стоит присоединиться к нам?': 'Неліктен бізбен жұмыс істеу керек?',
            'Интересные проекты': 'Қызығынды жобалар',
            'Работа над современными технологиями и инновационными решениями': 'Заманауи технологиялар мен инновациялық шешімдермен жұмыс',
            'Профессиональная команда': 'Кәсіби команда',
            'Возможность учиться у опытных разработчиков': 'Тәжірибелі әзірлеушілерден үйрену мүмкіндігі',
            'Карьерный рост': 'Мансаптық өсу',
            'Реальные возможности для развития и повышения квалификации': 'Даму және біліктілікті арттыру үшін нақты мүмкіндіктер',
            'Work-life balance': 'Жұмыс-өмір балансы',
            'Гибкий график и возможность удаленной работы': 'Икемді кесте және қашықтан жұмыс мүмкіндігі',
            'Свяжитесь с нашим HR-менеджером:': 'HR-менеджерімізбен байланысыңыз:',
            'Создаем цифровое будущее': 'Сандық болашақты жасау',
            'Профессиональная разработка чат-ботов, игр, веб-сайтов и видеомонтаж': 'Чат-боттар, ойындар, веб-сайттар және бейне монтажды кәсіби әзірлеу',
            'Наши услуги': 'Біздің қызметтер',
            'Разработка умных чат-ботов для автоматизации бизнес-процессов': 'Бизнес процестерін автоматтандыру үшін ақылды чат-боттарды әзірлеу',
            'Подробнее': 'Көбірек',
            'Создание увлекательных игровых проектов любой сложности': 'Кез-келген күрделіліктегі қызығынды ойын жобаларын жасау',
            'Современные и отзывчивые веб-сайты для вашего бизнеса': 'Бизнесіңіз үшін заманауи және жауап беретін веб-сайттар',
            'Профессиональная обработка и монтаж видео-контента': 'Бейне контентті кәсіби өңдеу және монтаж',
            'Мы - команда профессионалов, готовых воплотить ваши идеи в реальность. Наш опыт и экспертиза позволяют создавать качественные digital-решения для бизнеса.': 'Біз идеяларыңызды шындыққа айналдыратын кәсіби мамандар тобымыз. Біздің тәжірибе және салалық біліміміз бизнес үшін сапалы сандық шешімдер жасауға мүмкіндік береді.',
            'Свяжитесь с нами': 'Бізбен байланысыңыз',
            'Ваше сообщение': 'Сіздің хабарламаңыз',
            'Отправить': 'Жіберу',
            'Все права защищены.': 'Барлық құқықтар қорғалған.'
        };
        
        // Выбираем нужный словарь в зависимости от выбранного языка
        let dictionary;
        if (language === 'en') {
            dictionary = ruToEn;
        } else if (language === 'kz') {
            dictionary = ruToKz;
        } else {
            // Если выбран русский язык, не нужно ничего переводить
            return;
        }
        
        // Переводим все текстовые элементы на странице
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, label, button, option, small');
        
        textElements.forEach(element => {
            // Пропускаем элементы, которые не содержат текста
            if (!element.textContent.trim()) return;
            
            // Проверяем, есть ли перевод для этого текста
            for (const [ruText, translatedText] of Object.entries(dictionary)) {
                if (element.textContent.includes(ruText)) {
                    element.textContent = element.textContent.replace(ruText, translatedText);
                }
            }
        });
        
        // Переводим placeholder для input и textarea
        const inputElements = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        
        inputElements.forEach(element => {
            const placeholder = element.getAttribute('placeholder');
            if (placeholder) {
                for (const [ruText, translatedText] of Object.entries(dictionary)) {
                    if (placeholder.includes(ruText)) {
                        element.setAttribute('placeholder', placeholder.replace(ruText, translatedText));
                    }
                }
            }
        });
    }
}); 