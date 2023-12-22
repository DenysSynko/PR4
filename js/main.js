const cardButton = document.querySelector("#card-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cardButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

new WOW().init();

// day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#username');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurant');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
	loginInput.style.borderColor = '';
	
	if(modalAuth.classList.contains('is-open')){
		disableScroll();
	}else{
		enableScroll();
	}
}

function authorized() {
	function logOut(){
		login = '';
		localStorage.setItem('gloDelivery', login);
		userName.textContent = login;
		buttonAuth.style.display = '';
		userName.style.display = 'none';
		buttonOut.style.display = '';
		buttonOut.removeEventListener('click', logOut);
		checkAuth();
	}
	userName.textContent = login;
    buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'block';
	buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    function logIn(event) {
        event.preventDefault();
		if(loginInput.value.trim()){
			login = loginInput.value; 
			localStorage.setItem('gloDelivery', login);
			toggleModalAuth(); 
			buttonAuth.removeEventListener('click', toggleModalAuth);
			closeAuth.removeEventListener('click', toggleModalAuth);
			logInForm.removeEventListener('submit', logIn);
			logInForm.reset();
			checkAuth();
		} else {
			loginInput.style.borderColor = '#ff0000';
			loginInput.value = '';
		}
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
	modalAuth.addEventListener('click', function(event){
		if(event.target.classList.contains('is-open')){
			toggleModalAuth();
		}
	})
}

function checkAuth() {
	if (login) {
		authorized();
	} else {
		notAuthorized();
		buttonOut.style.display = 'none';
	}
}


checkAuth();

function createCardRestaurant() {
	const card = `
	<a class="card">
                        <img src="img/tanuki.svg" alt="card-image" class="card-image">
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title">Тануки</h3>
                                <span class="card-tag tag">60 мин</span>
                            </div>
                            <div class="card-info">
                                <div class="rating">
                                    <img src="img/rating.svg" alt="rating" class="rating-star"> 4.0
                                </div>
                                <div class="price">От 1000 ₽</div>
                                <div class="category">Суши</div>
                            </div>
                        </div>
                    </a>
	`;
	
	const card2 = `
	<div class="menu-item" >
                    <img src="img/image.jpg" alt="pizza-image" class="menu-item-image">
                    <div class="menu-item-text">
                        <div class="menu-item-heading">
                            <h3 class="menu-item-title">Классическая пица</h3>
                        </div>
                        <div class="menu-item-info">
                            <div class="menu-item-description">
								Очень вкусная пица с томатныйм соусом, сыром и колбасой.
                            </div>
                        </div>
                        <div class="menu-item-buttons">
                            <button class="button button-primary">
                                <span class="button-card-text">В корзину</span>
                                <img src="img/icon.svg" alt="shopping-cart" class="card-button-image">
                            </button>
                            <strong class="menu-item-price-bold"> 350 ₽</strong>
                        </div>
                    </div>
                </div>
	`;
	
	cardsRestaurants.insertAdjacentHTML('beforeend', card);
	menu.insertAdjacentHTML('beforeend', card2);
	menu.style.display = 'none';
}

function openGoods(event) {
	
	if (login) {
		console.log(event);
		const target = event.target;
		const restaurant = target.closest('.card');
		console.log('restaurant:', restaurant);

		if (restaurant) {
			containerPromo.style.display = 'none';
			restaurants.style.display = 'none';
			menu.style.display = 'block';
		}
	} else {
		toggleModalAuth();
		
	}
	
	
}

function closeGoods() {
    containerPromo.style.display = 'block';
    restaurants.style.display = 'block';
	menu.style.display = 'none';
}

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', closeGoods);

createCardRestaurant();