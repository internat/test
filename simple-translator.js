/ Dictionary for translations
const translations = {
    en: {
        'services': 'Services',
        'portfolio': 'Portfolio',
        'about': 'About Us',
        'contact': 'Contact',
        'vacancies': 'Vacancies',
        'creating_digital_future': 'Creating Digital Future',
        'professional_development': 'Professional development of chatbots, games, websites and video editing',
        'order_service': 'Order Service',
        'our_services': 'Our Services',
        'chatbot': 'Chatbots',
        'chatbot_desc': 'Development of smart chatbots for business process automation',
        'game': 'Game Development',
        'game_desc': 'Creation of exciting game projects of any complexity',
        'web': 'Web Development',
        'web_desc': 'Modern and responsive websites for your business',
        'video': 'Video Editing',
        'video_desc': 'Professional video content processing and editing',
        'learn_more': 'Learn More',
        'about_us': 'About Us',
        'about_text': 'We are a team of professionals ready to bring your ideas to life',
        'contact_us': 'Contact Us',
        'name': 'Your Name',
        'phone': 'Phone Number',
        'email': 'Email',
        'message': 'Your Message',
        'send': 'Send',
        'all_rights_reserved': 'All rights reserved'
    },
    kz: {
        'services': 'Қызметтер',
        'portfolio': 'Портфолио',
        'about': 'Біз туралы',
        'contact': 'Байланыс',
        'vacancies': 'Бос орындар',
        'creating_digital_future': 'Сандық болашақты құру',
        'professional_development': 'Чат-боттарды, ойындарды, веб-сайттарды және бейне монтаждауды кәсіби дамыту',
        'order_service': 'Қызметті тапсырыс беру',
        'our_services': 'Біздің қызметтер',
        'chatbot': 'Чат-боттар',
        'chatbot_desc': 'Бизнес үрдістерін автоматтандыруға арналған ақылды чат-боттарды әзірлеу',
        'game': 'Ойындарды әзірлеу',
        'game_desc': 'Кез келген күрделіліктегі қызықты ойын жобаларын жасау',
        'web': 'Веб-әзірлеу',
        'web_desc': 'Сіздің бизнесіңізге арналған заманауи және бейімделгіш веб-сайттар',
        'video': 'Бейне монтаждау',
        'video_desc': 'Кәсіби бейне контентті өңдеу және монтаждау',
        'learn_more': 'Толығырақ',
        'about_us': 'Біз туралы',
        'about_text': 'Біз сіздің идеяларыңызды өмірге асыратын кәсібилер тобымыз',
        'contact_us': 'Байланыс',
        'name': 'Аты-жөніңіз',
        'phone': 'Телефон нөмірі',
        'email': 'Электрондық пошта',
        'message': 'Хабарламаңыз',
        'send': 'Жіберу',
        'all_rights_reserved': 'Барлық құқықтар қорғалған'
    }
};

// Function to save original texts
function saveOriginalText(element) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.placeholder) {
            element.dataset.originalPlaceholder = element.placeholder;
        }
    } else {
        if (element.textContent.trim()) {
            element.dataset.originalText = element.textContent;
        }
    }
}

// Function to restore original texts
function restoreOriginalTexts() {
    document.querySelectorAll('[data-original-text]').forEach(element => {
        element.textContent = element.dataset.originalText;
    });
    document.querySelectorAll('[data-original-placeholder]').forEach(element => {
        element.placeholder = element.dataset.originalPlaceholder;
    });
}

// Function to translate text
function translateText(element, language) {
    const translationKey = element.dataset.translate;
    if (translationKey && translations[language] && translations[language][translationKey]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.placeholder) {
                element.placeholder = translations[language][translationKey];
            }
        } else {
            element.textContent = translations[language][translationKey];
        }
    }
}

// Function to translate the page
function simpleTranslate(language) {
    // Save the selected language
    localStorage.setItem('selectedLanguage', language);
    
    // If language is Russian, restore original texts
    if (language === 'ru') {
        restoreOriginalTexts();
        return;
    }
    
    // Save original texts for all translatable elements
    document.querySelectorAll('[data-translate]').forEach(saveOriginalText);
    
    // Translate all elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        translateText(element, language);
    });
}

// Initialize the translator
document.addEventListener('DOMContentLoaded', function() {
    // Get the language selector
    const languageSelector = document.querySelector('.language-selector select');
    
    // Get saved language or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set the selector value
    languageSelector.value = savedLanguage;
    
    // Apply translation
    simpleTranslate(savedLanguage);
    
    // Add event listener for language changes
    languageSelector.addEventListener('change', function() {
        simpleTranslate(this.value);
    });
}); 
