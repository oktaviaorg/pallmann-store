import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Share2, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, description }) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: string, link: string) => {
    window.open(link, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#d9b45a]/20">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-5 h-5 text-[#b8941a]" />
        <h3 className="text-lg font-bold text-gray-900">Partager cet article</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleShare('Facebook', shareLinks.facebook)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white rounded-lg font-semibold hover:bg-[#0d65d9] transition-all shadow-md hover:shadow-lg"
          aria-label="Partager sur Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        <button
          onClick={() => handleShare('Twitter', shareLinks.twitter)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1DA1F2] text-white rounded-lg font-semibold hover:bg-[#0d8bd9] transition-all shadow-md hover:shadow-lg"
          aria-label="Partager sur Twitter"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </button>

        <button
          onClick={() => handleShare('LinkedIn', shareLinks.linkedin)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] text-white rounded-lg font-semibold hover:bg-[#084d94] transition-all shadow-md hover:shadow-lg"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        <a
          href={shareLinks.email}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
          aria-label="Partager par email"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline">Email</span>
        </a>

        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white hover:scale-105'
          }`}
          aria-label="Copier le lien"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copié!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Copier le lien</span>
            </>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4 text-center">
        Aidez-nous à partager nos conseils d'experts sur le parquet
      </p>
    </div>
  );
};

export default SocialShare;
