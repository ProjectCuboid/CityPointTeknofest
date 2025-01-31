

function showLoader() {
    document.getElementById("loader").style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
}
function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
}
setTimeout(hideLoader, 6000);

// ________________________LOADED-SITE___________________________________

function getstarted(){
    window.location.href = "/login";
}

const translations = {
    en: {
        signup : "Sign Up",
        login : "Log In",
        abt : "About",
        contact : "Contact",
        start : "Get started",
        joinus : "Join us now!",
        bns : "Bonuses in every way",
        selct : "Language",
        what : "What is CityPoint"
    },
    az: {
        signup : "Qeydiyyat",
        login : "Giriş",
        abt : "Haqqında",
        contact : "Əlaqə",
        start : "Başla",
        joinus : "Bizə qoşul!",
        bns : "Hər yerdə bonus",
        selct : "Dil",
        what : "CityPoint nədir?"
    },
    tr: {
        signup : "Kayıt",
        login : "Giriş",
        abt : "Hakkında",
        contact : "Bağlantı",
        start : "Başla",
        joinus : "Bize katıl!",
        bns : "Her yerde bonus",
        selct : "Dil",
        what : "CityPoint nedir?"
    },
    ru: {
        signup : "Зарегистрироваться",
        login : "Авторизоваться",
        abt : "Об",
        contact : "Контакт",
        start : "Начни",
        joinus : "Присоединяйтесь к намQ",
        bns : "Бонусы во всем",
        selct : "Язык",
        what : "Что такое CityPoint"
    }
}


const languageSelectop = document.querySelector("select");
languageSelectop.addEventListener("change", (event) => {
    setLanguage(event.target.value)
})

const setLanguage = (language) => {
    const elements = {
        signup: document.querySelector(".signup"),
        login: document.querySelector(".login"),
        abt: document.querySelector(".abt"),
        contact: document.querySelector(".contact"),
        start: document.querySelector(".gtstarted"),
        joinus: document.querySelector("#join-us span"),
        bns: document.querySelector(".bns"),
        selct: document.querySelector("p"),
        what: document.querySelector("#section-2 h2")
    };

    if (translations[language]) {
        Object.keys(elements).forEach((key) => {
            if (elements[key]) {
                elements[key].textContent = translations[language][key];
            }
        });
    }
};

// Load previously selected language from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    languageSelectop.value = savedLang;
    setLanguage(savedLang);
});

// Save selected language and update UI
languageSelectop.addEventListener("change", (event) => {
    localStorage.setItem("lang", event.target.value);
    setLanguage(event.target.value);
});
