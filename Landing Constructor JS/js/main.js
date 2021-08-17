const getElement = (tag, classes, attributes) => {
	const block = document.createElement(tag);

	if (classes) {
		block.classList.add(...classes);
	}

	if (attributes) {
		for (const attribute in attributes) {
			block[attribute] = attributes[attribute];
		}
	}

	return block;
};

const createHeader = (title, logo, menu, social) => {
	const wrap = getElement('header');
	const container = getElement('div', ['container']);
	const header = getElement('div', ['header']);
	const menuButton = getElement('div', ['menu-button']);

	wrap.append(container);
	container.append(header);
	container.append(menuButton);
   
   menuButton.addEventListener('click', () => {
      menuButton.classList.toggle('menu-button-active');
      header.classList.toggle('header-active');
   });

   var logo = getElement('img', ['logo'], {
		src: logo ? logo : '/img/logo.png',
		alt: 'Логотип ' + title ? title : '',
	});
	header.append(logo);

	if (menu) {
		var nav = getElement('nav', ['menu-list']);
		var links = menu.map((item) => {
			var link = getElement('a', ['menu-link'], {
				href: item.href ? item.href : '#',
			});
         link.style.color = item.fontColor ? item.fontColor : '#000';
			link.textContent = item.title ? item.title : '';
			return link;
		});
		nav.append(...links);
		header.append(nav);
	}

	if (social) {
		var socialDiv = getElement('div', ['social']);
		var links = social.map((item) => {
			var link = getElement('a', ['social-link'], {
				href: item.href ? item.href : '#',
			});
			var img = getElement('img', [], {
				src: item.src ? item.src : '',
				alt: item.alt ? item.alt : '',
			});
			link.append(img);
			return link;
		});
		socialDiv.append(...links);
		header.append(socialDiv);
	}

	return wrap;
};

const createMain = (text) => {
   const main = getElement('main');
   const container = getElement('div', ['container']);
   const mainContent = getElement('div', ['main-content']);
   const content = getElement('div', ['content']);

   main.append(container);
   container.append(mainContent);
   mainContent.append(content);
   
   if (text.genre) {
      var genre = getElement('span', ['genre', 'animated', 'fadeInRight']);
      genre.textContent = text.genre;
      content.append(genre);
   }
   
   if (text.rating !== undefined) {
      if (text.rating > 10) {
         text.rating = 10;
      }
      if (text.rating < 0) {
         text.rating = 0;
      }
      var rating = getElement('div', ['rating', 'animated', 'fadeInRight']);
      var stars = getElement('div', ['rating-stars']);
      var ratingNumber = getElement('div', ['rating-number']);
      ratingNumber.textContent = `${text.rating}/10`;

      for (let i = 0; i < 10; i++) {
         if (i < text.rating) {
            var star = getElement('img', ['star'], {
               src: '/img/star.svg',
               alt: 'star'
            });
            stars.append(star);
         }
         else {
            var star = getElement('img', ['star'], {
               src: '/img/star-o.svg',
               alt: 'star-o'
            });
            stars.append(star);
         }
      }
      
      rating.append(stars, ratingNumber);
      content.append(rating);
   }
   
   if (text.titleImage) {
      var title = getElement('img', ['main-image', 'animated', 'fadeInRight'], {
         src: text.titleImage,
         alt: 'Надпись'
      });
      content.append(title);
   }
   else if (text.title) {
      var title = getElement('h1', ['main-title', 'animated', 'fadeInRight']);
      title.textContent = text.title;
      content.append(title);
   }

   if (text.description) {
      var description = getElement('p', ['main-description', 'animated', 'fadeInRight']);
      description.textContent = text.description;
      content.append(description);
   }

   if (text.trailer) {
      var button = getElement('a', ['button', 'animated', 'fadeInRight'], {
         href: text.trailer.href ? text.trailer.href : '#'
      });
      button.setAttribute('data-fancybox', '');
      button.textContent = 'Смотреть трейлер';

      var pulse = getElement('a', ['play'], {
         href: text.trailer.href ? text.trailer.href : '#'
      });
      var pulseImage = getElement('img', ['play-img'], {
         src: '/img/play.svg',
         alt: 'play'
      });
      pulse.setAttribute('data-fancybox', '');

      if (text.trailer.backgroundColor) {
         button.style.backgroundColor = text.trailer.backgroundColor ? text.trailer.backgroundColor : '#141218';
         pulse.style.backgroundColor = text.trailer.backgroundColor ? text.trailer.backgroundColor : '#141218';
      }

      if (text.trailer.fontColor) {
         button.style.color = text.trailer.fontColor ? text.trailer.fontColor : '#fff';
      }

      pulse.append(pulseImage);

      mainContent.append(pulse);
      content.append(button);
   }

   if (text.series) {
      var series = getElement('div', ['series', 'animated', 'fadeInRight']);
      var swiper = getElement('div', ['swiper-container']);
      var wrapper = getElement('div', ['swiper-wrapper']);
      var button = getElement('div', ['arrow']);

      series.append(swiper);
      series.append(button);
      swiper.append(wrapper);


      text.series.forEach(item => {
         var slide = getElement('div', ['swiper-slide']);
         var card = getElement('div', ['card']);
   
         if (item.subtitle) {
            var subtitle = getElement('span', ['card-subtitle']);
            subtitle.textContent = item.subtitle;
            subtitle.style.color = item.fontColor ? item.fontColor : '#000';
            card.append(subtitle);
         }
   
         if (item.title) {
            var title = getElement('h2', ['card-title']);
            title.textContent = item.title;
            title.style.color = item.fontColor ? item.fontColor : '#000';
            card.append(title);
         }
         
         card.style.cssText = `
            background: linear-gradient(180deg, rgba(20, 18, 24, 0.5) 0%, #2D2D2D 100%),url(${item.image});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            `;
   
         slide.append(card);
         wrapper.append(slide);

      });

      content.append(series);
   }
   
   return main;
};

const createFooter = (footer) => {
   const wrap = getElement('footer', ['footer']);
   const container = getElement('div', ['container']);
   const content = getElement('div', ['footer-content']);

   wrap.append(container);
   container.append(content);

   wrap.style.backgroundColor = footer.backgroundColor ? footer.backgroundColor : '#000';

   if (footer.copyright) {
      var block = getElement('div', ['left']);
      var copyright = getElement('span', ['footer-copyright']);
      copyright.style.color = footer.fontColor ? footer.fontColor : '#3A383D';
      copyright.textContent = `© 2020 ${footer.copyright}. All right reserved.`;

      block.append(copyright);
      content.append(block);
   }

   if (footer.links) {
      var block = getElement('div', ['right']);
      var nav = getElement('nav', ['footer-menu']);

      footer.links.forEach(item => {
         var link = getElement('a', ['footer-link'], {
            href: item.href
         });
         link.style.color = footer.fontColor ? footer.fontColor : '#3A383D';
         link.textContent = item.title;
         nav.append(link);
      });

      block.append(nav);
      content.append(block);
   }

   return wrap;
};

const constructor = (selector, options, header, main, footer) => {
   document.body.classList.add(selector ? selector : 'body-app');
	document.title = options.title ? options.title : 'Главная';

	document.head.append(
		getElement('link', [], {
			rel: 'shortcut icon',
			type: 'image/x-icon',
			href: options.favicon ? options.favicon : '/img/favicon.ico',
		})
	);

	document.body.style.cssText = options.backgroundImage ? `background-image: url(${options.backgroundImage});` : 'background-image: url(/img/background.jpg);';
   document.body.style.backgroundPosition = options.imagePosition ? options.imagePosition : 'top right';

	document.body.style.color = options.fontColor ? options.fontColor : '#000';

	document.body.append(
		createHeader(options.title, options.logo, header.menu, header.social),
      createMain(main),
      createFooter(footer)
	);
};

constructor(
	'body',
	{
		title: 'Локи',
		favicon: '/img/favicon.ico',
		logo: '/img/logo.png',
		backgroundImage: '/img/background.jpg',
      imagePosition: 'center center',
      fontColor: '#d6d6d6'
	},
	{
		menu: [
			{
            fontColor: '#d6d6d6',
				title: 'Описание',
				href: '#',
			},
			{
            fontColor: '#d6d6d6',
				title: 'Трейлер',
				href: '#',
			},
			{
            fontColor: '#d6d6d6',
				title: 'Отзывы',
				href: '#',
			},
		],
		social: [
			{
				href: 'https://twitter.com/',
				src: '/img/social/twitter.png',
				alt: 'twitter',
			},
			{
				href: 'https://instagram.com/',
				src: '/img/social/instagram.png',
				alt: 'instagram',
			},
			{
				href: 'https://facebook.com/',
				src: '/img/social/facebook.png',
				alt: 'facebook',
			},
		],
	},
   {
      title: 'Локи',
      titleImage: '/img/title.png',
      genre: '2021, Боевик',
      rating: 8,
      description: 'Американский сериал, созданный Майклом Уолдроном для стримингового сервиса Disney+ и основанный на одноимённом персонаже из Marvel Comics. Его действие происходит в Кинематографической вселенной Marvel (КВМ) и он напрямую связан с фильмами франшизы. События сериала начинаются в фильме «Мстители: Финал» (2019), где альтернативная версия Локи создала новую временную линию.',
      trailer: {
         href: 'https://www.youtube.com/watch?v=vrbbdIFOswM',
         backgroundColor: '#4c4d35',
         fontColor: '#d6d6d6',
      },
      series: [
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #1',
            title: 'Славная миссия',
            image: '/img/slider/01.jpg'
         },
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #2',
            title: 'Вариант',
            image: '/img/slider/02.jpg'
         },
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #3',
            title: 'Ламентис',
            image: '/img/slider/03.jpg'
         },
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #4',
            title: 'Событие Нексуса',
            image: '/img/slider/04.jpg'
         },
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #5',
            title: 'Путешествие в тайну',
            image: '/img/slider/05.jpg'
         },
         {
            fontColor: '#8c8c1d',
            subtitle: 'Серия #6',
            title: 'Ради всего времени. Навсегда',
            image: '/img/slider/06.jpg'
         }
      ]
   },
   {
      backgroundColor: '#4c4d35',
      fontColor: '#d6d6d6',
      copyright: 'The Loki',
      links: [
         {
            title: 'Privacy Policy',
            href: '#'
         },
         {
            title: 'Terms of Service',
            href: '#'
         },
         {
            title: 'Legal',
            href: '#'
         }
      ]
   }
);

var mySwiper = new Swiper('.swiper-container', {
   slidesPerView:1,
   loop: true,
   navigation: {
      nextEl: '.arrow',
    },

    breakpoints:
   {
      540: {
        slidesPerView: 2
      }
   }
});