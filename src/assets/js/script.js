
   /* let currentProductIndex = 0;

    const products = [
        {
            image: "assets/mes images/Voltwise nano.png",
            title: "Nano Box",
            text: "Le Nano Box est le chargeur ultra-rapide parfait pour les cafés, restaurants, beach bars et hôtels.\n" +
              "Avec ses câbles Type-C et TIPSY, il recharge tous les smartphones rapidement et en toute sécurité.\n" +
              "Compact et élégant, il s’intègre à vos espaces, du comptoir à la terrasse.\n" +
              "Grâce à notre application mobile, gérez vos boxes en temps réel et offrez un service moderne qui ravira vos clients."
        },
        {
            image: "assets/mes images/logo.png",
            title: "INNOVATE TODAY SMART SOLUTIONS",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim "
        },
        {
            image: "assets/mes images/women.svg",
            title: "TECH FORWARD YOUR BUSINESS, OUR TECH",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim "
        }
    ];

    function updateProduct() {
        document.getElementById("product-image").src = products[currentProductIndex].image;
        document.getElementById("product-title").innerHTML = products[currentProductIndex].title;
        document.getElementById("product-text").textContent = products[currentProductIndex].text;
    }

    function nextProduct() {
        currentProductIndex = (currentProductIndex + 1) % products.length;
        updateProduct();
    }

    function prevProduct() {
        currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
        updateProduct();
    }*/
    /*----------faq--------------*/
    document.addEventListener("DOMContentLoaded", function () {
        const faqItems = document.querySelectorAll(".faq-item");
    
        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
    
            question.addEventListener("click", function () {
                // Ferme les autres réponses ouvertes
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                        otherItem.querySelector(".faq-answer").style.maxHeight = null;
                    }
                });
    
                // Ouvre ou ferme la réponse actuelle
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add("active");
                    answer.style.maxHeight = answer.scrollHeight + "px"; // Ajuste la hauteur en fonction du contenu
                }
            });
        });
    });
    

    
    
    
