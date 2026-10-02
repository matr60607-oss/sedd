// ==========================================
// ДАННЫЕ КВАРТИР
// ==========================================

const apartments = {

    1: {
        title: "Уютная квартира в центре",
        type: "1-КОМНАТНАЯ КВАРТИРА",
        location: "📍 Петропавловск, центр",
        mapLocation: "Петропавловск, центр",
        price: 12000,
        rating: "4.9",
        reviews: 24,
        description:
            "Светлая и уютная квартира в самом центре города. " +
            "Подойдёт для отдыха, командировки или небольшой поездки. " +
            "В квартире есть всё необходимое для комфортного проживания.",

        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",
            "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=85"
        ]
    },


    2: {
        title: "Стильная квартира возле центра",
        type: "2-КОМНАТНАЯ КВАРТИРА",
        location: "📍 Астана, левый берег",
        mapLocation: "Астана, левый берег",
        price: 18000,
        rating: "4.8",
        reviews: 31,
        description:
            "Современная двухкомнатная квартира в удобном районе Астаны. " +
            "Просторная гостиная, отдельная спальня и полностью оборудованная кухня. " +
            "Отличный вариант для пары, семьи или командировки.",

        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
        ]
    },


    3: {
        title: "Большая квартира для семьи",
        type: "3-КОМНАТНАЯ КВАРТИРА",
        location: "📍 Алматы, Медеуский район",
        mapLocation: "Алматы, Медеуский район",
        price: 25000,
        rating: "5.0",
        reviews: 18,
        description:
            "Просторная квартира для большой семьи или компании друзей. " +
            "Три комнаты, большая кухня и уютная гостиная. " +
            "Рядом магазины, кафе и основные достопримечательности города.",

        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"
        ]
    },


    4: {
        title: "Светлая квартира для отдыха",
        type: "2-КОМНАТНАЯ КВАРТИРА",
        location: "📍 Петропавловск, 20-й микрорайон",
        mapLocation: "Петропавловск, 20-й микрорайон",
        price: 16000,
        rating: "4.7",
        reviews: 15,
        description:
            "Тихая светлая квартира с современным интерьером. " +
            "Хороший вариант для семейного отдыха или поездки на несколько дней. " +
            "В квартире есть Smart TV, Wi-Fi и всё необходимое.",

        images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85"
        ]
    }

};


// ==========================================
// ФОРМАТИРОВАНИЕ ЦЕНЫ
// ==========================================

function formatPrice(price) {

    return new Intl.NumberFormat("ru-RU").format(price) + " ₸";

}


// ==========================================
// ОТКРЫТИЕ СТРАНИЦЫ КВАРТИРЫ
// ==========================================

function openApartment(id) {

    window.location.href = `apartment.html?id=${id}`;

}


// ==========================================
// ГЛАВНАЯ СТРАНИЦА
// ==========================================

function searchApartments() {

    const city = document.getElementById("city").value;

    const checkin =
        document.getElementById("checkin").value;

    const checkout =
        document.getElementById("checkout").value;


    if (checkin && checkout) {

        const start = new Date(checkin);
        const end = new Date(checkout);

        if (end <= start) {

            showToast(
                "Дата выезда должна быть позже даты заезда"
            );

            return;
        }
    }


    const cards =
        document.querySelectorAll(".apartment-card");


    let visible = 0;


    cards.forEach(card => {

        const cardCity =
            card.dataset.city;

        let show = true;


        if (
            city !== "all" &&
            cardCity !== city
        ) {
            show = false;
        }


        card.style.display =
            show ? "" : "none";


        if (show) {
            visible++;
        }

    });


    const noResults =
        document.getElementById("noResults");


    if (noResults) {

        noResults.style.display =
            visible === 0
                ? "block"
                : "none";
    }


    const apartmentsSection =
        document.getElementById("apartments");


    if (apartmentsSection) {

        apartmentsSection.scrollIntoView({
            behavior: "smooth"
        });
    }

}


// ==========================================
// ФИЛЬТР
// ==========================================

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });


        filter.classList.add("active");


        const selectedFilter =
            filter.dataset.filter;


        const cards =
            document.querySelectorAll(
                ".apartment-card"
            );


        let visible = 0;


        cards.forEach(card => {

            const rooms =
                card.dataset.rooms;


            if (
                selectedFilter === "all" ||
                rooms === selectedFilter
            ) {

                card.style.display = "";
                visible++;

            } else {

                card.style.display = "none";

            }

        });


        const noResults =
            document.getElementById("noResults");


        if (noResults) {

            noResults.style.display =
                visible === 0
                    ? "block"
                    : "none";
        }

    });

});


// ==========================================
// СОРТИРОВКА
// ==========================================

function sortApartments() {

    const grid =
        document.getElementById(
            "apartmentsGrid"
        );


    if (!grid) {
        return;
    }


    const cards =
        [...grid.querySelectorAll(
            ".apartment-card"
        )];


    const sort =
        document.getElementById("sort").value;


    if (sort === "cheap") {

        cards.sort((a, b) => {

            return Number(a.dataset.price) -
                Number(b.dataset.price);

        });

    }


    if (sort === "expensive") {

        cards.sort((a, b) => {

            return Number(b.dataset.price) -
                Number(a.dataset.price);

        });

    }


    cards.forEach(card => {
        grid.appendChild(card);
    });

}


// ==========================================
// ИЗБРАННОЕ НА ГЛАВНОЙ
// ==========================================

function toggleFavorite(button) {

    button.classList.toggle("active");


    if (
        button.classList.contains("active")
    ) {

        button.innerHTML = "♥";

        showToast(
            "Квартира добавлена в избранное"
        );

    } else {

        button.innerHTML = "♡";

        showToast(
            "Квартира удалена из избранного"
        );

    }

}


// ==========================================
// СТРАНИЦА КВАРТИРЫ
// ==========================================

function loadApartmentPage() {

    const title =
        document.getElementById(
            "apartmentTitle"
        );


    if (!title) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    const apartment =
        apartments[id];


    if (!apartment) {

        title.textContent =
            "Квартира не найдена";

        return;
    }


    document.title =
        `${apartment.title} — КвартиGo`;


    document.getElementById(
        "apartmentType"
    ).textContent =
        apartment.type;


    document.getElementById(
        "apartmentTitle"
    ).textContent =
        apartment.title;


    document.getElementById(
        "apartmentLocation"
    ).textContent =
        apartment.location;


    document.getElementById(
        "mapLocation"
    ).textContent =
        apartment.mapLocation;


    document.getElementById(
        "apartmentDescription"
    ).textContent =
        apartment.description;


    document.getElementById(
        "apartmentRating"
    ).textContent =
        apartment.rating;


    document.getElementById(
        "reviewRating"
    ).textContent =
        apartment.rating;


    document.getElementById(
        "bookingRating"
    ).textContent =
        apartment.rating;


    document.getElementById(
        "reviewsCount"
    ).textContent =
        apartment.reviews;


    document.getElementById(
        "bookingReviews"
    ).textContent =
        apartment.reviews;


    document.getElementById(
        "apartmentPrice"
    ).textContent =
        formatPrice(apartment.price);


    document.getElementById(
        "pricePerNight"
    ).textContent =
        formatPrice(apartment.price);


    document.getElementById(
        "mainApartmentImage"
    ).src =
        apartment.images[0];


    document.getElementById(
        "apartmentImage2"
    ).src =
        apartment.images[1];


    document.getElementById(
        "apartmentImage3"
    ).src =
        apartment.images[2];


    const bookingName =
        document.getElementById(
            "bookingApartmentName"
        );


    if (bookingName) {

        bookingName.textContent =
            apartment.title;

    }


    setupApartmentBooking(
        apartment
    );

}


// ==========================================
// БРОНИРОВАНИЕ
// ==========================================

function setupApartmentBooking(
    apartment
) {

    const checkin =
        document.getElementById(
            "pageCheckin"
        );


    const checkout =
        document.getElementById(
            "pageCheckout"
        );


    const calculateButton =
        document.getElementById(
            "calculateBooking"
        );


    const summary =
        document.getElementById(
            "bookingSummary"
        );


    const today =
        new Date();


    const todayString =
        today.toISOString()
            .split("T")[0];


    checkin.min =
        todayString;


    checkout.min =
        todayString;


    checkin.addEventListener(
        "change",
        () => {

            checkout.min =
                checkin.value;


            if (
                checkout.value &&
                checkout.value <=
                checkin.value
            ) {

                checkout.value = "";

            }

        }
    );


    calculateButton.addEventListener(
        "click",
        () => {

            if (
                !checkin.value ||
                !checkout.value
            ) {

                showToast(
                    "Выберите даты заезда и выезда"
                );

                return;
            }


            const start =
                new Date(
                    checkin.value
                );


            const end =
                new Date(
                    checkout.value
                );


            const difference =
                end - start;


            const nights =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            if (nights <= 0) {

                showToast(
                    "Дата выезда должна быть позже"
                );

                return;
            }


            const nightsPrice =
                apartment.price *
                nights;


            const cleaning =
                3000;


            const total =
                nightsPrice +
                cleaning;


            document.getElementById(
                "nightCount"
            ).textContent =
                nights;


            document.getElementById(
                "nightsPrice"
            ).textContent =
                formatPrice(
                    nightsPrice
                );


            document.getElementById(
                "totalPrice"
            ).textContent =
                formatPrice(
                    total
                );


            summary.classList.add(
                "visible"
            );

        }
    );


    document.getElementById(
        "reserveButton"
    ).addEventListener(
        "click",
        () => {

            if (
                !checkin.value ||
                !checkout.value
            ) {

                showToast(
                    "Сначала выберите даты"
                );

                return;
            }


            openModal(
                "bookingModal"
            );

        }
    );

}


// ==========================================
// МОДАЛЬНЫЕ ОКНА
// ==========================================

function openModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) {
        return;
    }


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


// ==========================================
// ФОРМА БРОНИРОВАНИЯ
// ==========================================

const pageBookingForm =
    document.getElementById(
        "pageBookingForm"
    );


if (pageBookingForm) {

    pageBookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            closeModal(
                "bookingModal"
            );


            this.reset();


            showToast(
                "Заявка отправлена!"
            );

        }
    );

}


// ==========================================
// ЗАКРЫТИЕ MODAL
// ==========================================

document.querySelectorAll(
    ".modal"
).forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );

});


// ==========================================
// ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            document.querySelectorAll(
                ".modal"
            ).forEach(modal => {

                modal.classList.remove(
                    "active"
                );

            });


            document.body.style.overflow =
                "";

        }

    }
);


// ==========================================
// ИЗБРАННОЕ НА СТРАНИЦЕ
// ==========================================

const pageFavorite =
    document.getElementById(
        "favoriteButton"
    );


if (pageFavorite) {

    pageFavorite.addEventListener(
        "click",
        () => {

            pageFavorite.classList.toggle(
                "active"
            );


            if (
                pageFavorite.classList.contains(
                    "active"
                )
            ) {

                pageFavorite.innerHTML =
                    "♥";

                showToast(
                    "Добавлено в избранное"
                );

            } else {

                pageFavorite.innerHTML =
                    "♡";

            }

        }
    );

}


// ==========================================
// УВЕДОМЛЕНИЯ
// ==========================================

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (!toast) {
        return;
    }


    messageElement.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


// ==========================================
// OWNER MODAL — ЕСЛИ ЕСТЬ НА ГЛАВНОЙ
// ==========================================

function openOwnerModal() {

    openModal(
        "ownerModal"
    );

}


// ==========================================
// ЗАПУСК
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadApartmentPage();

        console.log(
            "КвартиGo запущен"
        );

    }
);

