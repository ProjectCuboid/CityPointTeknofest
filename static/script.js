

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
setTimeout(hideLoader, 1200);

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
        what : "What is CityPoint",
        ques: "CityPoint is a program that allows users to use so-called points that they can use in their daily lives. Our program allows users to learn the rules of road safety. If users follow the rules, we will give them CityPoints with which they can use them on public transport. Make your life brighter and more favorable with CityPoint"
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
        ques : "CityPoint – bu, istifadəçilərə gündəlik həyatlarında istifadə edə biləcəkləri xüsusi xallar (pointlər) qazandıran bir proqramdır. Proqramımız istifadəçilərə yol hərəkəti qaydalarını öyrənməyə imkan verir. Əgər istifadəçilər qaydalara riayət etsələr, onlara City Pointlər təqdim edəcəyik və onlar bu xalları ictimai nəqliyyatda istifadə edə biləcəklər. City Point ilə həyatınızı daha rəngarəng və rahat edin!"
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
        ques: "CityPoint, kullanıcıların günlük yaşamda kullanabilecekleri sözde CityPoint kullanmalarına olanak tanıyan bir programdır. Programımız kullanıcılara trafik güvenliği kurallarını öğrenme fırsatı veriyor. Kullanıcılar kurallara uyarlarsa, onlara toplu taşıma araçlarında kullanabilecekleri CityPoints vereceğiz. Hayatınızı CityPoint ile daha parlak ve daha elverişli hale getirin."
    },
    ru: {
        signup : "Зарегистрироваться",
        login : "Авторизоваться",
        abt : "Об",
        contact : "Контакт",
        start : "Начни",
        joinus : "Присоединяйтесь к нам",
        bns : "Бонусы во всем",
        selct : "Язык",
        what : "Что такое CityPoint"
        ques : "СитиПоинт это программа позволяющая пользователям использовать так называемые поинты которые они могут использовать в повседневной жизни.  Наша программа даёт пользователям познавать правила дорожной безопасности. Если пользователи будут соблюдать правила то мы дадим им СитиПоинты с которыми они могут использовать их в общественном транспорте. Сделайте свою жизнь ярче и благоприятнее с СитиПоинт."
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
        selct: document.querySelector(".lang"),
        what: document.querySelector("#section-2 h2"),
        ques: document.querySelector(".abtQuest")
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
