import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Gift, Users, CreditCard, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';

const ParrainagePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [existingCode, setExistingCode] = useState<string | null>(null);

  // Générer un code unique
  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'PAL';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Vérifier si l'email a déjà un code
  const checkExistingCode = async (email: string) => {
    const { data } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('owner_email', email.toLowerCase())
      .single();
    
    return data?.code || null;
  };

  // Créer ou récupérer le code de parrainage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Vérifier si l'email a déjà un code
      const existing = await checkExistingCode(email);
      if (existing) {
        setReferralCode(existing);
        setExistingCode(existing);
        setLoading(false);
        return;
      }

      // Générer un nouveau code
      let code = generateCode();
      let attempts = 0;
      
      // S'assurer que le code est unique
      while (attempts < 5) {
        const { data: existingCode } = await supabase
          .from('referral_codes')
          .select('code')
          .eq('code', code)
          .single();
        
        if (!existingCode) break;
        code = generateCode();
        attempts++;
      }

      // Insérer le nouveau code
      const { error: insertError } = await supabase
        .from('referral_codes')
        .insert({
          code,
          owner_email: email.toLowerCase(),
          owner_name: name
        });

      if (insertError) throw insertError;

      setReferralCode(code);
    } catch (err: any) {
      setError('Erreur lors de la création du code. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const link = `https://www.pallmann-store.com?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = `https://www.pallmann-store.com?ref=${referralCode}`;
  const shareText = `🎁 -10% sur ta 1ère commande Pallmann Store avec mon code ${referralCode} ! Vitrificateurs, huiles et produits pro pour parquet.`;

  return (
    <>
      <Helmet>
        <title>Parrainage - Pallmann Store | Parrainez vos amis et gagnez 10€</title>
        <meta name="description" content="Parrainez un ami : il obtient -10% sur sa 1ère commande, vous recevez 10€ de crédit. Programme de parrainage Pallmann Store." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
        <Header />
        
        <main className="flex-grow">
          {/* Hero */}
          <div className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900] to-[#F0C300] opacity-10"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Gift className="w-4 h-4" />
                Programme de parrainage
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
                Parrainez vos amis,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#F0C300]">
                  gagnez 10€
                </span>
              </h1>
              <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
                Partagez votre code avec vos amis professionnels du parquet. 
                Ils obtiennent <strong>-10%</strong> sur leur 1ère commande, 
                vous recevez <strong>10€ de crédit</strong> après leur achat !
              </p>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-center text-[#1A1A1A] mb-8">Comment ça marche ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9900] to-[#F0C300] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Partagez</h3>
                <p className="text-[#6B6B6B]">Obtenez votre code unique et partagez-le avec vos contacts</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9900] to-[#F0C300] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Vos amis achètent</h3>
                <p className="text-[#6B6B6B]">Ils utilisent votre code et bénéficient de <strong>-10%</strong> sur leur commande</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF9900] to-[#F0C300] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">3. Vous gagnez</h3>
                <p className="text-[#6B6B6B]">Recevez <strong>10€ de crédit</strong> pour chaque ami qui commande</p>
              </div>
            </div>
          </div>

          {/* Formulaire / Code */}
          <div className="max-w-xl mx-auto px-4 py-12">
            {!referralCode ? (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-center text-[#1A1A1A] mb-6">
                  Obtenez votre code de parrainage
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Votre nom</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Votre email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
                      placeholder="jean@entreprise.fr"
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
                  >
                    {loading ? 'Création...' : 'Obtenir mon code'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
                {existingCode && (
                  <p className="text-sm text-[#6B6B6B] mb-4">Vous avez déjà un code de parrainage :</p>
                )}
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Votre code de parrainage</h2>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6">
                  <p className="text-4xl font-mono font-bold text-[#FF9900] tracking-wider">{referralCode}</p>
                </div>
                
                {/* Bouton copier le lien */}
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 px-4 bg-[#1A1A1A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#333] transition-colors mb-4"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Lien copié !' : 'Copier le lien de parrainage'}
                </button>

                {/* Partager */}
                <div className="flex gap-3 justify-center">
                  <a
                    href={`mailto:?subject=🎁 -10% sur Pallmann Store&body=${encodeURIComponent(shareText + '\n\n' + shareLink)}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>

                <p className="text-sm text-[#6B6B6B] mt-6">
                  Partagez ce lien avec vos amis. Ils obtiendront automatiquement -10% sur leur 1ère commande !
                </p>
              </div>
            )}
          </div>

          {/* Conditions */}
          <div className="max-w-2xl mx-auto px-4 py-8 text-center text-sm text-[#6B6B6B]">
            <p>
              <strong>Conditions :</strong> Le crédit de 10€ est attribué après validation de la commande de votre filleul. 
              Le code -10% est valable uniquement sur la première commande. 
              Non cumulable avec d'autres offres promotionnelles.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ParrainagePage;
