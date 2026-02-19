// Cookie Consent init - used on versenyek, podcast, discord subpages
window.addEventListener('load', () => {
    if (typeof CookieConsent === 'undefined') return;
    CookieConsent.run({
        categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: {}
        },
        language: {
            default: 'hu',
            translations: {
                hu: {
                    consentModal: {
                        title: 'Cookie-k',
                        description: 'A weboldal cookie-kat használ a megfelelő működéshez és a felhasználói élmény javításához.',
                        acceptAllBtn: 'Elfogadom',
                        acceptNecessaryBtn: 'Elutasítom',
                        showPreferencesBtn: 'Beállítások'
                    },
                    preferencesModal: {
                        title: 'Cookie beállítások',
                        savePreferencesBtn: 'Mentés',
                        acceptAllBtn: 'Összes elfogadása',
                        rejectAllBtn: 'Összes elutasítása',
                        sections: [
                            { title: 'Szükséges cookie-k', description: 'Ezek a cookie-k elengedhetetlenek a weboldal működéséhez.', linkedCategory: 'necessary' },
                            { title: 'Analitikai cookie-k', description: 'Segítenek megérteni, hogyan használják a látogatók a weboldalt.', linkedCategory: 'analytics' }
                        ]
                    }
                }
            }
        }
    });
});
