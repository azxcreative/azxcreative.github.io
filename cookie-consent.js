// Cookie Consent init - used on versenyek, podcast, discord subpages
window.addEventListener('load', () => {
    if (typeof initCookieConsent !== 'function') return;
    const cc = initCookieConsent();
    cc.run({
        current_lang: 'hu',
        autoclear_cookies: true,
        page_scripts: true,
        categories: {
            necessary: {
                enabled: true,
                readOnly: true
            },
            analytics: {
                enabled: false
            }
        },
        languages: {
            hu: {
                consent_modal: {
                    title: 'Cookie-k',
                    description: 'A weboldal cookie-kat használ a megfelelő működéshez és a felhasználói élmény javításához.',
                    primary_btn: { text: 'Elfogadom', role: 'accept_all' },
                    secondary_btn: { text: 'Beállítások', role: 'settings' }
                },
                settings_modal: {
                    title: 'Cookie beállítások',
                    save_settings_btn: 'Mentés',
                    accept_all_btn: 'Összes elfogadása',
                    reject_all_btn: 'Összes elutasítása',
                    blocks: [
                        { title: 'Szükséges cookie-k', description: 'Ezek a cookie-k elengedhetetlenek a weboldal működéséhez.', linkedCategory: 'necessary' },
                        { title: 'Analitikai cookie-k', description: 'Segítenek megérteni, hogyan használják a látogatók a weboldalt.', linkedCategory: 'analytics' }
                    ]
                }
            }
        }
    });
});
