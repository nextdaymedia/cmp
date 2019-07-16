/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * below under the 'en' key. Because the purpose definitions will change,
 * you will need to update the translations regularly. As a consequence, this
 * translations.js file is very important to keep up to date.
 */
export default {
	// The 'en' object below should have comments that point to the file containing the component where the text is used.
	en: {
		intro: { // src/components/popup/intro/intro.jsx
			title: 'Thanks for visiting',
			description: 'Under the General Data Protection Regulation, cookies are considered personal data. Cookies are used on this website. You can find more information about this in the privacy statement. You are hereby requested to accept the use of these cookies.',
			acceptAll: 'Accept all',
			showPurposes: 'Manage your choices',
			readOur: 'Read our',
			privacyPolicy: 'privacy policy',
		},
		details: { // src/components/popup/details/details.jsx
			back: 'Back',
			save: 'Accept all',
		},
		summary: { // src/components/popup/details/summary/summary.jsx
			title: 'Learn more about how information is being used?',
			description: 'We and select companies may access and use your information for the below purposes. You may customize your choices below or continue using our site if you\'re OK with the purposes.',
			detailLink: 'Learn More & Set Preferences',
			who: {
				title: 'Who is using this information?',
				description: 'We and pre-selected companies will use your information. You can see each company in the links above or',
				link: 'see the complete list here.',
			},
			what: {
				title: 'What information is being used?',
				description: 'Different companies use different information,',
				link: 'see the complete list here.',
			},
		},
		purposes: {
			// src/components/popup/details/purposeList/purposeList.jsx
			title: 'What information is being used?',
			// src/components/popup/details/purposeList/purposeList.jsx
			description: 'Below is a complete list of the information that may be gathered.',
			// src/components/popup/details/purposeList/purposeList.jsx
			customizeData: 'Customize how this data is used',
			// src/components/popup/details/purposeList/purposeList.jsx
			item1: 'Type of browser and its settings',
			item2: 'Information about the device\'s operating system',
			item3: 'Cookie information',
			item4: 'Information about other identifiers assigned to the device',
			item5: 'The IP address from which the device accesses a client\'s website or mobile application',
			item6: 'Information about the user\'s activity on that device, including web pages and mobile apps visited or used',
			item7: 'Information about the geographic location of the device when it accesses a website or mobile application',
			// src/components/popup/details/vendors/vendors.jsx
			optOutDescription: 'Depending on the type of data they collect, use, and process and other factors including privacy by design, certain partners rely on your consent while others require you to opt-out. For information on each vendor and to exercise your choices, see below. Or to opt-out, visit the %NAI%, %DAA%, or %EDAA% sites.',
			purpose1: { // src/components/popup/details/vendors/vendors.jsx
				title: 'Information storage and access',
				description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.',
			},
			purpose2: { // src/components/popup/details/vendors/vendors.jsx
				title: 'Personalisation',
				description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.',
			},
			purpose3: { // src/components/popup/details/vendors/vendors.jsx
				title: 'Ad selection, delivery, reporting',
				description: 'The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time.',
			},
			purpose4: { // src/components/popup/details/vendors/vendors.jsx
				title: 'Content selection, delivery, reporting',
				description: 'The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time.',
			},
			purpose5: { // src/components/popup/details/vendors/vendors.jsx
				title: 'Measurement',
				description: 'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time.',
			},
		},
		vendors: {
			// src/components/popup/details/vendorList/vendorList.jsx
			title: 'Who is using this information?',
			// src/components/popup/details/vendorList/vendorList.jsx
			description: 'Here is the complete list of companies who will use your information. Please view their privacy policy for more details.',
			// src/components/popup/details/vendorList/vendorList.jsx
			back: 'Customize how these companies use data from the previous page',
			// src/components/popup/details/vendors/vendors.jsx
			acceptNone: 'Disallow All',
			// src/components/popup/details/vendors/vendors.jsx
			acceptAll: 'Allow All',
			// src/components/popup/details/vendors/vendors.jsx
			accept: 'Allow',
			// src/components/popup/details/vendors/vendors.jsx
			optOut: 'requires opt-out',
		},
		footer: { // src/components/footer/footer.jsx
			message: '',
			consentLink: '',
		},
	},
	de: {
		intro: {
			title: 'Diese Website verwendet Cookies',
			description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung ',
			acceptAll: 'Alle Cookies akzeptieren',
			showPurposes: 'Verwendungszwecke zeigen',
			readOur: '',
			privacyPolicy: '',
		},
		details: {
			back: 'Abbrechen',
			save: 'Sichern und Beenden',
		},
		summary: {
			title: '',
			description: '',
			detailLink: '',
			who: {
				title: '',
				description: '',
				link: '',
			},
			what: {
				title: '',
				description: '',
				link: '',
			},
		},
		purposes: {
			title: '',
			description: '',
			customizeData: '',
			items: '',
			optOutDescription: '',
			purpose1: {
				title: 'Zugriff auf ein Gerät',
				description: 'Die Erlaubnis zum Speichern und Abrufen von Informationen auf dem Gerät eines Website-Besuchers.Das ist notwendig, um Cookies im Web-Browser zu speichern und zur Anzeige relevanter Informationen und Werbung abrufen zu können.',
			},
			purpose2: {
				title: 'Persönlich angepaßte Werbung',
				description: 'Die Erlaubnis, Besucherdaten so zu verarbeiten und/oder zu speichern und abzurufen, dass persönlich angepaßte Werbung angeboten und angezeigt werden kann (dies umfaßt die Auslieferung, Messung und die Erstellung von Berichten darüber). Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.',
			},
			purpose3: {
				title: 'Analysen',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von Inhalten oder Werbung zu verarbeiten, und zur Messung der Auslieferung solcher Inhalte oder Werbung. Umfasst ist die Gewinnung von Erkenntnissen und die Generierung von Berichten um die Nutzung des angebotenen Service zu verstehen, und/oder das Abrufen oder Speichern von Informationen auf Geräten zu diesem Zweck.',
			},
			purpose4: {
				title: 'Persönlich angepasste Inhalte',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von personalisierten Inhalten zu verarbeiten, und zur Messung der Auslieferung. Umfasst ist die Gewinnung von Erkenntnissen darüber und die Generierung von Berichten dazu. Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.',
			},
			purpose5: {
				title: '',
				description: '',
			},
		},
		vendors: {
			title: 'Unsere Partner',
			description: 'Helfen Sie uns, Ihnen einen besseren Service zu bieten! Unsere Partner verwenden Cookies Ihres Browsers, um quer durch das Web zu verstehen, was Sie interessiert und Ihnen entsprechend relevante Inhalte und Werbung anzubieten.',
			back: '',
			acceptNone: 'Alle ablehnen',
			acceptAll: 'Alle akzeptieren',
			accept: '',
			optOut: '',
		},
		footer: {
			message: 'Du kannst deine Datenschutz-Einstellungen bearbeiten',
			consentLink: 'hier',
		},
	},
	nl: {
		intro: {
			title: 'Welkom op',
			description: 'Op grond van de Algemene Verordening Gegevensbescherming worden cookies als persoonsgegevens beschouwd. Op deze website wordt van cookies gebruik gemaakt. Verdere informatie hierover kunt u vinden in ons privacystatement. U wordt hierbij verzocht om kenbaar te maken dat u met het gebruik van cookies instemt.',
			acceptAll: 'Akkoord',
			showPurposes: 'Beheer uw keuzes',
			readOur: 'Lees ons ',
			privacyPolicy: 'privacystatement',
		},
		details: {
			back: 'Terug',
			save: 'Akkoord',
		},
		summary: {
			title: '',
			description: '',
			detailLink: '',
			who: {
				title: '',
				description: '',
				link: '',
			},
			what: {
				title: '',
				description: '',
				link: '',
			},
		},
		purposes: {
			title: '',
			description: '',
			customizeData: '',
			items: '',
			optOutDescription: '',
			purpose1: {
				title: 'Informatieopslag en toegang',
				description: 'Sta toe dat gegevens op het apparaat van een gebruiker worden opgeslagen of gebruikt.',
			},
			purpose2: {
				title: 'Personalisatie',
				description: `Sta toe dat gegevens van gebruiker worden verwerkt voor het aanbieden en informeren van gepersonaliseerde advertenties (inclusief weergave, meting en rapportage) op basis van de voorkeuren of interesses van een gebruiker die bekend zijn of worden afgeleid uit gegevens die zijn verzameld uit meerdere sites, apps of apparaten; en / of toegang tot of opslag van informatie op apparaten voor dat doel. Bevat de volgende functies:
				<ul>
					<li>Gegevens afstemmen op offline bronnen - gegevens uit offline bronnen combineren die oorspronkelijk in andere contexten zijn verzameld.</li>
					<li>Apparaten koppelen - toestaan dat gebruikersgegevens worden verwerkt om betreffende gebruiker op meerdere apparaten te verbinden.</li>
					<li>Precieze geografische locatiegegevens - toestaan dat de exacte geografische locatiegegevens van een gebruiker worden verwerkt ter ondersteuning van een doel waarvoor die bepaalde derde partij toestemming heeft gegeven.</li>
				</ul>`,
			},
			purpose3: {
				title: 'Advertentieselectie, levering en rapportage',
				description: `Sta verwerking van gegevens van een gebruiker toe om inhoud of advertenties weer te geven en de weergave van dergelijke inhoud of advertenties te meten, hier inzichten uit te verkrijgen en rapporten te genereren om het gebruik van de dienst te begrijpen; en / of toegang tot of opslag van informatie op apparaten voor dat doel. Bevat de volgende functies:
				<ul>
					<li>Gegevens afstemmen op offline bronnen: gegevens uit offline bronnen combineren die oorspronkelijk in andere contexten zijn verzameld.</li>
					<li>Apparaten koppelen - toestaan dat gebruikersgegevens worden verwerkt om betreffende gebruiker op meerdere apparaten te verbinden.</li>
					<li>Precieze geografische locatiegegevens - toestaan dat de exacte geografische locatiegegevens van een gebruiker worden verwerkt ter ondersteuning van een doel waarvoor die bepaalde derde partij toestemming heeft gegeven.</li>
				</ul>`,
			},
			purpose4: {
				title: 'Inhoudsselectie, weergave en rapportage',
				description: `Toestaan dat de gegevens van een gebruiker worden verwerkt om gepersonaliseerde inhoud (inclusief weergave, meting en rapportage) weer te geven en te informeren op basis van de voorkeuren of interesses van een gebruiker die bekend zijn of worden afgeleid uit gegevens die zijn verzameld op meerdere sites, apps of apparaten; en / of toegang tot of opslag van informatie op apparaten voor dat doel. Bevat de volgende functies:
				<ul>
					<li>Gegevens afstemmen op offline bronnen: gegevens uit offline bronnen combineren die oorspronkelijk in andere contexten zijn verzameld.</li>
					<li>Apparaten koppelen - toestaan dat gebruikersgegevens worden verwerkt om betreffende gebruiker op meerdere apparaten te verbinden.</li>
					<li>Precieze geografische locatiegegevens - toestaan dat de exacte geografische locatiegegevens van een gebruiker worden verwerkt ter ondersteuning van een doel waarvoor die bepaalde derde partij toestemming heeft gegeven.</li>
				</ul>`,
			},
			purpose5: {
				title: 'Meting',
				description: 'De verzameling van informatie over uw gebruik van de inhoud en combinatie met eerder verzamelde informatie, werd gebruikt om uw gebruik van de inhoud te meten, te begrijpen en te rapporteren.',
			}
		},
		vendors: {
			title: 'Onze partners',
			description: 'Help ons een betere online ervaring te bieden! Onze partners stellen cookies in en verzamelen informatie uit uw browser op het web om u website-inhoud te bieden, relevante advertenties te leveren en het webpubliek te begrijpen.',
			back: '',
			acceptNone: '',
			acceptAll: 'Alles accepteren',
			accept: '',
			optOut: '',
		},
		footer: {
			message: '',
			consentLink: '',
		},
	},
	es: {
		intro: {
			title: 'Bienvenido en',
			description: 'Según el Reglamento general de protección de datos, las cookies se consideran datos personales. Las cookies se utilizan en este sitio web. Puede encontrar más información sobre esto en la declaración de privacidad. Por favor indica que esta de acuerdo con el uso de cookies\n',
			acceptAll: 'DE ACUERDO',
			showPurposes: '',
			readOur: 'Lea nuestra ',
			privacyPolicy: 'declaración de privacidad',
		},
		details: {
			back: '',
			save: '',
		},
		summary: {
			title: '',
			description: '',
			detailLink: '',
			who: {
				title: '',
				description: '',
				link: '',
			},
			what: {
				title: '',
				description: '',
				link: '',
			},
		},
		purposes: {
			title: '',
			description: '',
			customizeData: '',
			items: '',
			optOutDescription: '',
			purpose1: {
				title: '',
				description: '',
			},
			purpose2: {
				title: '',
				description: '',
			},
			purpose3: {
				title: '',
				description: '',
			},
			purpose4: {
				title: '',
				description: '',
			},
			purpose5: {
				title: '',
				description: '',
			},
		},
		vendors: {
			title: '',
			description: '',
			back: '',
			acceptNone: '',
			acceptAll: '',
			accept: '',
			optOut: '',
		},
		footer: {
			message: '',
			consentLink: '',
		},
	},
	fr: {
		intro: {
			title: 'Bienvenue',
			description: 'Afin d’exploiter un site Web réussi, nous et certains tiers paramétrons des cookies et accéderons et stockerons des informations sur votre appareil à diverses fins. Diverses tierces parties recueillent également des données pour vous montrer du contenu personnalisé et des annonces. Certains tiers exigent votre consentement pour collecter des données afin de vous proposer un contenu personnalisé et des publicités.\n',
			acceptAll: 'ACCEPTER TOUS',
			showPurposes: '',
			readOur: 'Lire notre ',
			privacyPolicy: 'politique de confidentialité',
		},
		details: {
			back: '',
			save: '',
		},
		summary: {
			title: '',
			description: '',
			detailLink: '',
			who: {
				title: '',
				description: '',
				link: '',
			},
			what: {
				title: '',
				description: '',
				link: '',
			},
		},
		purposes: {
			title: '',
			description: '',
			customizeData: '',
			items: '',
			optOutDescription: '',
			purpose1: {
				title: '',
				description: '',
			},
			purpose2: {
				title: '',
				description: '',
			},
			purpose3: {
				title: '',
				description: '',
			},
			purpose4: {
				title: '',
				description: '',
			},
			purpose5: {
				title: '',
				description: '',
			},
		},
		vendors: {
			title: '',
			description: '',
			back: '',
			acceptNone: '',
			acceptAll: '',
			accept: '',
			optOut: '',
		},
		footer: {
			message: '',
			consentLink: '',
		},
	},
};
