(() => {
  const GOOGLE_CLIENT_ID = '486949502332-d5ue5c7f3c0vgjunn2mu5kem4o0mhkph.apps.googleusercontent.com';
  const SESSION_KEY = 'pathai.session.v1';
  const ONBOARDED_KEY = 'pathai.onboarded';
  const SESSION_DAYS = 30;

  const getSession = () => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (!session || Date.now() > session.expiresAt) return null;
      return session;
    } catch { return null; }
  };

  const startSession = ({ provider, name, email, picture = '', id = '' }) => {
    const session = { provider, name: name || email.split('@')[0], email, picture, id, signedInAt: Date.now(), expiresAt: Date.now() + SESSION_DAYS * 864e5 };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    window.google?.accounts?.id?.disableAutoSelect();
  };

  const isOnboarded = () => localStorage.getItem(ONBOARDED_KEY) === 'true';
  const markOnboarded = () => localStorage.setItem(ONBOARDED_KEY, 'true');

  const decodeJwtPayload = (token) => {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  };

  let googleScript;
  const loadGoogle = () => {
    if (window.google?.accounts?.id) return Promise.resolve(window.google);
    googleScript ||= new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => resolve(window.google);
      script.onerror = () => { googleScript = null; reject(new Error('Google sign-in could not load. Check your connection and try again.')); };
      document.head.appendChild(script);
    });
    return googleScript;
  };

  // The ID token is decoded client-side only to read the profile; a backend must verify it before trusting it.
  const renderGoogleButton = async (container, { onSignedIn, onError } = {}) => {
    try {
      const google = await loadGoogle();
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        auto_select: false,
        cancel_on_tap_outside: true,
        callback: ({ credential }) => {
          try {
            const claims = decodeJwtPayload(credential);
            if (claims.aud !== GOOGLE_CLIENT_ID || claims.exp * 1000 < Date.now()) throw new Error('Google returned an invalid sign-in. Please try again.');
            onSignedIn?.(startSession({ provider: 'google', name: claims.name, email: claims.email, picture: claims.picture, id: claims.sub }));
          } catch (error) { onError?.(error); }
        },
      });
      container.replaceChildren();
      google.accounts.id.renderButton(container, { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', shape: 'rectangular', logo_alignment: 'center', width: Math.min(390, container.clientWidth || 390) });
    } catch (error) { onError?.(error); }
  };

  window.PathAIAuth = { getSession, startSession, signOut, isOnboarded, markOnboarded, renderGoogleButton };
})();
