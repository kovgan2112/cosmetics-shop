const items = [{
        title: "Гель-ламинатор для бровей суперсильной фиксации",
        tags: ["brow"],
        price: 12,
        img: "./images/brow_laminator",
        rating: 4.8,
    },
    {
        title: "Гель для бровей суперсильной фиксации Brow Super Fix 12H",
        tags: ["brow"],
        price: 9,
        img: "./images/brow_super_fix",
        rating: 4.7,
    },
    {
        title: "Кисть для контуринга и стробинга лица № 12",
        tags: ["face"],
        price: 15,
        img: "./images/contouring_brush",
        rating: 4.6,
    },
    {
        title: "Крем-флюид тональный AQUA veil HYALURON COMPLEX",
        tags: ["face"],
        price: 11,
        img: "./images/foundation_aqua_veil",
        rating: 4.9,
    },
    {
        title: "КРЕМ ТОНАЛЬНЫЙ CC ACTIVE COMPLEX SPF 10",
        tags: ["face"],
        price: 8,
        img: "./images/foundation_cc_active",
        rating: 4.8,
    },
    {
        title: "Крем тональный Skin EVOLUTION soft matte blur effect",
        tags: ["face"],
        price: 10,
        img: "./images/foundation_skin_evolution",
        rating: 4.8,
    },
    {
        title: "Матовый блеск для губ PIN UP Ultra matt",
        tags: ["face", "lips"],
        price: 10,
        img: "./images/lip_gloss_PIN_UP",
        rating: 4.5,
    },
    {
        title: "КАРАНДАШ ДЛЯ ГУБ SOFT MATTE",
        tags: ["face", "lips"],
        price: 7,
        img: "./images/LIP_PENCIL_SOFT_MATTE",
        rating: 4.3,
    },
    {
        title: "Тинт для губ с гиалуроновым комплексом",
        tags: ["face", "lips"],
        price: 8,
        img: "./images/lip_tint",
        rating: 4.9,
    },
    {
        title: "Тушь для ресниц Smoky eyes Эффект умножения и удлинения",
        tags: ["face", "eyes"],
        price: 10,
        img: "./images/mascara_smoky_eyes",
        rating: 4.0,
    },
    {
        title: "Тушь для ресниц XXL Суперобъем",
        tags: ["face", "eyes"],
        price: 11,
        img: "./images/mascara_xxl",
        rating: 4.2,
    },
    {
        title: "Кисть для пудровых текстур веер MAXI № 19",
        tags: ["face"],
        price: 14,
        img: "./images/Powder_Brush",
        rating: 4.5,
    }

];

let currentState = [...items];
const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareCosmeticsItem(cosmeticsItem) {
    const { title, tags, price, img, rating } = cosmeticsItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("img").src = image;
    item.querySelector(".price").textContent = `${price}BYN`;

    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareCosmeticsItem(item));
    });
    if (!arr.lenght) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});