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

// Функционал переключения языков
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все селекторы языков на странице
    const languageSelectors = document.querySelectorAll('.language-selector select');
    
    // Добавляем обработчики событий для каждого селектора
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    });
    
    // Функция для смены языка
    function changeLanguage(language) {
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('selectedLanguage', language);
        
        // Применяем перевод без перезагрузки страницы
        applyTranslation(language);
    }
    
    // Проверяем, есть ли сохраненный язык в localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        // Устанавливаем сохраненный язык в селекторы
        languageSelectors.forEach(selector => {
            selector.value = savedLanguage;
        });
        
        // Применяем перевод
        applyTranslation(savedLanguage);
    }
    
    // Функция для применения перевода
    function applyTranslation(language) {
        // Получаем все элементы с атрибутом data-translate
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        // Для каждого элемента применяем перевод
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                // Если это input или textarea, меняем placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    // Иначе меняем текст
                    element.textContent = translations[language][key];
                }
            }
        });
    }
    
    // Объект с переводами
    const translations = {
        'ru': {
            // Русский язык (текущий язык сайта)
            // Здесь не нужно добавлять переводы, так как сайт уже на русском
        },
        'en': {
            // Английский язык
            'services': 'Services',
            'portfolio': 'Portfolio',
            'about': 'About Us',
            'contact': 'Contact',
            'vacancies': 'Vacancies',
            'order_service': 'Order Service',
            'tell_about_project': 'Tell us about your project',
            'name': 'Your name',
            'phone': 'Phone number',
            'email': 'Email',
            'service_type': 'Service type',
            'select_service': 'Select service',
            'chatbot': 'Chatbots',
            'game': 'Game Development',
            'web': 'Web Development',
            'video': 'Video Editing',
            'budget': 'Project budget',
            'select_budget': 'Select budget',
            'small': 'Up to 100,000 ₸',
            'medium': '100,000 - 500,000 ₸',
            'large': '500,000 - 1,000,000 ₸',
            'enterprise': 'More than 1,000,000 ₸',
            'deadline': 'Desired completion time',
            'select_deadline': 'Select deadline',
            'urgent': 'Urgent (up to 1 month)',
            'normal': 'Standard (1-3 months)',
            'flexible': 'Flexible (3+ months)',
            'project_description': 'Project description',
            'submit_request': 'Submit request',
            'why_choose_us': 'Why choose us?',
            'professional_approach': 'Professional approach',
            'professional_approach_desc': 'We use modern technologies and best practices in development',
            'deadlines': 'Meeting deadlines',
            'deadlines_desc': 'We always complete projects on time',
            'transparent_communication': 'Transparent communication',
            'transparent_communication_desc': 'We keep you informed of all development stages',
            'quality_guarantee': 'Quality guarantee',
            'quality_guarantee_desc': 'We provide a warranty for all our work',
            'questions': 'Have questions?',
            'contact_directly': 'Contact us directly:',
            'apply': 'Apply',
            'tell_about_yourself': 'Tell us about yourself and your skills',
            'position': 'Desired position',
            'select_position': 'Select position',
            'frontend': 'Frontend Developer',
            'backend': 'Backend Developer',
            'designer': 'UI/UX Designer',
            'pm': 'Project Manager',
            'other': 'Other position',
            'experience': 'Work experience',
            'select_experience': 'Select experience',
            'no': 'No experience',
            'junior': 'Up to 1 year',
            'middle': '1-3 years',
            'senior': '3+ years',
            'skills': 'Your skills',
            'skills_placeholder': 'Tell us about your technical skills, programming languages, tools, etc.',
            'about_me': 'About me',
            'about_me_placeholder': 'Tell us about yourself, your experience, achievements and why you want to work with us',
            'portfolio_link': 'Portfolio link (if any)',
            'resume': 'Resume',
            'supported_formats': 'Supported formats: PDF, DOC, DOCX',
            'what_we_offer': 'What we offer?',
            'modern_technologies': 'Modern technologies',
            'modern_technologies_desc': 'Work with cutting-edge technologies and tools',
            'friendly_team': 'Friendly team',
            'friendly_team_desc': 'Team of professionals ready to help and support',
            'development': 'Development',
            'development_desc': 'Opportunities for professional growth and learning',
            'work_life_balance': 'Work-life balance',
            'work_life_balance_desc': 'Flexible schedule and remote work possibility',
            'hr_contact': 'Contact our HR manager:',
            'create_digital_future': 'Creating the digital future',
            'professional_development': 'Professional development of chatbots, games, websites and video editing',
            'our_services': 'Our services',
            'smart_chatbots': 'Smart chatbots for business process automation',
            'more': 'More',
            'exciting_games': 'Creating exciting game projects of any complexity',
            'modern_websites': 'Modern and responsive websites for your business',
            'professional_video': 'Professional processing and editing of video content',
            'about_us': 'About Us',
            'about_us_desc': 'We are a team of professionals ready to turn your ideas into reality. Our experience and expertise allow us to create quality digital solutions for business.',
            'contact_us': 'Contact Us',
            'your_message': 'Your message',
            'send': 'Send',
            'all_rights_reserved': 'All rights reserved.'
        },
        'kz': {
            // Казахский язык
            'services': 'Қызметтер',
            'portfolio': 'Портфолио',
            'about': 'Біз туралы',
            'contact': 'Байланыс',
            'vacancies': 'Бос орындар',
            'order_service': 'Қызмет тапсырысы',
            'tell_about_project': 'Жобаңыз туралы айтыңыз',
            'name': 'Атыңыз',
            'phone': 'Телефон нөірі',
            'email': 'Email',
            'service_type': 'Қызмет түрі',
            'select_service': 'Қызметті таңдаңыз',
            'chatbot': 'Чат-боттар',
            'game': 'Ойындарды әзірлеу',
            'web': 'Веб-әзірлеу',
            'video': 'Бейне монтаж',
            'budget': 'Жоба бюджеті',
            'select_budget': 'Бюджетті таңдаңыз',
            'small': '100,000 ₸ дейін',
            'medium': '100,000 - 500,000 ₸',
            'large': '500,000 - 1,000,000 ₸',
            'enterprise': '1,000,000 ₸ дан жоғары',
            'deadline': 'Аяқтау мерзімі',
            'select_deadline': 'Мерзімді таңдаңыз',
            'urgent': 'Жаппай (1 айға дейін)',
            'normal': 'Стандартты (1-3 ай)',
            'flexible': 'Икемді (3+ ай)',
            'project_description': 'Жоба сипаттамасы',
            'submit_request': 'Сұранысты жіберу',
            'why_choose_us': 'Неліктен бізді таңдау керек?',
            'professional_approach': 'Кәсіби көзқарас',
            'professional_approach_desc': 'Біз әзірлеуде заманауи технологиялар мен ең жақсы тәжірибелерді қолданамыз',
            'deadlines': 'Мерзімдерді сақтау',
            'deadlines_desc': 'Біз әрқашан жобаларды уақытында аяқтаймыз',
            'transparent_communication': 'Шағын байланыс',
            'transparent_communication_desc': 'Біз сізді әзірлеудің барлық кезеңдері туралы хабардар етеміз',
            'quality_guarantee': 'Сапа кепілі',
            'quality_guarantee_desc': 'Біз барлық жұмыстарға кепілдік береміз',
            'questions': 'Сұрақтарыңыз бар ма?',
            'contact_directly': 'Бізбен тікелей байланысыңыз:',
            'apply': 'Өтініш беру',
            'tell_about_yourself': 'Өзіңіз және дағдыларыңыз туралы айтыңыз',
            'position': 'Қалаған лауазым',
            'select_position': 'Лауазымды таңдаңыз',
            'frontend': 'Frontend әзірлеуші',
            'backend': 'Backend әзірлеуші',
            'designer': 'UI/UX дизайнер',
            'pm': 'Жоба жетекшісі',
            'other': 'Басқа лауазым',
            'experience': 'Жұмыс тәжірибесі',
            'select_experience': 'Тәжірибені таңдаңыз',
            'no': 'Тәжірибесіз',
            'junior': '1 жылға дейін',
            'middle': '1-3 жыл',
            'senior': '3+ жыл',
            'skills': 'Сіздің дағдыларыңыз',
            'skills_placeholder': 'Техникалық дағдыларыңыз, бағдарламалау тілдері, құралдар туралы айтыңыз',
            'about_me': 'Өзім туралы',
            'about_me_placeholder': 'Өзіңіз, тәжірибеніз, жетістіктеріңіз және неліктен бізбен жұмыс істегіңіз келетіні туралы айтыңыз',
            'portfolio_link': 'Портфолио сілтемесі (бар болса)',
            'resume': 'Резюме',
            'supported_formats': 'Қолданылатын форматтар: PDF, DOC, DOCX',
            'what_we_offer': 'Біз не ұсынамыз?',
            'modern_technologies': 'Заманауи технологиялар',
            'modern_technologies_desc': 'Озық технологиялар мен құралдармен жұмыс',
            'friendly_team': 'Достық команда',
            'friendly_team_desc': 'Көмектесуге және қолдауға дайын кәсіби мамандар тобы',
            'development': 'Даму',
            'development_desc': 'Кәсіби өсу және оқу мүмкіндіктері',
            'work_life_balance': 'Жұмыс-өмір балансы',
            'work_life_balance_desc': 'Икемді кесте және қашықтан жұмыс мүмкіндігі',
            'hr_contact': 'HR-менеджерімізбен байланысыңыз:',
            'create_digital_future': 'Сандық болашақты жасау',
            'professional_development': 'Чат-боттар, ойындар, веб-сайттар және бейне монтажды кәсіби әзірлеу',
            'our_services': 'Біздің қызметтер',
            'smart_chatbots': 'Бизнес процестерін автоматтандыру үшін ақылды чат-боттар',
            'more': 'Көбірек',
            'exciting_games': 'Кез-келген күрделіліктегі қызығынды ойын жобаларын жасау',
            'modern_websites': 'Бизнесіңіз үшін заманауи және жауап беретін веб-сайттар',
            'professional_video': 'Бейне контентті кәсіби өңдеу және монтаж',
            'about_us': 'Біз туралы',
            'about_us_desc': 'Біз идеяларыңызды шындыққа айналдыратын кәсіби мамандар тобымыз. Біздің тәжірибе және салалық біліміміз бизнес үшін сапалы сандық шешімдер жасауға мүмкіндік береді.',
            'contact_us': 'Бізбен байланысыңыз',
            'your_message': 'Сіздің хабарламаңыз',
            'send': 'Жіберу',
            'all_rights_reserved': 'Барлық құқықтар қорғалған.'
        }
    };
}); 