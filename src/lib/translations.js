/**
 * The default set of translated pieces of text indexed by locale.
 * The English value under the 'en' key will be used if a translation is not provided.
 *
 * Placeholders are surrounded by '%' and should not be translated.
 * For example, 'Read our %privacyPolicy%' contains the placeholder '%privacyPolicy%' which should not be translated.
 *
 * Because the purpose definitions will change,
 * you will need to update the translations regularly. As a consequence, this
 * translations.js file is very important to keep up to date.
 */
export default {
	// The 'en' object below should have comments that point to the file containing the component where the text is used.
	en: {
		intro: { // src/components/popup/intro/intro.jsx
			title: 'Thanks for visiting %domain%',
			description: 'Under the General Data Protection Regulation, cookies are considered personal data. Cookies are used on this website. You can find more information about this in the privacy statement. You are hereby requested to accept the use of these cookies.',
			acceptAll: 'Accept all',
			showPurposes: 'Manage your choices',
			readOur: 'Read our %privacyPolicy%',
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
	nl: {
		intro: {
			title: 'Welkom op %domain%',
			description: 'In de algemene verordening inzake gegevensbescherming worden cookies als persoonsgegevens beschouwd. Op deze website worden cookies gebruikt. Meer informatie hierover vindt u in de privacyverklaring. U wordt hierbij verzocht het gebruik van deze cookies te accepteren.',
			acceptAll: 'Akkoord',
			showPurposes: 'Beheer uw keuzes',
			readOur: 'Lees onze %privacyPolicy%',
			privacyPolicy: 'privacystatement',
		},
		details: {
			back: 'Terug',
			save: 'Akkoord',
		},
		summary: {
			title: 'Meer weten over hoe informatie wordt gebruikt?',
			description: 'Wij en bepaalde bedrijven kunnen uw informatie raadplegen en gebruiken voor de onderstaande doeleinden. U kunt uw keuzes hieronder aanpassen of doorgaan met het gebruik van onze site als u akkoord gaat met de doeleinden.',
			detailLink: 'Lees meer en stel voorkeuren in',
			who: {
				title: 'Wie gebruikt deze informatie?',
				description: 'Wij en vooraf geselecteerde bedrijven zullen uw informatie gebruiken. U kunt elk bedrijf zien in de links hierboven of',
				link: 'zie de volledige lijst hier.',
			},
			what: {
				title: 'Welke informatie wordt er gebruikt?',
				description: 'Verschillende bedrijven gebruiken verschillende informatie',
				link: 'zie de volledige lijst hier.',
			},
		},
		purposes: {
			title: 'Welke informatie wordt er gebruikt?',
			description: 'Hieronder staat een volledige lijst van de informatie die verzameld kan worden.',
			customizeData: 'Pas aan hoe deze gegevens worden gebruikt',
			item1: 'Type browser en zijn instellingen',
			item2: 'Informatie over het besturingssysteem van het apparaat',
			item3: 'Cookie-informatie',
			item4: 'Informatie over andere aan het apparaat toegekende identificatiemiddelen',
			item5: 'Het IP-adres van waaruit het apparaat toegang krijgt tot de website of mobiele applicatie van een klant',
			item6: 'Informatie over de activiteiten van de gebruiker op dat apparaat, inclusief bezochte of gebruikte webpaginas en mobiele apps',
			item7: 'Informatie over de geografische locatie van het apparaat wanneer het toegang krijgt tot een website of mobiele toepassing',
			optOutDescription: 'Afhankelijk van het soort gegevens dat zij verzamelen, gebruiken en verwerken en andere factoren, waaronder privacy by design, vertrouwen bepaalde partners op uw toestemming, terwijl u voor andere partners een opt-out nodig hebt. Zie hieronder voor informatie over elke leverancier en om uw keuzes uit te oefenen. Of om u af te melden, bezoekt u de sites %NAI%, %DAA% of %EDAA%.',
			purpose1: {
				title: 'Informatieopslag en toegang',
				description: 'Het opslaan van informatie, of de toegang tot informatie die al is opgeslagen, op uw apparaat, zoals advertentie-identificatiemiddelen, apparaat-identificatiemiddelen, cookies en soortgelijke technologieën.',
			},
			purpose2: {
				title: 'Personalisatie',
				description: 'Het verzamelen en verwerken van informatie over uw gebruik van deze dienst om advertenties en/of inhoud in andere contexten, zoals op andere websites of apps, na verloop van tijd voor u te personaliseren. De inhoud van de site of app wordt doorgaans gebruikt om conclusies te trekken over uw interesses, die de toekomstige selectie van reclame en/of inhoud beïnvloeden.',
			},
			purpose3: {
				title: 'Advertentieselectie, levering, rapportage',
				description: 'Het verzamelen van informatie en de combinatie met eerder verzamelde informatie, om advertenties voor u te selecteren en aan te leveren, en om de levering en effectiviteit van dergelijke advertenties te meten. Dit omvat het gebruik van eerder verzamelde informatie over uw interesses om advertenties te selecteren, gegevens te verwerken over welke advertenties werden getoond, hoe vaak ze werden getoond, wanneer en waar ze werden getoond, en of u enige actie met betrekking tot de advertentie hebt ondernomen, inclusief bijvoorbeeld het klikken op een advertentie of het doen van een aankoop. Dit omvat niet personalisatie, dat wil zeggen het verzamelen en verwerken van informatie over uw gebruik van deze dienst om advertenties en/of inhoud in andere contexten, zoals websites of apps, na verloop van tijd voor u te personaliseren.',
			},
			purpose4: {
				title: 'Inhoudskeuze, levering, rapportage',
				description: 'Het verzamelen van informatie, en het combineren met eerder verzamelde informatie, om inhoud voor u te selecteren en aan te leveren, en om de levering en effectiviteit van dergelijke inhoud te meten. Dit omvat het gebruik van eerder verzamelde informatie over uw interesses om inhoud te selecteren, gegevens te verwerken over welke inhoud werd getoond, hoe vaak of hoe lang deze werd getoond, wanneer en waar deze werd getoond, en of u enige actie met betrekking tot de inhoud hebt ondernomen, inclusief bijvoorbeeld het klikken op inhoud. Dit omvat geen personalisatie, dat wil zeggen het verzamelen en verwerken van informatie over uw gebruik van deze dienst om vervolgens de inhoud en/of reclame in andere contexten, zoals websites of apps, na verloop van tijd voor u te personaliseren.',
			},
			purpose5: {
				title: 'Meting',
				description: 'Het verzamelen van informatie over uw gebruik van de inhoud en de combinatie met eerder verzamelde informatie, gebruikt om uw gebruik van de dienst te meten, te begrijpen en te rapporteren. Dit omvat niet de personalisatie, het verzamelen van informatie over uw gebruik van deze dienst om de inhoud en/of reclame vervolgens voor u te personaliseren in andere contexten, d.w.z. op andere diensten, zoals websites of apps, in de loop der tijd.',
			},
		},
		vendors: {
			title: 'Wie gebruikt deze informatie?',
			description: 'Hier is de volledige lijst van bedrijven die uw gegevens zullen gebruiken. Raadpleeg hun privacybeleid voor meer informatie.',
			back: 'Pas de manier aan waarop deze bedrijven gegevens van de vorige pagina gebruiken',
			acceptNone: 'Alles weigeren',
			acceptAll: 'Accepteer alles',
			accept: 'Accepteer',
			optOut: 'vereist opt-out',
		},
		footer: {
			message: '',
			consentLink: '',
		},
	},
};
