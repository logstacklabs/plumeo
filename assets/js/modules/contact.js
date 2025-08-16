/**
 * Handles asynchronous form submission to Web3Forms.
 * Displays response messages and resets the form.
 *
 * DOM Requirements:
 * - #contact-form: the contact form element
 * - #form-response: container to show success/failure messages
 *
 * External:
 * - Uses fetch to POST to https://api.web3forms.com/submit
 */
export default function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");
    if (!contactForm || !formResponse) {
        console.warn("Contact form not initialized");
        return;
    }
    const baseClass = 'plumeo-form__response';
    const successClass = baseClass + '--success';
    const failedClass = baseClass + '--failed';
    
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = JSON.stringify(Object.fromEntries(formData));
        
        formResponse.innerHTML = "Please wait...";
        formResponse.style.display = "block";
        
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: data,
        })
            .then(async (response) => {
                const jsonResponse = await response.json();
                const success = response.status === 200;
                const icon = success ? "check-double" : "xmark";
                formResponse.classList.add(success ? successClass : failedClass);
                formResponse.innerHTML = `<i class="fa-solid fa-xl fa-${icon}"></i> ${jsonResponse.message}`;
            })
            .catch((error) => {
                console.error(error);
                formResponse.classList.add(failedClass);
                formResponse.innerHTML = `<i class="fa-solid fa-xl fa-xmark"></i> ${"Something went wrong!"}`;
            })
            .finally(() => {
                contactForm.reset();
                setTimeout(() => {
                    formResponse.classList.remove(successClass, failedClass);
                    formResponse.style.display = "none";
                }, 5000);
            });
    });
}
