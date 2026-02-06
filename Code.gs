function doPost(e) {
  try {
    // Ouvrir la feuille de calcul (remplacez l'ID par celui de votre feuille)
    const ss = SpreadsheetApp.openById('1ux5iYmd-zYs4PTcfVEkul01DKYdJfRvOGpE0dmE71m4'); // ID de votre Google Sheet
    const sheet = ss.getSheetByName('Demandes') || ss.insertSheet('Demandes');
    
    // Récupérer et parser les données
    let data;
    
    // Vérifier si les données viennent du corps de la requête ou d'un paramètre 'data'
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('Aucune donnée reçue');
    }
    
    // Définir les en-têtes si la feuille est vide
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 16).setValues([[
        'Date', 'Nom', 'Numéro', 'Rue', 'Adresse Complète', 'Commune', 'Email', 'Téléphone', 
        'Code Postal', 'Surface', 'Type de bien', 'Ascenseur', 'Finition', 'Teinture', 'Prix Total', 'Message'
      ]]);
    }
    
    // Préparer les données pour l'insertion
    const rowData = [
      new Date(data.timestamp),
      data.fullName,                                // Nom
      data.streetNumber || '',                      // Numéro
      data.streetName || '',                        // Rue
      data.address || '',                           // Adresse Complète
      data.city || '',                              // Commune
      data.email,                                   // Email
      data.phone,                                   // Téléphone
      data.postalCode,                              // Code Postal
      data.surface,                                 // Surface
      data.propertyType || 'Non spécifié',          // Type de bien
      data.hasElevator ? 'Oui' : 'Non',             // Ascenseur
      data.finition,                                // Finition
      data.teinture ? 'Oui' : 'Non',                // Teinture
      data.totalPrice,                              // Prix Total
      data.message || ''                            // Message
    ];
    
    // Insérer les données
    sheet.appendRow(rowData);
    
    // Formater la feuille et notifier par email
    sheet.autoResizeColumns(1, 16);
    
    // Envoyer une notification par email à contact@renoline.fr
    try {
      MailApp.sendEmail({
        to: "contact@renoline.fr",
        subject: "Nouvelle demande de devis - " + data.fullName,
        body: "Une nouvelle demande de devis a été reçue.\n\n" +
              "Nom: " + data.fullName + "\n" +
              "Email: " + data.email + "\n" +
              "Téléphone: " + data.phone + "\n" +
              "Adresse: " + (data.address || (data.streetNumber + " " + data.streetName + ", " + data.postalCode + " " + (data.city || ''))) + "\n" +
              "Surface: " + data.surface + " m²\n" +
              "Prix estimé: " + data.totalPrice + " €\n\n" +
              "Consultez la feuille Google Sheets pour plus de détails."
      });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // Continuer même si l'email échoue
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Données enregistrées avec succès',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}