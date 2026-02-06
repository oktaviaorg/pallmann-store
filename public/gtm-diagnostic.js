/**
 * Script de diagnostic Google Tag Manager
 * Pour ponceur-parquet.fr - Container GTM-W2M8N5GZ
 *
 * Utilisation :
 * 1. Ouvrir https://ponceur-parquet.fr
 * 2. Ouvrir la console (F12)
 * 3. Copier-coller ce script complet
 * 4. Appuyer sur Entrée
 */

(function() {
  'use strict';

  // Style pour les logs
  const styles = {
    title: 'background: #c4a04f; color: white; padding: 4px 8px; font-weight: bold; font-size: 14px;',
    success: 'color: #22c55e; font-weight: bold;',
    error: 'color: #ef4444; font-weight: bold;',
    warning: 'color: #f59e0b; font-weight: bold;',
    info: 'color: #3b82f6;',
    section: 'font-weight: bold; font-size: 13px; margin-top: 10px;'
  };

  console.log('%c 🔍 DIAGNOSTIC GTM - PONCEUR-PARQUET.FR ', styles.title);
  console.log('%c Container: GTM-W2M8N5GZ | Analytics: G-KYNJN3TK0C \n', styles.info);

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  function test(name, condition, successMsg, errorMsg, warningMsg = null) {
    const status = typeof condition === 'function' ? condition() : condition;

    if (status === true) {
      results.passed++;
      console.log('%c✅ ' + name, styles.success, successMsg || '');
      results.details.push({ name, status: 'pass', message: successMsg });
    } else if (status === 'warning') {
      results.warnings++;
      console.log('%c⚠️  ' + name, styles.warning, warningMsg || '');
      results.details.push({ name, status: 'warning', message: warningMsg });
    } else {
      results.failed++;
      console.log('%c❌ ' + name, styles.error, errorMsg || '');
      results.details.push({ name, status: 'fail', message: errorMsg });
    }
  }

  // ======================
  // 1. VÉRIFICATIONS GTM
  // ======================
  console.log('%c\n📦 1. Installation Google Tag Manager', styles.section);

  test(
    'Container GTM chargé',
    () => !!window.google_tag_manager,
    'window.google_tag_manager existe',
    'GTM n\'est pas chargé - vérifier le script dans index.html'
  );

  test(
    'Container GTM-W2M8N5GZ actif',
    () => {
      if (!window.google_tag_manager) return false;
      const containers = Object.keys(window.google_tag_manager);
      return containers.includes('GTM-W2M8N5GZ');
    },
    'Le bon conteneur est actif',
    'GTM-W2M8N5GZ non trouvé - vérifier l\'ID dans index.html'
  );

  test(
    'Script GTM dans le DOM',
    () => !!document.querySelector('script[src*="googletagmanager.com/gtm.js?id=GTM-W2M8N5GZ"]'),
    'Script chargé avec le bon ID',
    'Script GTM absent du DOM'
  );

  // ======================
  // 2. DATALAYER
  // ======================
  console.log('%c\n📊 2. DataLayer', styles.section);

  test(
    'DataLayer initialisé',
    () => Array.isArray(window.dataLayer),
    `Contient ${window.dataLayer?.length || 0} événements`,
    'window.dataLayer n\'est pas un tableau'
  );

  test(
    'DataLayer contient gtm.start',
    () => {
      if (!window.dataLayer) return false;
      return window.dataLayer.some(item => item['gtm.start']);
    },
    'GTM a été initialisé avec succès',
    'Événement gtm.start absent - GTM pas démarré'
  );

  if (window.dataLayer && window.dataLayer.length > 0) {
    console.log('%cContenu DataLayer:', styles.info);
    console.table(window.dataLayer.slice(-5)); // 5 derniers événements
  }

  // ======================
  // 3. GOOGLE ANALYTICS
  // ======================
  console.log('%c\n📈 3. Google Analytics 4', styles.section);

  test(
    'Fonction gtag disponible',
    () => typeof window.gtag === 'function',
    'gtag() est prête à envoyer des événements',
    'gtag() n\'existe pas - GA4 non initialisé'
  );

  test(
    'Configuration GA4',
    () => {
      if (!window.dataLayer) return false;
      return window.dataLayer.some(item =>
        item.event === 'gtag.config' ||
        (item[0] === 'config' && item[1] === 'G-KYNJN3TK0C')
      );
    },
    'GA4 configuré avec G-KYNJN3TK0C',
    'Configuration GA4 non trouvée dans dataLayer',
    'Configuration GA4 peut ne pas être visible dans dataLayer'
  );

  // ======================
  // 4. SCRIPTS ET RÉSEAU
  // ======================
  console.log('%c\n🌐 4. Scripts et réseau', styles.section);

  const gtmScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
  if (gtmScript) {
    console.log('%cURL du script GTM:', styles.info, gtmScript.src);
  }

  const analyticsScripts = document.querySelectorAll('script[src*="google-analytics.com"], script[src*="googletagmanager.com"]');
  console.log(`%cScripts Google chargés: ${analyticsScripts.length}`, styles.info);

  // ======================
  // 5. TEST D'ENVOI
  // ======================
  console.log('%c\n🧪 5. Test d\'envoi d\'événement', styles.section);

  const testEventName = 'diagnostic_test_' + Date.now();
  const testEventData = {
    event: testEventName,
    test_param: 'test_value',
    timestamp: new Date().toISOString()
  };

  try {
    const initialLength = window.dataLayer?.length || 0;
    window.dataLayer?.push(testEventData);
    const newLength = window.dataLayer?.length || 0;

    test(
      'Envoi événement test',
      newLength > initialLength,
      `Événement "${testEventName}" ajouté au dataLayer`,
      'Impossible d\'ajouter l\'événement au dataLayer'
    );

    console.log('%cDonnées envoyées:', styles.info, testEventData);
  } catch (e) {
    test(
      'Envoi événement test',
      false,
      '',
      'Erreur lors de l\'envoi: ' + e.message
    );
  }

  // ======================
  // 6. CONSENTEMENT
  // ======================
  console.log('%c\n🍪 6. Gestion du consentement', styles.section);

  const hasConsentMode = window.dataLayer?.some(item =>
    item[0] === 'consent' || item.event === 'consent'
  );

  test(
    'Consent Mode configuré',
    hasConsentMode,
    'Consent Mode v2 détecté dans dataLayer',
    'Aucune configuration de consentement trouvée',
    'Le consentement peut être géré différemment'
  );

  // ======================
  // 7. PERFORMANCE
  // ======================
  console.log('%c\n⚡ 7. Performance', styles.section);

  if (window.performance && window.performance.getEntriesByType) {
    const gtmResource = window.performance
      .getEntriesByType('resource')
      .find(r => r.name.includes('googletagmanager.com/gtm.js'));

    if (gtmResource) {
      const loadTime = Math.round(gtmResource.duration);
      console.log(`%cTemps de chargement GTM: ${loadTime}ms`, styles.info);

      if (loadTime < 500) {
        console.log('%c✅ Excellent temps de chargement', styles.success);
      } else if (loadTime < 1000) {
        console.log('%c⚠️  Temps de chargement acceptable', styles.warning);
      } else {
        console.log('%c❌ Temps de chargement élevé', styles.error);
      }
    }
  }

  // ======================
  // 8. VÉRIFICATIONS DE SÉCURITÉ
  // ======================
  console.log('%c\n🔒 8. Sécurité', styles.section);

  test(
    'HTTPS activé',
    () => window.location.protocol === 'https:',
    'Site servi en HTTPS',
    'Site en HTTP - les cookies analytics peuvent être bloqués'
  );

  test(
    'Domaine correct',
    () => window.location.hostname.includes('ponceur-parquet.fr') || window.location.hostname === 'localhost',
    'Domaine valide',
    'Domaine inattendu: ' + window.location.hostname
  );

  // ======================
  // RÉSUMÉ
  // ======================
  console.log('%c\n📊 RÉSUMÉ DU DIAGNOSTIC', styles.section);
  console.log(`%c✅ Tests réussis: ${results.passed}`, styles.success);
  if (results.warnings > 0) {
    console.log(`%c⚠️  Avertissements: ${results.warnings}`, styles.warning);
  }
  if (results.failed > 0) {
    console.log(`%c❌ Tests échoués: ${results.failed}`, styles.error);
  }

  const totalTests = results.passed + results.failed + results.warnings;
  const successRate = Math.round((results.passed / totalTests) * 100);

  console.log(`%c\nTaux de réussite: ${successRate}%`, styles.info);

  // Verdict final
  console.log('\n');
  if (results.failed === 0) {
    console.log('%c🎉 DIAGNOSTIC RÉUSSI - GTM FONCTIONNE CORRECTEMENT', 'background: #22c55e; color: white; padding: 8px 16px; font-weight: bold; font-size: 14px;');
    console.log('%c\nVotre installation GTM-W2M8N5GZ est opérationnelle.', styles.success);
    console.log('%cLes événements sont prêts à être envoyés vers GA4 (G-KYNJN3TK0C).', styles.info);
  } else if (results.failed <= 2) {
    console.log('%c⚠️  DIAGNOSTIC PARTIEL - QUELQUES PROBLÈMES DÉTECTÉS', 'background: #f59e0b; color: white; padding: 8px 16px; font-weight: bold; font-size: 14px;');
    console.log('%c\nGTM est installé mais certains éléments nécessitent votre attention.', styles.warning);
    console.log('%cConsultez les erreurs ci-dessus pour les détails.', styles.info);
  } else {
    console.log('%c❌ DIAGNOSTIC ÉCHOUÉ - PROBLÈMES MAJEURS', 'background: #ef4444; color: white; padding: 8px 16px; font-weight: bold; font-size: 14px;');
    console.log('%c\nGTM n\'est pas correctement installé.', styles.error);
    console.log('%cVérifiez que le code GTM est présent dans index.html.', styles.info);
  }

  // ======================
  // ACTIONS RECOMMANDÉES
  // ======================
  console.log('%c\n💡 ACTIONS RECOMMANDÉES', styles.section);

  console.log('%c\n1️⃣  Tester un événement formulaire:', styles.info);
  console.log(`%cwindow.dataLayer.push({
  event: 'form_submission',
  event_category: 'engagement',
  event_label: 'devis_request',
  surface: 50,
  estimated_value: 2100
});`, 'background: #f1f5f9; padding: 8px; border-left: 3px solid #3b82f6;');

  console.log('%c\n2️⃣  Tester un événement téléphone:', styles.info);
  console.log(`%cwindow.dataLayer.push({
  event: 'phone_click',
  event_category: 'engagement',
  phone_number: '+33757821306'
});`, 'background: #f1f5f9; padding: 8px; border-left: 3px solid #3b82f6;');

  console.log('%c\n3️⃣  Voir tous les événements:', styles.info);
  console.log(`%cconsole.table(window.dataLayer);`, 'background: #f1f5f9; padding: 8px; border-left: 3px solid #3b82f6;');

  console.log('%c\n4️⃣  Surveiller les nouveaux événements:', styles.info);
  console.log(`%cconst originalPush = window.dataLayer.push;
window.dataLayer.push = function(...args) {
  console.log('📤 Nouvel événement GTM:', args[0]);
  return originalPush.apply(this, args);
};`, 'background: #f1f5f9; padding: 8px; border-left: 3px solid #3b82f6;');

  console.log('%c\n5️⃣  Page de test dédiée:', styles.info);
  console.log('%chttps://ponceur-parquet.fr/gtm-debug.html', 'color: #3b82f6; text-decoration: underline;');

  console.log('%c\n6️⃣  Vérifier GA4 Real-Time:', styles.info);
  console.log('%chttps://analytics.google.com/ → Rapports → Temps réel', 'color: #3b82f6;');

  // ======================
  // DONNÉES EXPORTABLES
  // ======================
  console.log('%c\n📋 RAPPORT COMPLET', styles.section);

  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    container: 'GTM-W2M8N5GZ',
    analytics: 'G-KYNJN3TK0C',
    results: {
      total: totalTests,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings,
      successRate: successRate + '%'
    },
    details: results.details,
    dataLayer: {
      exists: Array.isArray(window.dataLayer),
      length: window.dataLayer?.length || 0,
      events: window.dataLayer?.slice(-5) || []
    },
    gtm: {
      loaded: !!window.google_tag_manager,
      containers: window.google_tag_manager ? Object.keys(window.google_tag_manager) : []
    }
  };

  console.log('%cPour exporter le rapport:', styles.info);
  console.log(`%ccopy(${JSON.stringify(report, null, 2)})`, 'background: #f1f5f9; padding: 8px;');

  // Stocker le rapport dans window pour y accéder facilement
  window.gtmDiagnosticReport = report;
  console.log('%c\nLe rapport est également disponible dans: window.gtmDiagnosticReport', styles.info);

  console.log('\n%c═══════════════════════════════════════════════════════════', 'color: #c4a04f;');
  console.log('%c Fin du diagnostic GTM | ponceur-parquet.fr ', 'background: #c4a04f; color: white; padding: 4px 8px;');
  console.log('%c═══════════════════════════════════════════════════════════\n', 'color: #c4a04f;');

})();
